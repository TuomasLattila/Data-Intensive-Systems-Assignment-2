import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router'

type User = {
  id: string
  username: string
}

type ApiResp = {
  message: string,
  data: User[]
}

export default function FrontPage() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}users/all`);
      const data: ApiResp = await res.json()
      setUsers(data.data);
    }

    fetchUsers();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUserId(event.target.value as string);
  };

  const handleClick = () => {
    if (selectedUserId != '') {
      navigate('/data', { state: { user: users.find((user) => user.id === selectedUserId) } })
    } else {
      console.log("Choose user before continuing...")
    }
  }

  return (
    <div>
      <div>
        <h1>
          Select user
        </h1>
      </div>
      <div style={{ marginTop: 50 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select"
              id="demo-simple-select"
              value={selectedUserId}
              onChange={handleChange}
              sx={{ color: 'white', mx: 5,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                }, 
              }}
            >
              {users.map((user) => (
                <MenuItem value={user.id}>{user.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div style={{ marginTop: 15 }}>
        <Button variant="contained"
          onClick={handleClick}
        >select</Button>
      </div>
    </div>
  );
}