import React from 'react'
import StoreLink from './StoreLink'
import { Box, Tooltip, Typography } from '@mui/material'

interface IStoreInfo {
    to?: string,
    name?: string,
    src?: string,
    storeNumber?: number,
    location?: string,
    open: string,
}

export default function StoreInfo({ to, name, src, storeNumber, location, open }: IStoreInfo) {
    const [openTooltip, setOpen] = React.useState<boolean>(false);
    return (
        <Tooltip open={openTooltip} arrow sx={{ background: 'background.paper' }} title={
            <Box p={2}>
                <Typography variant='subtitle1' color='text' width='100%' textAlign='center'>
                    Інформація про магазин
                </Typography>
                <Typography variant='subtitle2' color='text' sx={{mt: 1}}>
                    {'Name:\t' + name}
                </Typography>
                <Typography variant='subtitle2' color='text'>
                    {'Номер:\t' + storeNumber}
                </Typography>
                <Typography variant='subtitle2' color='text'>
                    {'Розташування:\t' + location}
                </Typography>
                <Typography variant='subtitle2' color='text'>
                    {'Відкритий:\t' + open}
                </Typography>
            </Box>
        }>
            <StoreLink to={to} name={name} src={src} open={()=>setOpen(true)} close={()=>setOpen(false)}/>
        </Tooltip>
    )
}
