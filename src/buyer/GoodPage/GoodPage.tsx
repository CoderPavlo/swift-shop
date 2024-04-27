import { Button, ButtonGroup, Grid, Rating, Stack, Typography } from '@mui/material'
import React from 'react'
import { goods } from '../../db/goods/goods'
import Counts from '../CartPage/components/Counts'
export default function GoodPage() {
    const [quantity, setQuantity] = React.useState<number>(1);
    return (
        <Grid container spacing={2} mt={0}>
            <Grid item xs={12} md={5} display='flex' justifyContent='center'>
                <img src={goods[0].image} alt={goods[0].name} />
            </Grid>
            <Grid item xs={12} md={7}>
                <Typography variant='h5' color='text' width='100%' textAlign='center'>
                    {goods[0].name}
                </Typography>
                <Rating value={goods[0].rating} readOnly size="medium" precision={0.1} sx={{ mt: 1 }} />

                <Stack direction='row' mt={2}>

                    <Typography variant='h5' color='primary'>
                        {'$ ' + goods[0].price}
                    </Typography>
                    {goods[1].discount > 0 &&
                        <Typography variant='subtitle1' color='error' ml={1}>
                            {'-' + goods[1].discount + '%'}
                        </Typography>
                    }
                </Stack>
                <Typography variant='subtitle1' color='text' mt={1}>
                    Специфікація:
                </Typography>
                <Typography variant='subtitle1' color='text' mt={4}>
                    Кількість:
                </Typography>
                <Counts value={quantity} onChange={(value) => setQuantity(value)} min={1} max={100} />
                <ButtonGroup
                    fullWidth
                    sx={{mt: 1}}
                >
                    <Button variant='outlined'>Додати в корзину</Button>
                    <Button variant='contained'>Купити</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}
