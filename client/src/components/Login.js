import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../utils/mutations';
import { UseLogIn } from "../utils/authenticate";
import { useUserContext } from '../utils/userContext';

export default function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(false)
  const {setUserLogged} = useUserContext()
  
  const [userLogin, { error, data }] = useMutation(USER_LOGIN);

  const handleChange = (event) => {
    if(loginError) setLoginError(false)
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await userLogin({
        variables: { ...state },
      });
      //Will need to replace these lines with some user validation
      UseLogIn(data.userLogIn.authToken);
      setUserLogged(true);
    } catch (err) {
      console.log(err)
      setLoginError(true);
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={state.email}
              onChange={handleChange}
              error={loginError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.password}
              onChange={handleChange}
              error={loginError}
              helperText={loginError ? 'Incorrect Email or Password' : ''}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}