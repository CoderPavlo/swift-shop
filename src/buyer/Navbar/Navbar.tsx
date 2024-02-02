import React from 'react'
import {AppBar, Box, Toolbar, IconButton, Badge} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet } from "react-router-dom";
import Search from './components/Search';
import { useTheme } from '@mui/material/styles';

import {Settings, } from '@mui/icons-material';
import SettingsDrawer from './components/SettingsDrawer';
import NavigateDrawer from './components/NavigateDrawer';
import Logo from '../../general/components/Logo';
export default function Navbar(): React.JSX.Element {
  const theme = useTheme();
    const [openSettings, setOpenSettings] = React.useState<boolean>(false);

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{background: {xs: theme.palette.background.paper, sm: "transparent"}}} elevation={0}>
                <Toolbar sx={{marginInline: '8px', paddingInline: '8px', background: theme.palette.background.paper, borderRadius: '50px', top: {sm:'8px'}, height: '60px'}}>
                    <Logo size="small"/>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search/>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="secondary"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="settings"
                            color="secondary"
                            onClick={handleSettingsOpen(true)}
                        >
                            <Settings />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet/>
            <SettingsDrawer open={openSettings} handleSettingsOpen={handleSettingsOpen}/>
            <NavigateDrawer/>
        </Box>
    )
}
