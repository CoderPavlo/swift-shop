import { Button, ButtonGroup, Grid, Pagination, Rating, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import Counts from '../CartPage/components/Counts'
import { goodAPI } from '../../store/services/goodAPI';
import { useParams } from 'react-router';
import { baseUrl } from '../../store/services/baseUrl';
import GoodsSkeleton from '../HomePage/skeletons/GoodsSkeleton';
import GoodCard from '../../general/components/cards/GoodCard';
import Loading from '../../general/components/Loading';

export default function GoodPage() {
    const [quantity, setQuantity] = React.useState<number>(1);
    const { id } = useParams();
    const { data: good, isFetching, error } = goodAPI.useFetchGoodByIdQuery(Number(id || '0'));
    const [page, setPage] = React.useState<number>(1);
    const { data: similarGoods, isFetching: similarLoading, error: similarError, refetch: similarRefetch } = goodAPI.useFetchSimilarGoodsQuery({ id: Number(id || '0'), page: page });
    React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setPage(1) }, [id])
    return (
        <Grid container spacing={2} mt={0} ml={0} sx={{ width: '100%' }}>
            {error ? <Typography variant='subtitle1' color='error' textAlign='center'>
                Сталася помилка при загрузці
            </Typography> :
                <>
                    <Grid item xs={12} md={5} display='flex' justifyContent='center'>
                        {isFetching ?
                            <Skeleton variant="rounded" width={500} height={500} />
                            :
                            <img src={baseUrl + good?.image} alt={good?.name} />
                        }
                    </Grid>
                    <Grid item xs={12} md={7} display='flex' justifyContent='center' flexDirection='column'>
                        <Typography variant='h5' color='text' width='100%' textAlign='center' >
                            {isFetching ? <Skeleton /> : good?.name}
                        </Typography>
                        <Stack direction='row' mt={2}>
                            <Typography variant='h5' color='primary'>
                                {isFetching ? <Skeleton /> : '$ ' + good?.price}
                            </Typography>
                            {good && good?.discount > 0 &&
                                <Typography variant='subtitle1' color='error' ml={1}>
                                    {'-' + good?.discount + '%'}
                                </Typography>
                            }
                        </Stack>

                        <Stack sx={{ mt: 1 }} display='flex'  >
                            {isFetching ?
                                <Skeleton height='24px' /> :
                                <Rating value={good?.rating} readOnly size="medium" precision={0.1} />
                            }
                        </Stack>
                        <Typography variant='h6' color='secondary.main' mt={4} textAlign='center' >
                            {isFetching ? <Skeleton /> : good?.description}
                        </Typography>



                        <Typography variant='h6' color='text' mt={4}>
                            {isFetching ? <Skeleton /> : 'Кількість:'}
                        </Typography>
                        {isFetching ?
                            <Skeleton height='40px' />
                            :
                            <Counts value={quantity} onChange={(value) => setQuantity(value)} min={1} max={good?.count || 1} />
                        }
                        {isFetching ?
                            <Skeleton height='40px' /> :
                            <ButtonGroup
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                <Button variant='outlined'>Додати в корзину</Button>
                                <Button variant='contained'>Купити</Button>
                            </ButtonGroup>
                        }
                    </Grid>
                </>

            }
            <Loading
                loading={similarLoading}
                skeleton={<>
                    <Skeleton height='28px' width='100%' variant="rounded" sx={{ mt: 1, mb: 2 }} />
                    <GoodsSkeleton />
                </>}
                error={Boolean(similarError)}
                refetch={similarRefetch}
            >
                <Typography variant="subtitle1" color="primary" textTransform='uppercase' sx={{ width: '100%', mt: 1 }}>
                    Подібні товари
                </Typography>
                <Grid container spacing={2} sx={{ mt: '4px' }}>
                    {similarGoods?.data.map(good =>
                        <GoodCard key={good.id} type='view' good={good} />
                    )}
                </Grid>
                {similarGoods?.pages && similarGoods?.pages > 1 &&
                    <Pagination count={similarGoods?.pages} variant="outlined" color="primary" page={page} onChange={(e, page) => { setPage(page); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                        size='large'
                        sx={{
                            paddingBlock: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    />
                }
            </Loading>
        </Grid>
    )
}
