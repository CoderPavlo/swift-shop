import React from 'react'
import { Box, Button, IconButton, } from '@mui/material';
import Search from './components/Search';
import { Login, Settings, } from '@mui/icons-material';
import SettingsDrawer from './components/SettingsDrawer';
import Profile from '../../general/menus/Profile';
import Notifications from '../../general/menus/Notifications';
import GeneralNavbar from '../../general/Navbar/GeneralNavbar';
import { pages } from './data/pages';
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router';

export default function Navbar(): React.JSX.Element {
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const { role } = useAppSelector(state => state.authReducer);
  const navigate = useNavigate();
  const handleSettingsOpen = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      ('key' in event && (event as React.KeyboardEvent).key === 'Tab') ||
      ('key' in event && (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpenSettings(open);
  };


  return (
    <GeneralNavbar pages={pages}>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Search />
      </Box>
      <Box sx={{ display: 'flex' }}>
        {role ?
          <>
            <Notifications />
            <Profile />
          </> :
          <>
            <Button variant="outlined" startIcon={<Login />} onClick={() => navigate('/login')}
              sx={{
                fontSize: {
                  xs: 0,
                  md: '0.875rem'
                }
              }}
            >
              Ввійти
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="settings"
              color="secondary"
              onClick={handleSettingsOpen(true)}
            >
              <Settings />
            </IconButton>
          </>
        }
      </Box>
      {!role &&
        <SettingsDrawer open={openSettings} handleSettingsOpen={handleSettingsOpen} />
      }
    </GeneralNavbar >
  )
}
