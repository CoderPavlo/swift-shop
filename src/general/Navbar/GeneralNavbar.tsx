import React from 'react'
import { AppBar, Box, Toolbar, } from '@mui/material';

import { Outlet } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { ISetting } from '../settings/settings';
import Logo from '../components/Logo';
import NavigateDrawer from './NavigateDrawer';

export interface INavbarProps {
    pages: ISetting[],
    children: React.ReactNode
}
export default function GeneralNavbar({ pages, children }: INavbarProps): React.JSX.Element {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <AppBar position="fixed" sx={{ background: { xs: theme.palette.background.paper, sm: "transparent" } }} elevation={0}>
                <Toolbar sx={{ marginInline: '8px', paddingInline: '8px', background: theme.palette.background.paper, borderRadius: '50px', top: { sm: '8px' }, height: '60px' }}>
                    <Logo size="small" />
                    {children}
                </Toolbar>
            </AppBar>
            <NavigateDrawer pages={pages} />
            <Box component="main" sx={{ padding: '8px', paddingBottom: { xs: '58px', sm: '8px' }, marginLeft: { xs: '0px', sm: '68px' }, marginRight: { xs: '0px', sm: '8px' }, marginTop: { xs: '58px', sm: '66px' }, width: { xs: '100%', sm: 'calc(100% - 74px)' }, height: { xs: 'calc(100% - 116px)', sm: 'calc(100% - 60px)' } }}>
                <Outlet />
            </Box>
        </Box>
    )
}
