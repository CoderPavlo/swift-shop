import React from 'react'
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
    alpha
} from '@mui/material';

import { CloseOutlined, MessageOutlined, Notifications as NotificationsIcon, Settings, } from '@mui/icons-material';
import MainCard from './MainCard';
import Transitions from './Transitions';

const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};


export default function Notifications() {

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <IconButton
                size="large"
                color="secondary"
                onClick={()=>setOpen(value=>!value)}
            >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popper
                style={{
                    left: undefined,
                    right: '50px',
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
                                offset: [matchesXs ? -5 : 0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                        <Paper
                            sx={{
                                boxShadow: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285
                                }
                            }}
                        >
                                <MainCard
                                    title="Notification"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton size="small" onClick={handleToggle}>
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                            }
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: 'success.main',
                                                        bgcolor: 'success.lighter'
                                                    }}
                                                >
                                                    <MessageOutlined />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        It&apos;s{' '}
                                                        <Typography component="span" variant="subtitle1">
                                                            Cristina danny&apos;s
                                                        </Typography>{' '}
                                                        birthday today.
                                                    </Typography>
                                                }
                                                secondary="2 min ago"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography variant="caption" noWrap>
                                                    3:00 AM
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: 'primary.main',
                                                        bgcolor: 'primary.lighter'
                                                    }}
                                                >
                                                    <MessageOutlined />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        <Typography component="span" variant="subtitle1">
                                                            Aida Burg
                                                        </Typography>{' '}
                                                        commented your post.
                                                    </Typography>
                                                }
                                                secondary="5 August"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography variant="caption" noWrap>
                                                    6:00 PM
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: 'error.main',
                                                        bgcolor: 'error.lighter'
                                                    }}
                                                >
                                                    <Settings />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        Your Profile is Complete &nbsp;
                                                        <Typography component="span" variant="subtitle1">
                                                            60%
                                                        </Typography>{' '}
                                                    </Typography>
                                                }
                                                secondary="7 hours ago"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography variant="caption" noWrap>
                                                    2:45 PM
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: 'primary.main',
                                                        bgcolor: 'primary.lighter'
                                                    }}
                                                >
                                                    C
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        <Typography component="span" variant="subtitle1">
                                                            Cristina Danny
                                                        </Typography>{' '}
                                                        invited to join{' '}
                                                        <Typography component="span" variant="subtitle1">
                                                            Meeting.
                                                        </Typography>
                                                    </Typography>
                                                }
                                                secondary="Daily scrum meeting time"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography variant="caption" noWrap>
                                                    9:10 PM
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" color="primary">
                                                        View All
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                        </Paper>
                        </ClickAwayListener>
                    </Transitions>
                )}
            </Popper>
        </>
    )
}
