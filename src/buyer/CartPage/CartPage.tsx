import React from 'react'
import { Stack, Typography, Box, Checkbox, Grid, Skeleton, Pagination } from '@mui/material'
import { Delete, ShoppingBag} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Counts from './components/Counts';
import { orderAPI } from '../../store/services/orderAPI';
import { baseUrl } from '../../store/services/baseUrl';
import StoreLink from '../../general/components/links/StoreLink';
import { Link } from 'react-router-dom';
import { ICartOrders, IGroupedCarts } from '../../models/IOrder';
import { LoadingButton } from '@mui/lab';

export default function CartPage() {
    const theme = useTheme();
    const [page, setPage] = React.useState<number>(1)
    const { data: pageData, isFetching, error, refetch } = orderAPI.useFetchCartQuery(page);
    const [data, setData] = React.useState<IGroupedCarts[]>();
    const [deleteFromCart, { isLoading: deleteLoading, error: deleteError }] = orderAPI.useDeleteFromCartMutation();
    const [buyCartGood, {isLoading: buyLoading, error: buyError}] = orderAPI.useBuyCartGoodMutation();
    React.useEffect(() => setData(pageData?.data), [pageData])

    const changeCount = (id: number, count: number) => {
        setData(prevData => {
            if (!prevData) return prevData;
            const newData = prevData.map(groupedCart => {
                return {
                    ...groupedCart,
                    carts: groupedCart.carts.map(cart => {
                        if (cart.id === id) {
                            return {
                                ...cart,
                                count: count
                            };
                        }
                        return cart;
                    })
                };
            });

            return newData;
        });
    }
    const changeSelected = (id: number) => {
        setData(prevData => {
            if (!prevData) return prevData;
            const newData = prevData.map(groupedCart => {
                return {
                    ...groupedCart,
                    carts: groupedCart.carts.map(cart => {
                        if (cart.id === id) {
                            return {
                                ...cart,
                                selected: !cart.selected,
                            };
                        }
                        return cart;
                    })
                };
            });

            return newData;
        });
    }

    const getSellerSelected = (id: number): boolean => {
        if (!data) return false;
        let value = true;
        for (let groupedCart of data) {
            if (groupedCart.seller.id === id) {
                for (let cart of groupedCart.carts)
                    value = value && Boolean(cart.selected)
                break;
            }
        }
        return value;
    }

    const getSellerIndeterminate = (id: number): boolean => {
        if (!data) return false;
        const selected = getSellerSelected(id);
        let value = false;
        for (let groupedCart of data) {
            if (groupedCart.seller.id === id) {
                for (let cart of groupedCart.carts)
                    value = value || Boolean(cart.selected)
                break;
            }
        }
        return selected !== value;
    }

    const changeSelectedSeller = (id: number) => {
        const selected = getSellerSelected(id);
        setData(prevData => {
            if (!prevData) return prevData;
            const newData = prevData.map(groupedCart => {
                return {
                    ...groupedCart,
                    carts: groupedCart.carts.map(cart => {
                        if (groupedCart.seller.id === id) {
                            return {
                                ...cart,
                                selected: !selected,
                            };
                        }
                        return cart;
                    })
                };
            });
            return newData;
        });
    }

    const getSelectedCount = (): number => {
        let result = 0;
        if (!data) return result;
        for (let groupedCart of data) {
            for (let cart of groupedCart.carts)
                if (cart.selected)
                    result += 1;

        }
        return result;
    }

    const getPrice = (): number => {
        if (!data) return 0;
        let result = 0;
        for (let groupedCart of data) {
            for (let cart of groupedCart.carts)
                if (cart.selected)
                    result += cart.count * cart.good.price;

        }
        return parseFloat(result.toFixed(3));
    }
    const deleteSelected = async () => {
        if (!data) return;
        for (let groupedCart of data) {
            for (let cart of groupedCart.carts)
                if (cart.selected)
                    await deleteFromCart(cart.id);
        }
        refetch();
    }

    const buySelected = async () => {
        if (!data) return;
        let goods : ICartOrders[] = [];
        for (let groupedCart of data) {
            if(getSellerSelected(groupedCart.seller.id) || getSellerIndeterminate(groupedCart.seller.id)){
                let carts_id = [];
                let counts = [];
                for (let cart of groupedCart.carts)
                    if (cart.selected){
                        carts_id.push(cart.id);
                        counts.push(cart.count);
                    }
                goods.push({
                    carts_id: carts_id,
                    counts: counts,
                });
            }
            
                    
        }
        console.log(goods);
        if(goods.length > 0)
            await buyCartGood({goods: goods});

    }
    return (
        <>
            <Box mb={10}>
                <Stack direction='row' alignItems='center'>
                    <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
                        Корзина
                    </Typography>
                    <Typography variant='subtitle2' color="secondary" ml={1}>
                        {`${getSelectedCount()} вибрано`}
                    </Typography>
                </Stack>

                {isFetching ? <>
                    <Skeleton variant="rounded" width='100%' height='51.6px' sx={{ borderRadius: '10px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />
                    {Array.from({ length: 5 }, (_, i) => (
                        <Skeleton variant="rectangular" width='100%' height='200px' sx={{ mt: '1px' }} />
                    ))}
                </> :
                    error ?
                        <Typography variant='subtitle1' color='error' textAlign='center'>
                            Сталася помилка при загрузці
                        </Typography> :
                        <>
                            {data && data.map(groopedCart =>
                                <Box key={groopedCart.seller.id} sx={{ marginBlock: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', border: `1px solid ${theme.palette.background.paper}`, borderRadius: '10px 10px 0px 0px', padding: '1px 8px', mb: '1px' }}>
                                        <Checkbox sx={{ mr: 1 }} onChange={() => changeSelectedSeller(groopedCart.seller.id)} checked={getSellerSelected(groopedCart.seller.id)} indeterminate={getSellerIndeterminate(groopedCart.seller.id)} />
                                        <StoreLink to={`shop/${groopedCart.seller.id}`} name={groopedCart.seller.name} src={baseUrl + groopedCart.seller.avatar} />
                                    </Box>
                                    {groopedCart.carts.map(cart =>
                                        <Box key={cart.id} sx={{ display: 'flex', alignItems: 'center', padding: '1px 8px', border: `1px solid ${theme.palette.background.paper}` }}>
                                            <Checkbox sx={{ mr: 1 }} onChange={() => changeSelected(cart.id)} checked={Boolean(cart.selected)} />
                                            <Link to={`/goods/${cart.good.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                                                <img src={baseUrl + cart.good.image} alt={cart.good.name} style={{ aspectRatio: 1, maxHeight: '200px', height: '100%' }} />
                                                <Grid container flexGrow={1} height='100%' spacing={2}>
                                                    <Grid item xs={12} md={6} display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' height={{ xs: 'fit-content', md: '100%' }}>
                                                        <Typography variant='body1' color='text.primary'>
                                                            {cart.good.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={3} display='flex' justifyContent='center'>
                                                        <Counts min={1} max={cart.good.count} value={cart.count} onChange={(value) => changeCount(cart.id, value)} />
                                                    </Grid>
                                                    <Grid item xs={6} md={3} display='flex' flexDirection='column' justifyContent='center' alignItems={{ md: 'center' }}>
                                                        <Typography variant='subtitle1' color='error' textAlign='center'>
                                                            $ {cart.good.price}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Link>
                                        </Box>
                                    )}
                                </Box>
                            )}
                            {pageData?.pages && pageData?.pages > 1 &&
                                <Pagination count={pageData?.pages} variant="outlined" color="primary" page={page} onChange={(e, page) => { setPage(page); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                                    size='large'
                                    sx={{
                                        paddingBlock: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%'
                                    }}
                                />
                            }
                        </>

                }

            </Box>
            <Box sx={{ width: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 91px)' }, background: theme.palette.background.paper, position: 'fixed', top: { xs: 'calc(100vh - 140px)', sm: 'calc(100vh - 76px)' } }} display='flex' justifyContent='space-between' paddingInline={3} paddingBlock={1}>
                <Box>
                    <Typography variant='h6' color='error'>
                        {`$ ${getPrice()}`}
                    </Typography>
                    <Typography variant='subtitle1' color='secondary'>
                        Загалом
                    </Typography>
                </Box>
                <Stack direction='row'>
                    <LoadingButton
                        loading={deleteLoading}
                        loadingPosition="start"
                        startIcon={<Delete />}
                        onClick={deleteSelected}
                        disableElevation disabled={getSelectedCount() === 0} size="large" variant="outlined" color="primary">
                        Видалити обране
                    </LoadingButton>
                    <LoadingButton variant='outlined' sx={{ ml: 1 }} disabled={getSelectedCount() === 0}
                    loading={buyLoading}
                    loadingPosition="start"
                    startIcon={<ShoppingBag />}
                    onClick={buySelected}
                    disableElevation
                    size="large"  color="primary"> 
                        Купити
                    </LoadingButton>
                </Stack>
            </Box>
        </>
    )
}
