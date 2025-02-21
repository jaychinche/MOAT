import * as React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import dashboardImage from "./dashboardImage.jpg";
import { Link } from "react-router-dom";

// Styled Background Box
const StyledBox = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${dashboardImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
}));

export default function Hero() {
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  return (
    <Box sx={{ width: '100%', backgroundRepeat: 'no-repeat' }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        {/* Hero Content Animation */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Stack spacing={3} sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}>
            {/* Animated Heading */}
            <Typography
              variant="h1"
              component={motion.h1}
              layout
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              sx={{
                fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              <br />
              <span style={{ color: isLightTheme ? 'black' : 'white' }}>Real-Time</span>
              <span style={{ color: '#4A90E2' }}> Activity Tracking</span>
            </Typography>

            {/* Subtitle with Fade-In Effect */}
            <Typography
              component={motion.p}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              sx={{ color: 'text.secondary', width: { sm: '100%', md: '80%' } }}
            >
              Monitor, analyze, and optimize workflows with smart tracking, AI-powered insights, and seamless collaboration tools.
            </Typography>

            {/* Buttons with Slide-Up Animation */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ pt: 2 }}
              component={motion.div}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" size="large">
                  Start Tracking
                </Button>
              </Link>
              <Button variant="outlined" color="primary" size="large">
                Live Dashboard
              </Button>
            </Stack>

            {/* Features with Fade-In Delay */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ pt: 3, width: { xs: '100%', sm: '400px' }, justifyContent: 'center' }}
              component={motion.div}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Stack alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Track Time
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Monitor work sessions and idle time effortlessly.
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Productivity Reports
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Get detailed insights on team & individual efficiency.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </motion.div>

        {/* Background Animation */}
        <StyledBox
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 5.9, ease: 'easeOut', delay: 1.5 }}
        />
      </Container>
    </Box>
  );
}
