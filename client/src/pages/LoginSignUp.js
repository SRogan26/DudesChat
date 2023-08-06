import Grid from '@mui/material/Grid';
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/userContext';

export default function LoginSignUp () {
    const {userLogged} = useUserContext();
    
  const navTo = useNavigate()
  useEffect(()=>{
    if(userLogged) navTo('/dash')
  },[userLogged])
    const styles = {
        display: "flex",
        alignItems: 'center',
    }
    return (
        <Grid container style={styles}>
            <Grid item xs={12} md={5}>
            <Login />
            </Grid>
            <Grid item xs={12} md={2} textAlign='center'>
            OR
            </Grid>
            <Grid item xs={12} md={5}>
            <SignUp />
            </Grid>
        </Grid>
    )
}