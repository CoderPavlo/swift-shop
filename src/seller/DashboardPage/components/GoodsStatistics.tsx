import React from 'react'
import { forecastAPI } from '../../../store/services/forecastAPI';
import { BarChart } from '@mui/x-charts';
import { Grid, Skeleton } from '@mui/material';
import Analytic from '../../../general/components/cards/Analytic';
import Loading from '../../../general/components/Loading';
export interface IGoodStatsProps {
    period: number,
}
export default function GoodsStatistics({ period }: IGoodStatsProps) {
    const { data: additionalStatistics, isFetching: additionalFetching, error: additionalError, refetch: additionalRefetch } = forecastAPI.useFetchAdditionalStatisticsQuery(period);
    const { data: goodsStatistics, isFetching: goodsFetching, error: goodsError, refetch: goodsRefetch } = forecastAPI.useFetchGoodStatisticsQuery(period);
    return (
        <>
            <Loading
                loading={additionalFetching}
                skeleton={<>
                    {Array.from({ length: 4 }, (_, i) => (
                        <Grid key={i} item xs={12} sm={6} md={3} padding={0}>
                            <Skeleton width='100%' height='168px' variant='rounded' sx={{ transform: 'none' }} />
                        </Grid>
                    ))}
                </>}
                height='184px'
                error={Boolean(additionalError)}
                refetch={additionalRefetch}
            >
                {additionalStatistics && additionalStatistics.map((item, index) =>
                    <Grid key={index} item xs={12} sm={6} md={3}>
                        <Analytic title={item.title} count={item.count.toString()} extra={item.extra.toString()} statistics={item.analysis} prediction={item.forecast} period={period} />
                    </Grid>
                )}
            </Loading>

            <Loading
                loading={goodsFetching}
                skeleton={<Skeleton width='100%' height='450px' sx={{ transform: 'none', mt: 1, ml: 1 }} />}
                error={Boolean(goodsError)}
                refetch={goodsRefetch}
            >
                {goodsStatistics &&
                    <BarChart
                        height={450}
                        xAxis={[{
                            data: goodsStatistics.index.map(value => new Date(value)),
                            scaleType: 'band',
                            valueFormatter: (value: Date) => value.getDate().toString() + '.' + (value.getMonth() + 1).toString() + '.' + value.getFullYear().toString(),

                        }]}
                        series={[
                            {
                                data: goodsStatistics.views,
                                label: 'Перегляди',
                                highlightScope
                            },
                            {
                                data: goodsStatistics.cart,
                                label: 'В кошику',
                                highlightScope
                            },
                            {
                                data: goodsStatistics.orders_goods,
                                label: 'Продажі',
                                highlightScope
                            },
                        ]}
                    />
                }
            </Loading>
        </>
    )
}

const highlightScope = {
    highlighted: 'series',
    faded: 'global',
} as const;

