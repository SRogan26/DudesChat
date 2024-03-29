import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size='lg'/>
    </Box>
  );
}