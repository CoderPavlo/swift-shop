import { Grid, Pagination, Rating, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import StoreInfo from '../../general/components/links/StoreInfo'
import { authAPI } from '../../store/services/authAPI'
import { baseUrl } from '../../store/services/baseUrl'
import { useTranslation } from 'react-i18next'
import { goodAPI } from '../../store/services/goodAPI'
import GoodsSkeleton from '../../buyer/HomePage/skeletons/GoodsSkeleton'
import GoodCard from '../../general/components/cards/GoodCard'
import Loading from '../../general/components/Loading'

export default function HomePage() {
    const [page, setPage] = React.useState<number>(1);
    const { data: sellerInfo, isFetching: sellerLoading, error: sellerError, refetch: sellerRefetch } = authAPI.useGetSellerInfoQuery();
    const { data: goods, error: goodsError, isFetching: goodsLoading, refetch: goodsRefetch } = goodAPI.useFetchGoodsByShopQuery({ page: page, searchQuery: '', categoryId: -1, order: true });

    const { t } = useTranslation();

    const months = [
        t('months.january'),
        t('months.february'),
        t('months.march'),
        t('months.april'),
        t('months.may'),
        t('months.june'),
        t('months.july'),
        t('months.august'),
        t('months.september'),
        t('months.october'),
        t('months.november'),
        t('months.december')
    ];

    const getStringDate = (dateProps?: string): string => {
        if (!dateProps) return '';
        let date = new Date(dateProps);
        console.log(date);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
    return (
        <>
            <Loading
                loading={sellerLoading}
                skeleton={<Skeleton variant="rectangular" height='32px' sx={{ marginBlock: 2 }} />}
                height='64px'
                error={Boolean(sellerError)}
                refetch={sellerRefetch}
            >
                <Stack flexDirection='row' justifyContent='space-between' display='flex' mb={2}>
                    <StoreInfo name={sellerInfo?.name} src={baseUrl + sellerInfo?.avatar} storeNumber={sellerInfo?.id} location={sellerInfo?.adress} open={getStringDate(sellerInfo?.date_registered)} />
                    <Stack direction='row' display='flex' alignItems='center'>
                        <Typography color='text' variant='subtitle1'>
                            {`${sellerInfo?.percent}% Positive Feedback\t\t|\t\t`}
                        </Typography>
                        <Rating value={sellerInfo?.rating} readOnly size="small" precision={0.1} />
                    </Stack>
                </Stack>
            </Loading>
            <Loading
                loading={goodsLoading}
                skeleton={<GoodsSkeleton />}
                error={Boolean(goodsError)}
                refetch={goodsRefetch}
            >
                <Grid container spacing={2} sx={{ mt: '4px' }}>
                    {goods?.data.map(good =>
                        <GoodCard key={good.id} type='view' good={good} />
                    )}
                </Grid>
                {goods?.pages && goods.pages > 1 &&
                    <Pagination count={goods?.pages} variant="outlined" color="primary" page={page} onChange={(e, value) => { setPage(value); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        size='large'
                        sx={{
                            paddingBlock: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    />
                }
            </Loading>
        </>
    )
}