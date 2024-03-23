import { NavigateNext } from '@mui/icons-material'
import { Avatar, Typography, } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

interface IStoreLink {
    to: string,
    name: string,
    src: string,
    open?: ()=>void,
    close?: ()=>void,
}

const StoreLink = React.forwardRef<
    HTMLAnchorElement,
    IStoreLink
>(({ to, name, src, open, close }: IStoreLink, ref) => {

    return (
        <Typography component={Link} to={to} variant='subtitle1' ref={ref} onMouseEnter={open} onMouseLeave={close}
        width='fit-content'
            sx={{
                mt: 1, display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'text.primary',
                '&:hover': {
                    color: 'primary.main',
                },
            }}>
            <Avatar src={src} alt={name} sx={{ mr: 1 }} />
            {name}
            <NavigateNext />
        </Typography>

    )
});

export default StoreLink;
