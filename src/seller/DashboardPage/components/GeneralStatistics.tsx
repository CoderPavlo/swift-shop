import React from 'react'
import { forecastAPI } from '../../../store/services/forecastAPI';

import { LineChart, PieChart } from '@mui/x-charts';
import { Grid, Skeleton, Typography } from '@mui/material';
import { TFunction} from 'i18next';
import Analytic from '../../../general/components/cards/Analytic';
import { ICategoryStatistics, IStatistics } from '../../../models/IStatistics';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
const getIndex = (input: IStatistics) => {
    return [...input.data.date.map(value => new Date(value)), new Date(input.future_data.index[1])];
}

const getData = (input: IStatistics) => {
    return [...input.data.count, null];
}

const getFutureData = (input: IStatistics) => {
    return [...Array(input.data.count.length - 1).fill(null), ...input.future_data.count]
}

const getCategoryData = (data: ICategoryStatistics[], t: TFunction<"translation", undefined>) => {

    const result = data.map((value, index) => ({
        id: index,
        label: t(value.good__categories__name),
        value: value.count
    }))
    console.log(result);
    return result;
}

export interface IGeneralStatsProps {
    period: number,
}
export default function GeneralStatistics({ period }: IGeneralStatsProps) {
    const [selectedStatistic, setSelectedStatistic] = React.useState<number>(0);
    const { data: statistics, isFetching, error } = forecastAPI.useFetchUserActivityQuery(period);
    const { data: categoryStatistics, isFetching: categoryFetching } = forecastAPI.useFetchCategoryStatisticsQuery({ period: period, type: selectedStatistic });
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <>
            {isFetching ?
                <>
                    {Array.from({ length: 4 }, (_, i) => (
                        <Grid key={i} item xs={12} sm={6} md={3} padding={0}>
                            <Skeleton width='100%' height='168px' variant='rounded' sx={{ transform: 'none' }} />
                        </Grid>
                    ))}
                </> :
                <>
                    {statistics && statistics.map((item, index) =>
                        <Grid key={index} item xs={12} sm={6} md={3}>
                            <Analytic title={item.title} count={item.count.toString()} extra={item.extra.toString()} statistics={item.analysis} prediction={item.forecast} period={period}
                                selected={selectedStatistic === index} onClick={() => setSelectedStatistic(index)} />
                        </Grid>
                    )}
                </>

            }

            <Grid item xs={12} md={7}>
                {isFetching ? <>
                    <Skeleton width='100%' height='60px' sx={{ marginBlock: 1 }} />
                    <Skeleton width='100%' height='350px' sx={{ transform: 'none' }} />
                </> :
                    <>
                        <Typography variant='subtitle1' color='primary' paddingBlock={2} paddingInline={1} textTransform='uppercase'>
                            Графік зміни
                        </Typography>
                        {statistics &&
                            <LineChart
                                xAxis={[{
                                    data: getIndex(statistics[selectedStatistic]),
                                    scaleType: 'time',
                                    valueFormatter: (value: Date) => value.getDate().toString() + '.' + (value.getMonth() + 1).toString() + '.' + value.getFullYear().toString(),

                                }]}
                                series={[
                                    {
                                        data: getData(statistics[selectedStatistic]),
                                    },
                                    {
                                        data: getFutureData(statistics[selectedStatistic]),
                                    },
                                ]}
                                height={350}
                                margin={{ left: 30, right: 10, top: 5, bottom: 30 }}
                                grid={{ vertical: true, horizontal: true }}
                            />
                        }
                    </>

                }


            </Grid>
            <Grid item xs={12} md={5}>
                {categoryFetching || isFetching ? <>
                    <Skeleton width='100%' height='60px' sx={{ marginBlock: 1 }} />
                    <Skeleton width='100%' height='350px' sx={{ transform: 'none' }} />
                </> :
                    <>
                        <Typography variant='subtitle1' color='primary' paddingBlock={2} paddingInline={1} textTransform='uppercase'>
                            Розподіл по категоріям
                        </Typography>
                        {categoryStatistics &&
                            <PieChart
                                series={[
                                    {
                                        data: getCategoryData(categoryStatistics, t),
                                        cx: 170,
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30, color: theme.palette.secondary.main },
                                    },
                                ]}
                                height={350}
                            />
                        }
                    </>
                }

            </Grid>
        </>
    )
}
