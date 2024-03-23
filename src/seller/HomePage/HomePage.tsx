import { Rating, Stack, Typography } from '@mui/material'
import React from 'react'
import StoreLink from '../../general/components/links/StoreLink'
import StoreInfo from '../../general/components/links/StoreInfo'
import Goods from '../../buyer/HomePage/components/Goods'

export default function HomePage() {
    return (
        <>
        <Stack flexDirection='row' justifyContent='space-between' display='flex' mb={2}>
            <StoreInfo name='IFYT Store' src='' to={`/shop/${1}`} storeNumber={1100369101} location='Ukraine' open='Apr 7, 2022' />
            <Stack direction='row' display='flex' alignItems='center'>
                <Typography color='text' variant='subtitle1'>
                    {"86.3% Positive Feedback\t\t|\t\t"}
                </Typography>
                <Rating value={4.7} readOnly size="small" precision={0.1}/>
            </Stack>
        </Stack>
        <Goods/>
        </>
    )
}
