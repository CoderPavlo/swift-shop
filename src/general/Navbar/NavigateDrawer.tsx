import React from 'react'
import {
  ListItemIcon,
  List,
  ListItemButton,
  ListItem,
  Tooltip,
  Drawer,
  BottomNavigation,
  BottomNavigationAction,
  Box,

} from "@mui/material";

import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from 'react-i18next';
import { ISetting } from '../settings/settings';

export interface INavigateDrawerProps {
  pages: ISetting[],
}

export default function NavigateDrawer({pages}:INavigateDrawerProps): React.JSX.Element {

  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate()

  const drawerWidth = 60;

  const firstPathSegment = window.location.href.split('/')[3].split('?')[0];
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box component="nav" sx={{width: 'fit-content', position: {xs: 'inherit', sm: 'fixed'}}}>
      {desktop ?
        <Drawer
          variant="permanent"
          sx={{
            display: 'flex',
            width: drawerWidth,
            justifyContent: 'center', flexDirection: 'column',
            height: '100vh',
            position: 'relative',

          }}
          PaperProps={{
            sx: {
              height: 'fit-content',
              position: 'inherit',
              flex: 'inherit',
              border: 0,
              borderRadius: '50px',
              left: '8px'
            }
          }}
          open
        >
          <List>
            {pages.map((page, index) =>
              <ListItem key={index} disablePadding sx={{ height: '48px' }}>
                <Tooltip title={t(page.title)} placement='right'>
                  <ListItemButton onClick={() => navigate(page.value)}
                    sx={{
                      borderRadius: '80px',
                      marginInline: '5px',
                      background: page.value === firstPathSegment ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    }}>
                    <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', color: page.value === firstPathSegment ? theme.palette.primary.main : theme.palette.secondary.main, minWidth: '20px', width: '100%' }}>
                      {page.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            )}
          </List>
        </Drawer>
        :
        <BottomNavigation sx={{ zIndex: '1', width: '100%', position: 'fixed', top: 'calc(100vh - 56px)', background: theme.palette.background.paper }} value={firstPathSegment} onChange={(event, value) => navigate(value)}>
          {pages.map((page, index) =>
            <BottomNavigationAction
              key={index}
              label={t(page.title)}
              value={page.value}
              icon={page.icon}
            />
          )}
        </BottomNavigation>
      }
    </Box>
  )
}
