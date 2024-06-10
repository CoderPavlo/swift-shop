import { Box, Divider, Grid, Pagination, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { orderAPI } from '../../../store/services/orderAPI'
import { NavigateNext } from '@mui/icons-material'
import OrdersList from '../../../general/components/orders/OrdersList'
import { orderTypes } from '../../../general/settings/orderTypes'
import { useTheme } from '@mui/material/styles'
import Loading from '../../../general/components/Loading'

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
};

interface IOrdersProps {
    allOrders?: boolean,
}
export default function Orders({ allOrders }: IOrdersProps) {
    const [page, setPage] = React.useState<number>(1);
    const { data: orders, isFetching, error, refetch } = orderAPI.useFetchOrdersForBuyerQuery(page);
    const theme = useTheme();
    return (
        <Grid item xs={12}>
            <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBottom={1}>
                <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
                    Замовлення
                </Typography>
                {!allOrders &&
                    <Typography variant='subtitle1' component={Link} to="/orders" color="secondary">
                        Всі
                    </Typography>
                }
            </Stack>
            <Loading
                loading={isFetching}
                error={Boolean(error)}
                refetch={refetch}
            >
                {orders && orders.data.map((item, index) =>
                    <Box key={index} marginBlock={1} paddingBlock={1} paddingInline={2} sx={{ background: theme.palette.background.paper }}>
                        <Stack direction='row' display='flex' justifyContent='space-between' alignItems='center'>
                            <Typography variant='subtitle1' sx={{ color: orderTypes[item.status].color }}>
                                {orderTypes[item.status].label}
                            </Typography>
                            <Stack direction='column'>
                                <Typography variant='body2' color='secondary'>
                                    {'Дата: ' + formatDate(item.date)}
                                </Typography>
                                <Typography variant='body2' color='secondary'>
                                    {'Id: ' + item.id}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Typography component={Link} to={`/shop/${item.shop?.id}`} variant='subtitle1' sx={{ mt: 1, display: 'flex', alignItems: 'center', color: theme.palette.text.primary, textDecoration: 'none' }}>
                            {item.shop?.name}
                            <NavigateNext />
                        </Typography>
                        <OrdersList type='buyer' goods={item.order_goods} total={item.price} status={item.status} />
                    </Box>
                )}
                {allOrders && orders && orders.pages > 1 &&
                    <Pagination count={orders?.pages} variant="outlined" color="primary" page={page} onChange={(e, page) => { setPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        size='large'
                        sx={{
                            paddingBlock: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    />
                }
            </Loading>
        </Grid>
    )
}
