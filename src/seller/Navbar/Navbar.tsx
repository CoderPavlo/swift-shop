import React from 'react'
import { Box, } from '@mui/material';
import Profile from '../../general/menus/Profile';
import Notifications from '../../general/menus/Notifications';
import GeneralNavbar from '../../general/Navbar/GeneralNavbar';
import { pages } from './data/pages';

export default function Navbar(): React.JSX.Element {

  return (
    <GeneralNavbar pages={pages}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}/>
        <Notifications />
        <Profile />
      </Box>
    </GeneralNavbar>
  )
}