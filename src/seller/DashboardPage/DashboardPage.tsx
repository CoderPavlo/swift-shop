import { Box, FormControl, Grid, MenuItem, Select, ToggleButton } from '@mui/material'
import React, { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import StyledToggleButtonGroup from '../../general/menus/StyledToggleButtonGroup';
import TabsComponent, { ETabs } from './components/TabsComponent';
import GeneralStatistics from './components/GeneralStatistics';
import InfluencingFactors from './components/InfluencingFactors';
import GoodsStatistics from './components/GoodsStatistics';



export default function DashboardPage() {

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const [period, setPeriod] = useState<number>(2); 

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
  const [tab, setTab] = React.useState<ETabs>(0);
  return (
    <Grid container spacing={1}>

      <Grid item xs={12} display='flex' justifyContent="space-between" flexDirection="row" alignItems='center'>

        <TabsComponent value={tab} onChange={(e, newValue) => setTab(newValue)} />
        {tab !== ETabs.INFLUENCE &&
          <>
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
      {tab===ETabs.GENERAL && <GeneralStatistics period={period}/>}
      {tab===ETabs.GOODS && <GoodsStatistics period={period}/>}
      {tab===ETabs.INFLUENCE && <InfluencingFactors />}
    </Grid>
  )
}

