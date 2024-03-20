import React from 'react'
import { Stack, Typography, IconButton, Box, Checkbox, Grid, Button } from '@mui/material'
import { Delete, Store } from '@mui/icons-material';
import { stores } from '../../db/cart/cart';
import { useTheme } from '@mui/material/styles';
import Counts from './components/Counts';
export default function CartPage() {
    const theme = useTheme();
    const [count, setCount] = React.useState<number>(0);

    return (
        <>
            <Box mb={10}>
                <Stack direction='row' alignItems='center'>
                    <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
                        Корзина
                    </Typography>
                    <Typography variant='subtitle2' color="secondary" ml={1}>
                        9 вибрано
                    </Typography>
                </Stack>
                {stores.map((store, index) =>
                    <Box key={index} sx={{ marginBlock: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', border: `1px solid ${theme.palette.background.paper}`, borderRadius: '10px 10px 0px 0px', padding: '1px 8px', mb: '1px' }}>
                            <Checkbox sx={{ mr: 1 }} />
                            <Store />
                            <Typography variant="subtitle1" color='text' ml={1}>
                                {store.name}
                            </Typography>
                        </Box>
                        {store.goods.map((good, index) =>
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', padding: '1px 8px', border: `1px solid ${theme.palette.background.paper}` }}>
                                <Checkbox sx={{ mr: 1 }} />
                                <img src={good.image} alt={good.name} style={{ aspectRatio: 1, maxHeight: '200px', height: '100%' }} />
                                <Grid container flexGrow={1} height='100%'>
                                    <Grid item xs={12} md={6} display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' height={{ xs: 'fit-content', md: '100%' }}>
                                        <Typography variant='body1' color='text'>
                                            {good.name}
                                        </Typography>
                                        <Typography variant='body2' color='secondary' mt={{ xs: 1, md: 2 }}>
                                            Специфікація
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={3} display='flex' justifyContent='center'>
                                        <Counts min={1} max={100} value={count} onChange={(value) => setCount(value)} />
                                    </Grid>
                                    <Grid item xs={6} md={3} display='flex' flexDirection='column' justifyContent='center' alignItems={{ md: 'center' }}>
                                        <Typography variant='subtitle2' color='error' textAlign='center'>
                                            $ {good.price}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
            <Box sx={{ width: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 91px)' }, background: theme.palette.background.paper, position: 'fixed', top: { xs: 'calc(100vh - 140px)', sm: 'calc(100vh - 76px)' } }} display='flex' justifyContent='space-between' paddingInline={3} paddingBlock={1}>
                <Box>
                    <Typography variant='h6' color='error'>
                        $ 10000
                    </Typography>
                    <Typography variant='subtitle1' color='secondary'>
                        Загалом
                    </Typography>
                </Box>
                <Stack direction='row'>
                    <Button variant='outlined'>
                        Видалити обране
                    </Button>
                    <Button variant='outlined' sx={{ ml: 1 }}>
                        Купити
                    </Button>
                </Stack>
            </Box>
        </>
    )
}
