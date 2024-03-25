import { Box, FormControl, Grid, MenuItem, Select, ToggleButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import Analytic from '../../general/components/cards/Analytic';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import StyledToggleButtonGroup from '../../general/menus/StyledToggleButtonGroup';

import { LineChart, PieChart, BarChart } from '@mui/x-charts';

interface IStatistics {
  title: string,
  count: string,
  extra: string,
  statistics: number,
  prediction: number,
}

const statistics: IStatistics[] = [
  {
    title: "Кількість переглядів товарів",
    count: "10000", // Наприклад, 10000 переглядів
    extra: "+2000", // Наприклад, 2000 переглядів за період
    statistics: 20, // Наприклад, 20% відносно попереднього періоду
    prediction: 15, // Наприклад, передбачення наступного періоду 15%
  },
  {
    title: "Кількість замовлень",
    count: "5000", // Наприклад, 500 замовлень
    extra: "+100", // Наприклад, 100 замовлень за період
    statistics: 5, // Наприклад, 25% відносно попереднього періоду
    prediction: 9, // Наприклад, передбачення наступного періоду 30%
  },
  {
    title: "Кількість куплених товарів",
    count: "700", // Наприклад, 700 куплених товарів
    extra: "-150", // Наприклад, 150 куплених товарів за період
    statistics: -21.4, // Наприклад, 21.4% відносно попереднього періоду
    prediction: -25, // Наприклад, передбачення наступного періоду 25%
  },
  {
    title: "Кількість зароблених грошей",
    count: "$10000", // Наприклад, зароблено $10000
    extra: "+$2000", // Наприклад, $2000 за період
    statistics: 25, // Наприклад, 25% відносно попереднього періоду
    prediction: 20, // Наприклад, передбачення наступного періоду 20%
  },
];

const additionalStatistics: IStatistics[] = [
  {
    title: "Загальна кількість товарів",
    count: "2000", // Наприклад, загальна кількість товарів у каталозі
    extra: "+500", // Наприклад, 500 нових товарів за період
    statistics: 25, // Наприклад, 25% відносно попереднього періоду
    prediction: 30, // Наприклад, передбачення наступного періоду 30%
  },
  {
    title: "Кількість нових товарів за період",
    count: "500", // Наприклад, 500 нових товарів за період
    extra: "+100", // Наприклад, 100 нових товарів за попередній період
    statistics: 25, // Наприклад, 25% відносно попереднього періоду
    prediction: 20, // Наприклад, передбачення наступного періоду 20%
  },
  {
    title: "Кількість товарів в кошику",
    count: "300", // Наприклад, 300 товарів у кошику
    extra: "+50", // Наприклад, 50 товарів додано в кошик за період
    statistics: 20, // Наприклад, 20% відносно попереднього періоду
    prediction: 25, // Наприклад, передбачення наступного періоду 25%
  },
  {
    title: "Кількість товарів куплених по знижці",
    count: "150", // Наприклад, 150 товарів куплено по знижці
    extra: "+30", // Наприклад, 30 товарів куплено по знижці за період
    statistics: 25, // Наприклад, 25% відносно попереднього періоду
    prediction: 20, // Наприклад, передбачення наступного періоду 20%
  },
];




export default function DashboardPage() {
  const [selectedStatistic, setSelectedStatistic] = React.useState<number>(0);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const [period, setPeriod] = useState<number>(1);
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

  const data = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
    { id: 3, value: 20, label: 'series D' },
    { id: 4, value: 25, label: 'series F' },
    { id: 5, value: 21, label: 'series G' },
    { id: 6, value: 22, label: 'series H' },
    { id: 7, value: 23, label: 'series J' },
  ];
  return (
    <Grid container spacing={1}>

      <Grid item xs={12} display='flex' justifyContent="space-between" flexDirection="row" alignItems='center' marginTop={2}>
        <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
          Загальна статистика
        </Typography>
        {sm ?
          <Box>
            <StyledToggleButtonGroup

              value={period}
              onChange={(e, value) => { if (value) setPeriod(value) }}
            >
              <ToggleButton value={1} size='small'>
                Тиждень
              </ToggleButton>
              <ToggleButton value={2} size='small'>
                Місяць
              </ToggleButton>
              <ToggleButton value={3} size='small'>
                Рік
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
              <MenuItem value={1}>Цей тиждень</MenuItem>
              <MenuItem value={2}>Цей місяць</MenuItem>
              <MenuItem value={3}>Цей рік</MenuItem>
            </Select>
          </FormControl>
        }

      </Grid>
      {statistics.map((item, index) =>
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Analytic title={item.title} count={item.count} extra={item.extra} statistics={item.statistics} prediction={item.prediction}
            selected={selectedStatistic === index} onClick={() => setSelectedStatistic(index)} />
        </Grid>
      )}
      <Grid item xs={12} md={7}>
        <Typography variant='subtitle1' color='primary' paddingBlock={2} paddingInline={1} textTransform='uppercase'>
          Графік зміни
        </Typography>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={350}
          margin={{ left: 30, right: 10, top: 5, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Typography variant='subtitle1' color='primary' paddingBlock={2} paddingInline={1} textTransform='uppercase'>
          Розподіл по категоріям
        </Typography>
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: theme.palette.secondary.main },
            },
          ]}
          height={350}
        />
      </Grid>
      <Grid item xs={12} display='flex' justifyContent="space-between" flexDirection="row" alignItems='center' marginTop={2}>
        <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
          Статистика по товарах
        </Typography>
        {sm ?
          <Box>
            <StyledToggleButtonGroup

              value={period}
              onChange={(e, value) => { if (value) setPeriod(value) }}
            >
              <ToggleButton value={1} size='small'>
                Тиждень
              </ToggleButton>
              <ToggleButton value={2} size='small'>
                Місяць
              </ToggleButton>
              <ToggleButton value={3} size='small'>
                Рік
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
              <MenuItem value={1}>Цей тиждень</MenuItem>
              <MenuItem value={2}>Цей місяць</MenuItem>
              <MenuItem value={3}>Цей рік</MenuItem>
            </Select>
          </FormControl>
        }
      </Grid>
      {additionalStatistics.map((item, index) =>
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Analytic title={item.title} count={item.count} extra={item.extra} statistics={item.statistics} prediction={item.prediction} />
        </Grid>
      )}
      <Grid item xs={12}>
        <BarChart
          height={450}
          series={series
            .map((s) => ({ ...s, data: s.data }))}
            
          // onItemClick={(event, d) => setItemData(d)}
          // onAxisClick={(event, d) => setAxisData(d)}
        />
      </Grid>
    </Grid>
  )
}

const highlightScope = {
  highlighted: 'series',
  faded: 'global',
} as const;

const series = [
  {
    label: 'Перегляди',
    data: [
      2423, 2210, 764, 1879, 1478, 1373, 1891, 2171, 620, 1269, 724, 1707, 1188,
      1879, 626, 1635, 2177, 516, 1793, 1598,
    ],
  },
  {
    label: 'В кошику',
    data: [
      2362, 2254, 1962, 1336, 586, 1069, 2194, 1629, 2173, 2031, 1757, 862, 2446,
      910, 2430, 2300, 805, 1835, 1684, 2197,
    ],
  },
  {
    label: 'Продажі',
    data: [
      1145, 1214, 975, 2266, 1768, 2341, 747, 1282, 1780, 1766, 2115, 1720, 1057,
      2000, 1716, 2253, 619, 1626, 1209, 1786,
    ],
  },
].map((s) => ({ ...s, highlightScope }));
