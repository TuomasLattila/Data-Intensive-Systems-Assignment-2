import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { useMemo } from 'react'

import Chart from '../components/Chart'
import EventTable from '../components/EventTable'

import { type User } from '../types/Users'
import { type Event, type ApiResp } from '../types/Events'

export default function DataPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const location = useLocation();
  const user: User | undefined = useMemo(() => location.state?.user, [location.state])

  useEffect(() => {
    const fetchEcents = async () => {
      if (user) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}events/all/${user?.id}`);
        const data: ApiResp = await res.json()
        setEvents(data.data);
      }
    }

    fetchEcents();
  }, []);

  const validEntries = useMemo(
    () => user?.weight_development.filter((w) => w.weight_kg && !isNaN(parseFloat(w.weight_kg)))?? [], [user]
  );

  const xData = useMemo(() => validEntries.map((w) => w.created_at.slice(0, 10)), [validEntries]);
  const yData = useMemo(() => validEntries.map((w) => parseFloat(w.weight_kg)), [validEntries]); 
  
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '10%', marginLeft: 10, marginTop: 20}}>
          <Button variant='contained' onClick={ () => {navigate('/')}}>Back</Button>
        </div>
        <div style={{ flex: '90%'}}>
          <h1>
            {user? `${user.username}` : 'Go back and choose an user...'}
          </h1>
          <Box component="h4" sx={{ margin: 0 }}>{user? `Height: ${user.height_cm}` : ''}</Box >
          <Box component="h4" sx={{ margin: 0 }}>{user? `Birthday: ${user.date_of_birth.slice(0, 10)}` : ''}</Box >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Chart xData={xData} yData={yData}></Chart>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 40 }}>
        <div style={{ flex: 1, marginLeft: 10}}>
          <EventTable events={events} ></EventTable>
        </div>
        <div style={{ flex: 1, marginRight: 10 }}>
        </div>
      </div>
    </div>
  );
}