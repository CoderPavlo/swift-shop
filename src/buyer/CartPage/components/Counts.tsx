import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Add, Remove } from '@mui/icons-material';
export interface ICountsProps {
    value: number,
    onChange: (value: number) => void,
    min: number,
    max: number,
}
export default function Counts({ value, onChange, min, max }: ICountsProps) {
    return (
        <Box width='fit-content' display='flex' alignItems='center'>
            <IconButton disabled={value <= min} onClick={(e)=>{e.preventDefault(); onChange(value-1);}} color='secondary'>
                <Remove />
            </IconButton>
            <Typography variant='subtitle1' color='text.primary' marginInline={1}>
                {value}
            </Typography>
            <IconButton disabled={value >= max} onClick={(e)=>{e.preventDefault(); onChange(value+1)}} color='secondary'>
                <Add />
            </IconButton>
        </Box>
    )
}
