import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'

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

  const location = useLocation();
  const user: User | undefined = location.state?.user

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}users/all`);
      const data: ApiResp = await res.json()
      setUsers(data.data);
    }

    //fetchUsers();
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
      <h1>
        {user? user.username : 'Go back and choose an user...'}
      </h1>
    </div>
  );
}