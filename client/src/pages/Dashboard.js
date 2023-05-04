import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode';

export default function Dashboard() {
    const userToken = jwt_decode(localStorage.getItem("auth_token"));
    const userName = userToken.data.username

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">{userName}</Button>
      <Button variant="outlined">Log Out</Button>
    </Stack>
  );
}