import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { data, useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { useMemo } from 'react'

import Chart from '../components/Chart'
import Table from '../components/Table'

import { type User, type UserWeight, type ApiRespWeight } from '../types/Users'
import { type Event, type ApiRespEvent } from '../types/Events'
import { type Activity, type ApiRespActivity } from '../types/Activities'

export default function DataPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [activities, setActivities] = useState<Activity[]>([])
  const [textFieldValue, setTextFieldValue] = useState<string>('')
  const [validEntries, setValidEntries] = useState<UserWeight[]>([])
  const location = useLocation();
  const user: User | undefined = useMemo(() => location.state?.user, [])

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}events/all/${user?.id}`);
        const data: ApiRespEvent = await res.json()
        setEvents(data.data.sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())) // sort events decending by their dates
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}activities/all/${user?.id}`);
        const data: ApiRespActivity = await res.json()
        setActivities(data.data.sort((a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime())) // sort events decending by their dates
      }
    }

    fetchActivities();
  }, []);

  useEffect(() => {
    setValidEntries(() => user?.weight_development.filter((w) => parseFloat(w.weight_kg)) ?? [])
  }, [user])

  const xData = useMemo(() => validEntries.map((w) => w.created_at.slice(0, 10)), [validEntries]);
  const yData = useMemo(() => validEntries.map((w) => parseFloat(w.weight_kg)), [validEntries]); 

  const addWeight = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}users/add/weight/${user?.id}`, 
      { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ weight_kg: textFieldValue}) }
    );
    const data: ApiRespWeight = await res.json()
    setValidEntries((prev) => [...prev, data.data])
  }
  
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '10%', marginLeft: 10, marginTop: 20}}>
          <Button variant='contained' onClick={ () => {navigate('/')}}>Back</Button>
        </div>
        <div style={{ flex: '90%', paddingRight: 10}}>
          <h1>
            {user? `${user.username}` : 'Go back and choose an user...'}
          </h1>
          <Box component="h4" sx={{ margin: 0 }}>{user? `Height: ${user.height_cm} cm` : ''}</Box >
          <Box component="h4" sx={{ margin: 0 }}>{user? `Birthday: ${user.date_of_birth.slice(0, 10)}` : ''}</Box >
          <Box component="h3" sx={{ marginTop: 3 }}>Weight development (users-DB):</Box >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Chart xData={xData} yData={yData}></Chart>
          </div>
          <Box component='form' onSubmit={(e) => {e.preventDefault(); addWeight(); setTextFieldValue('')}}>
            <TextField
              sx={{ maxWidth: 200, backgroundColor: '#ffffff', borderRadius: 2}}
              label='Add weight (kg)'
              type='number'
              value={textFieldValue}
              onChange={(e) => { setTextFieldValue(e.target.value) }}
              fullWidth
              margin="normal"
            />
            <Button type='submit' sx={{ marginTop: 3, marginLeft: 1 }} variant="contained">Add</Button>
          </Box>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 40 }}>
        <div style={{ flex: 1, marginLeft: 10, marginRight: 5}}>
          <Box component="h3" sx={{ marginTop: 3 }}>Events attended (events-DB):</Box >
          <Table 
            tableType={'events'}
            titles={["Event", "Description", "Date", "Placement"]} 
            rows={events.map((e) => [e.id, e.event_name, e.description, e.event_date.slice(0, 10), e.finishing_placement])}>
          </Table>
        </div>
        <div style={{ flex: 1, marginRight: 10, marginLeft: 5 }}>
          <Box component="h3" sx={{ marginTop: 3 }}>Activity (activities-DB):</Box >
          <Table 
            tableType={'activities'}
            titles={["Sport", "Duration (min)", "Date", "Burned calories"]} 
            rows={activities.map((a) => [a.id, a.activity_type, a.duration_minutes, a.activity_date.slice(0, 10), a.calories_burned])}>
          </Table>
        </div>
      </div>
    </div>
  );
}