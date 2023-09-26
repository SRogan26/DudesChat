import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { UseLogIn } from "../utils/authenticate";
import { useUserContext } from '../utils/userContext';

export default function SignUp() {
  const {setUserLogged} = useUserContext()
  
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...state },
      });
      //Will need to replace these lines with some user validation
      UseLogIn(data.addUser.authToken);
      setUserLogged(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Container component='main' maxWidth='xs'>
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
            <PlusOneIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Tooltip title='Enter your first name' placement='top-start'>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='signUpFirstName'
                  label='First Name'
                  value={state.firstName}
                  onChange={handleChange}
                  autoFocus
                />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Tooltip title='Enter your last name' placement='top-end'>
                <TextField
                  required
                  fullWidth
                  id='signUpLastName'
                  label='Last Name'
                  name='lastName'
                  value={state.lastName}
                  onChange={handleChange}
                  autoComplete='family-name'
                />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <Tooltip title='Enter your email address' placement='bottom'>
                <TextField
                  required
                  fullWidth
                  id='signUpEmail'
                  label='Email Address'
                  name='email'
                  value={state.email}
                  onChange={handleChange}
                  autoComplete='email'
                />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='signUpUsername'
                  label='Username'
                  name='username'
                  value={state.username}
                  onChange={handleChange}
                  autoComplete='username'
                  error={state.username.length < 6 && state.username.length > 0}
                  helperText={state.username.length <= 6 && state.username.length >= 0 ? 
                    'Username must have at least 6 characters' :
                    'Username is long enough'
                  }
                  color={state.username.length < 6 && state.username.length >= 0 ? 
                    'primary' :
                    'success'
                  }
                  focused
                />
              </Grid>
              <Grid item xs={12}>
              <Tooltip title='Enter your password (min 8 characters)' placement='bottom'>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='signUpPassword'
                  value={state.password}
                  onChange={handleChange}
                  autoComplete='new-password'
                  error={state.password.length < 8 && state.password.length > 0}
                  helperText={state.password.length < 8 && state.password.length >= 0 ? 
                    'Password must have at least 8 characters' :
                    'Password is long enough'
                  }
                  color={state.password.length < 8 && state.password.length >= 0 ? 
                    'primary' :
                    'success'
                  }
                  focused
                />
                </ Tooltip>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
