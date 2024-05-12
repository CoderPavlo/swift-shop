import { Box, FormControl, Grid, MenuItem, Select, Skeleton, ToggleButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import Analytic from '../../general/components/cards/Analytic';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import StyledToggleButtonGroup from '../../general/menus/StyledToggleButtonGroup';

import { LineChart, PieChart, BarChart } from '@mui/x-charts';
import { forecastAPI } from '../../store/services/forecastAPI';
import { ICategoryStatistics, IStatistics } from '../../models/IStatistics';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

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

export default function DashboardPage() {
  const [selectedStatistic, setSelectedStatistic] = React.useState<number>(0);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const [period, setPeriod] = useState<number>(2);
  const { data: statistics, isFetching, error } = forecastAPI.useFetchUserActivityQuery(period);
  const { data: categoryStatistics, isFetching: categoryFetching } = forecastAPI.useFetchCategoryStatisticsQuery({ period: period, type: selectedStatistic });
  const { t } = useTranslation();
  const [periodAdd, setPeriodAdd] = useState<number>(2);
  const { data: additionalStatistics, isFetching: additionalFetching } = forecastAPI.useFetchAdditionalStatisticsQuery(periodAdd);
  const { data: goodsStatistics, isFetching: goodsFetching } = forecastAPI.useFetchGoodStatisticsQuery(periodAdd);
  /*
  Загальна статистика
  - ксть переглядів товарів
  - ксть замовлень
  - ксть куплених товарів
  - ксть зароблених грошей

  Графік динаміки кількості замовлень за останній місяць або квартал.
  Графік зміни обсягу продажів

  Товари

  - заг ксть товарів 
  - ксть нових товарів за період
  - ксть товарів в кошику
  - ксть товарів куплених по скидці

  Топ продуктів, які найчастіше переглядають користувачі.
  Топ продуктів, які найчастіше додаються до кошика/продаються.
  
  */
  return (
    <Grid container spacing={1}>

      <Grid item xs={12} display='flex' justifyContent="space-between" flexDirection="row" alignItems='center' marginTop={2}>
        {isFetching ?
          <Skeleton width='100%' height='56px' /> :
          <>
            <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
              Загальна статистика
            </Typography>
            {sm ?
              <Box>
                <StyledToggleButtonGroup

                  value={period}
                  onChange={(e, value) => { if (value !== undefined) setPeriod(value) }}
                >
                  <ToggleButton value={0} size='small'>
                    День
                  </ToggleButton>
                  <ToggleButton value={1} size='small'>
                    Тиждень
                  </ToggleButton>
                  <ToggleButton value={2} size='small'>
                    Місяць
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Box>
              :
              <FormControl variant="standard">
                <Select
                  id="select"
                  value={period}
                  label="Age"
                  onChange={(e) => setPeriod(e.target.value as number)}
                >
                  <MenuItem value={0}>День</MenuItem>
                  <MenuItem value={1}>Тиждень</MenuItem>
                  <MenuItem value={2}>Місяць</MenuItem>
                </Select>
              </FormControl>
            }
          </>
        }


      </Grid>
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

      {additionalFetching ?
        <>
          <Skeleton width='100%' height='56px' />
          {Array.from({ length: 4 }, (_, i) => (
            <Grid key={i} item xs={12} sm={6} md={3} padding={0}>
              <Skeleton width='100%' height='168px' variant='rounded' sx={{ transform: 'none' }} />
            </Grid>
          ))}
        </> :
        <>
          <Grid item xs={12} display='flex' justifyContent="space-between" flexDirection="row" alignItems='center' marginTop={2}>
            <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
              Статистика по товарах
            </Typography>
            {sm ?
              <Box>
                <StyledToggleButtonGroup

                  value={periodAdd}
                  onChange={(e, value) => { if (value !== undefined) setPeriodAdd(value) }}
                >
                  <ToggleButton value={0} size='small'>
                    День
                  </ToggleButton>
                  <ToggleButton value={1} size='small'>
                    Тиждень
                  </ToggleButton>
                  <ToggleButton value={2} size='small'>
                    Місяць
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Box>
              :
              <FormControl variant="standard">
                <Select
                  id="select"
                  value={periodAdd}
                  label="Age"
                  onChange={(e) => setPeriodAdd(e.target.value as number)}
                >
                  <MenuItem value={0}>Цей день</MenuItem>
                  <MenuItem value={1}>Цей тиждень</MenuItem>
                  <MenuItem value={2}>Цей місяць</MenuItem>
                </Select>
              </FormControl>
            }
          </Grid>
          {additionalStatistics && additionalStatistics.map((item, index) =>
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Analytic title={item.title} count={item.count.toString()} extra={item.extra.toString()} statistics={item.analysis} prediction={item.forecast} period={period} />
            </Grid>
          )}
        </>
      }
      <Grid item xs={12}>
        {goodsFetching ? <>
          <Skeleton width='100%' height='450px' />
        </> : <>
          {goodsStatistics &&
            <BarChart
              height={450}
              xAxis={[{
                data: goodsStatistics.index.map(value=>new Date(value)),
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
        </>

        }

      </Grid>
    </Grid>
  )
}

const highlightScope = {
  highlighted: 'series',
  faded: 'global',
} as const;
