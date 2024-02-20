import React from 'react'
import { Box, Skeleton } from '@mui/material';
import { Outlet } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function NavbarSkeleton(): React.JSX.Element {

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box sx={{ height: '100vh' }}>
      <Skeleton variant='rounded' height='64px' sx={{ width: { xs: '100%', sm: 'calc(100% - 16px)' }, borderRadius: { sm: '50px' }, position: 'fixed', marginInline: { sm: '8px' }, top: { sm: '8px' } }} />
      <Box sx={{ width: 'fit-content', position: { xs: 'inherit', sm: 'fixed' } }}>
        {desktop ?
          <Box display='flex' justifyContent='center' flexDirection='column' height='100vh'>
            <Skeleton variant='rounded' sx={{ left: '8px', borderRadius: '50px', width: '60px', height: '256px', position: 'relative' }} />
          </Box>
          :
          <Skeleton variant='rectangular' sx={{ position: 'fixed', height: '56px', width: '100%', top: 'calc(100vh - 56px)' }} />
        }
      </Box>
      <Box component="main" sx={{ padding: '8px', marginLeft: { xs: '0px', sm: '68px' }, marginRight: { xs: '0px', sm: '8px' }, marginTop: { xs: '58px', sm: '66px' }, width: { xs: '100%', sm: 'calc(100% - 74px)' }, height: { xs: 'calc(100% - 116px)', sm: 'calc(100% - 60px)' } }}>
        <Outlet />
      </Box>
    </Box>
  )
}
