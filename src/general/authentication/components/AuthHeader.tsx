import React from 'react'
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export interface IAuthHeaderProps {
    title: string,
    link: string,
    linkText: string,
  }

export default function AuthHeader({ title, link, linkText} : IAuthHeaderProps) : React.JSX.Element {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 3 }}>
            <Typography variant="h5">{title}</Typography>
            <Typography component={Link} to={link} variant="body2" sx={{ textDecoration: 'none' }} color="primary">
                {linkText}
            </Typography>
        </Stack>
    )
}
