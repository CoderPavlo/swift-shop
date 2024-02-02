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

} from "@mui/material";
import { alpha } from '@mui/material/styles';
import { pages } from '../data/pages'
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from 'react-i18next';
export default function NavigateDrawer(): React.JSX.Element {
  
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate()

  const drawerWidth = 60;

  const firstPathSegment = window.location.href.split('/')[3];
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          width: drawerWidth,
          justifyContent: 'center', flexDirection: 'column',
          height: '100vh',
          position: 'relative',
          top: '-65px',

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
              <Tooltip title={t(page.title)}>
              <ListItemButton onClick={() => navigate(page.value)}
                sx={{
                  borderRadius: '80px',
                  marginInline: '5px',
                  // background: page.value === firstPathSegment ? `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.1)}, transparent)` : 'transparent',
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

      <BottomNavigation sx={{ width: '100%', position: 'absolute', top: 'calc(100vh - 56px)', display: {xs: 'flex', sm: 'none'} }} value={firstPathSegment} onChange={(event, value)=>navigate(value)}>
        {pages.map((page, index)=>
          <BottomNavigationAction
          key={index}
          label={t(page.title)}
          value={page.value}
          icon={page.icon}
        />
        )}
    </BottomNavigation>
    </>
  )
}
