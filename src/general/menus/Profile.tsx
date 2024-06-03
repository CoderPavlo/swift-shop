import {
    Avatar, Box, ButtonBase, CardContent, Grid, IconButton, Paper, Popper, Stack, Tab, Tabs,
    ClickAwayListener, Typography, alpha,
} from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import Transitions from './Transitions';
import MainCard from './MainCard';

import { Logout, Person, Settings } from '@mui/icons-material/';
import ProfileTab from './ProfileTab';
import SettingsTab from './SettingsTab';
import { authAPI } from '../../store/services/authAPI';
import { baseUrl } from '../../store/services/baseUrl';

interface ITabPanelProps {
    children: React.ReactNode,
    index: number,
    value: number,
};


function TabPanel({ children, value, index, ...other }: ITabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

export default function Profile() {
    const [open, setOpen] = React.useState<boolean>(false);
    const anchorRef = React.useRef<HTMLElement | null>(null);
    const theme = useTheme();

    const [value, setValue] = React.useState<number>(0);
    const {data} = authAPI.useGetUserInfoQuery();

    return (
        <>
            <ButtonBase onClick={() => setOpen((value) => !value)} sx={{ ml: 1, borderRadius: '100px' }}>
                <Avatar src={baseUrl + data?.avatar} alt={data?.name}/>
            </ButtonBase>

            <Popper
                style={{
                    left: undefined,
                    right: '25px',
                    top: '75px'
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (

                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <Paper
                                    sx={{
                                        boxShadow: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
                                        width: 350,
                                    }}
                                >
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ px: 2.5, pt: 3 }}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Grid item>
                                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                                        <Avatar src={baseUrl + data?.avatar} alt={data?.name} sx={{ width: 32, height: 32 }} />
                                                        <Stack>
                                                            <Typography variant="h6">{data?.name}</Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {data?.email}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton size="large" color="secondary">
                                                        <Logout />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        {open && (
                                            <>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs variant="fullWidth" value={value} onChange={(e, value) => setValue(value)} aria-label="profile tabs">
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<Person style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Profile"
                                                            {...a11yProps(0)}
                                                        />
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<Settings style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Setting"
                                                            {...a11yProps(1)}
                                                        />
                                                    </Tabs>
                                                </Box>
                                                <TabPanel value={value} index={0}>
                                                    <ProfileTab />
                                                </TabPanel>
                                                <TabPanel value={value} index={1}>
                                                    <SettingsTab />
                                                </TabPanel>
                                            </>
                                        )}
                                    </MainCard>
                                </Paper>
                            </ClickAwayListener>
                        )}
                    </Transitions>
                )}
            </Popper>
        </>
    )
}
