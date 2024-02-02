import * as React from 'react';

import { Box, Grid, } from '@mui/material';

import Logo from '../../components/Logo';
import Background from './Background';

import { Outlet } from "react-router-dom";

export default function AuthPage(): React.JSX.Element {

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Background />
      <Grid
        container
        direction="column"
        sx={{
          minHeight: '100vh'
        }}
      >
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <Logo size="large"/>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: 'calc(100vh - 80px)' }}
        >
          <div>
          <Outlet/>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
