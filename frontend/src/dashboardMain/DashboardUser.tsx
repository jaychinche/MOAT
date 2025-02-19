import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBarUser from './components/AppAppBarUser';
import Hero from './components/Hero';

import Footer from './components/Footer';

export default function DashboardUser(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBarUser />
      <Hero />
      <div>
        <Footer />
      </div>
    </AppTheme>
  );
}
