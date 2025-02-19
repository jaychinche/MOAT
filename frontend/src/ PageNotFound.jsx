import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import AppTheme from './shared-theme/AppTheme'
import AppAppBarUser from './dashboardMain/components/AppAppBarUser';
import Footer from './dashboardMain/components/Footer';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBarUser />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
          textAlign: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h1" color="primary" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Oops! The page you are looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/sign-in')}>
          Go to Home
        </Button>
      </Box>
      <Footer />
    </AppTheme>
  );
}
