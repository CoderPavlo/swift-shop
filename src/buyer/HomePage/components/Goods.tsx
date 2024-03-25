import React from 'react'

import { Grid, } from '@mui/material';
import { goods } from '../../../db/goods/goods';
import GoodCard from '../../../general/components/cards/GoodCard';
export default function Goods(): React.JSX.Element {
    return (
        <Grid container spacing={2}>
            {goods.map((item, index) =>
                <GoodCard key={index} type='view' good={item}/>
            )
            }
        </Grid >
    )
}
