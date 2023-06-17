import Grid from '@mui/material/Grid';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useState, useEffect } from 'react';
import { UseIsLoggedIn } from '../utils/authenticate';
import { useNavigate } from 'react-router-dom';

export default function LoginSignUp() {
  const [userLogged, setUserLogged] = useState(UseIsLoggedIn());

  const navTo = useNavigate();
  useEffect(() => {
    if (userLogged) navTo('/dash');
  }, [userLogged]);
  const styles = {
    display: 'flex',
    alignItems: 'center',
  };
  return (
    <Grid container style={styles}>
      <Grid item xs={12} md={5}>
        <Login setUserLogged={setUserLogged} />
      </Grid>
      <Grid item xs={12} md={2} textAlign='center'>
        OR
      </Grid>
      <Grid item xs={12} md={5}>
        <SignUp setUserLogged={setUserLogged} />
      </Grid>
    </Grid>
  );
}
