import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react'


type User = {
  id: string
  username: string
  height_cm: string
  date_of_birth: string
  weight_development: UserWeight[]
}

type UserWeight = {
  weight_kg: string
  created_at: string
}

type ApiResp = {
  message: string,
  data: User[]
}

export default function FrontPage() {
  const location = useLocation();
  const user: User | undefined = useMemo(() => location.state?.user, [location.state])

  const validEntries = useMemo(
    () => user?.weight_development.filter((w) => w.weight_kg && !isNaN(parseFloat(w.weight_kg)))?? [], [user]
  );

  const xData = useMemo(() => validEntries.map((w) => w.created_at.slice(0, 10)), [validEntries]);
  const yData = useMemo(() => validEntries.map((w) => parseFloat(w.weight_kg)), [validEntries]); 
  
  return (
    <div>
      <h1>
        {user? `${user.username}` : 'Go back and choose an user...'}
      </h1>
      <h4>{user? `Height: ${user.height_cm}` : ''}</h4>
      <h4>{user? `Birthday: ${user.date_of_birth.slice(0, 10)}` : ''}</h4>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 700, backgroundColor: '#ffffff', borderRadius: 2, mt: 5}}>
          <LineChart 
            xAxis={[{ 
              id: 'dates',
              data: xData, 
              scaleType: 'point' 
            }]}

            yAxis={[{ id: 'weights', scaleType: 'linear' as const, position: 'left' as const }]}

            series={[{ 
              id: 'weight-series', 
              yAxisId: 'weights', 
              data: yData, 
              label: 'Weight (kg)',
               showMark: true 
              }]}

            height={400}
          />
        </Box>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>

        </div>
        <div style={{ flex: 1 }}>

        </div>
      </div>
    </div>
  );
}