import { Box, Button, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, SvgIconTypeMap, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Visibility, Store, ViewInAr, Payment, ArrowDropUp, ArrowDropDown, NavigateNext } from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import OrdersList from '../../general/components/orders/OrdersList';
interface IStat {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
  label: string,
  count: string,
  growth: boolean,
  percent: number,

}
interface IOrderType {
  color: string,
  label: string,
  count: number,
}
interface ICoupon {
  discount: number,
  ordersOver: number,
  code: string,
  start: Date,
  end: Date,
  shop: string,
}

export default function DashboardPage() {
  /*
  Статистика
  - переглянуті товари
  - переглянуті магазини
  - кількість замовлень
  - потрачено грошей
  
  - оплачено
  - відправлено
  - активні
  - доставлено
  
  Купони

  Замовлення
  */
  const theme = useTheme();
  const [period, setPeriod] = React.useState<number>(0);
  const statistics: IStat[] = [
    {
      Icon: Visibility,
      label: 'Переглянуто товарів',
      count: '2570',
      growth: true,
      percent: 20,
    },
    {
      Icon: Store,
      label: 'Відвідано магазинів',
      count: '120',
      growth: false,
      percent: 5,
    },
    {
      Icon: ViewInAr,
      label: 'Зроблено замовлень',
      count: '12',
      growth: true,
      percent: 10,
    },
    {
      Icon: Payment,
      label: 'Потрачено грошей',
      count: '$ 500',
      growth: true,
      percent: 2,
    },
  ]
  const orderTypes: IOrderType[] = [
    {
      color: theme.palette.error.main,
      label: 'Обробка',
      count: 2,
    },
    {
      color: theme.palette.warning.main,
      label: 'Оплачено',
      count: 5,
    },
    {
      color: theme.palette.primary.main,
      label: 'Відправлено',
      count: 3,
    },
    {
      color: theme.palette.success.main,
      label: 'Доставлено',
      count: 10,
    },
  ]
  const coupons: ICoupon[] = [
    {
      discount: 15,
      ordersOver: 0,
      code: 'XSE12',
      start: new Date(),
      end: new Date(),
      shop: 'EasyShop',
    },
    {
      discount: 20,
      ordersOver: 99,
      code: 'XSEYE4',
      start: new Date(),
      end: new Date(),
      shop: 'SarShop',
    },
    {
      discount: 10,
      ordersOver: 49,
      code: 'SHEV10',
      start: new Date(),
      end: new Date(),
      shop: 'RsoShop',
    },
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2}>
          <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
            Статистика
          </Typography>
          <FormControl variant="standard">
            <Select
              id="select"
              value={period}
              label="Age"
              onChange={(e) => setPeriod(e.target.value as number)}
            >
              <MenuItem value={0}>Цей тиждень</MenuItem>
              <MenuItem value={1}>Цей місяць</MenuItem>
              <MenuItem value={2}>Цей рік</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Grid container spacing={2}>
          {statistics.map((item, index) =>
            <Grid key={index} item xs={6}>
              <Card>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <item.Icon color='primary' sx={{ height: '80px', width: 'auto' }} />
                  <Box>
                    <Typography variant='body2' color='secondary'>
                      {item.label}
                    </Typography>
                    <Typography variant='subtitle1' color='text' mt={1} mb={1}>
                      {item.count}
                    </Typography>
                    <Stack direction='row'>
                      {item.growth ?
                        <ArrowDropUp color='success' />
                        :
                        <ArrowDropDown color='error' />
                      }
                      <Typography variant='body1' sx={{ color: item.growth ? theme.palette.success.main : theme.palette.error.main }} ml='5px'>
                        {item.percent + ' %'}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item xs={12} mt='-1px'>
            <Card>
              <CardContent sx={{ paddingBottom: '20px !important' }}>
                <Typography variant='body2' color='secondary'>
                  Замовлення
                </Typography>
                <Grid container spacing={1} mt='4px'>
                  {orderTypes.map((item, index) =>
                    <Grid key={index} item xs={3}>
                      <Paper sx={{ background: item.color, width: '100%', height: '4px', borderRadius: '8px' }} />
                      <Typography variant='body1' sx={{ color: item.color }} mt='3px'>
                        {item.label}
                      </Typography>
                      <Typography variant='subtitle1' color='text' >
                        {item.count}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} display='flex' flexDirection='column'>
        <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2}>
          <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
            Купони
          </Typography>
          <Typography variant='subtitle1' component={Link} to="/coupons" color="secondary">
            Всі
          </Typography>
        </Stack>
        {
          //5 чи 6
        }
        <Box flexGrow={1}>
          {coupons.map((item, index) =>
            <Box key={index} display='flex' justifyContent='space-between' alignItems='center' sx={{ borderTop: `2px solid ${theme.palette.error.main}`, background: alpha(theme.palette.error.main, 0.1), marginTop: 1, marginBottom: 2, padding: 1 }}>
              <Stack>
                <Typography variant='subtitle1' color='error' fontWeight='bold'>
                  {item.discount + '% Знижка'}
                </Typography>
                <Typography variant='subtitle2' color='error' mt={1}>
                  {'Для замовлень понад $' + item.ordersOver}
                </Typography>
                <Typography variant='subtitle2' color='error'>
                  {'Промокод: ' + item.code}
                </Typography>
                <Typography variant='body2' color='secondary' mt={1}>
                  {'· ' + item.start.toISOString().slice(0, 10) + ' - ' + item.end.toISOString().slice(0, 10)}
                </Typography>
              </Stack>
              <Typography variant='h6' color='primary' textAlign='center' mr={3}>
                {item.shop}
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBottom={1}>
          <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
            Замовлення
          </Typography>
          <Typography variant='subtitle1' component={Link} to="/orders" color="secondary">
            Всі
          </Typography>
        </Stack>
        {/* {orders.map((item, index) =>
          <Box key={index} marginBlock={1} paddingBlock={1} paddingInline={2} sx={{ background: theme.palette.background.paper }}>
            <Stack direction='row' display='flex' justifyContent='space-between' alignItems='center'>
              <Typography variant='subtitle1' sx={{ color: orderTypes[item.status].color }}>
                {orderTypes[item.status].label}
              </Typography>
              <Stack direction='column'>
                <Typography variant='body2' color='secondary'>
                  {'Дата: ' + item.date.toISOString().slice(0, 10)}
                </Typography>
                <Typography variant='body2' color='secondary'>
                  {'Id: ' + item.id}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Typography component={Link} to={`/shop/${item.shopId}`} variant='subtitle1' sx={{ mt: 1, display: 'flex', alignItems: 'center', color: theme.palette.text.primary, textDecoration: 'none' }}>
              {item.shop}
              <NavigateNext />
            </Typography>
            <OrdersList type='buyer' goods={item.goods} total={item.total} status={item.status}/>
            {/* <Grid container>
              <Grid item xs={12} sm={8} container display='flex' alignItems='center'>
                {item.goods.length === 1 ?
                  <>
                    <Grid item xs={3}>
                      <img src={item.goods[0].image} alt={item.goods[0].name} style={{ maxWidth: '100%' }} />
                    </Grid>
                    <Grid item xs={9} display='flex' justifyContent='center' flexDirection='row' alignItems='center'>
                      <Stack>
                        <Typography variant='body1' color='text'>
                          {item.goods[0].name}
                        </Typography>
                        <Typography variant='body2' color='secondary' mt={{ xs: 1, md: 2 }}>
                          Специфікація
                        </Typography>
                        <Stack direction='row' mt={{ xs: 1, md: 2 }}>
                          <Typography variant='body1' color='text'>
                            {'$ ' + item.goods[0].price}
                          </Typography>
                          <Typography variant='body1' color='secondary' ml={2}>
                            {'x' + '2'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </>
                  :
                  <>
                    {item.goods.map((good, goodIndex) =>
                      <Grid item xs={3} key={goodIndex}>
                        <Tooltip title={good.name + ' $' + good.price + ' x' + '2'}>
                          <img src={good.image} alt={good.name} style={{ maxWidth: '100%' }} />
                        </Tooltip>
                      </Grid>
                    )}
                  </>
                }
              </Grid>
              <Grid item xs={12} sm={4} display='flex' flexDirection={{ xs: 'row', sm: 'column' }} justifyContent={{ xs: 'space-between', sm: 'center' }} alignItems='center'>
                <Stack direction={{ xs: 'column', sm: 'row' }}>
                  <Typography variant='h6' color='text'>
                    {'Загалом: '}
                  </Typography>
                  <Typography variant='h6' color='text' textAlign='center' ml={{ sm: 1 }}>
                    {' $ ' + item.total}
                  </Typography>
                </Stack>
                <Stack direction={{ xs: 'row', sm: 'column' }} mt={{ sm: 2 }}>
                  <Button variant='outlined' fullWidth sx={{ ml: { xs: 1, sm: 0 } }}>
                    Додати до корзини
                  </Button>
                  <Button variant='contained' fullWidth sx={{ mt: { sm: 1 }, ml: { xs: 1, sm: 0 } }}>
                    {item.status === 3 ?
                      <>
                        Видалити
                      </>
                      :
                      <>
                        Підтвердити отримання
                      </>
                    }

                  </Button>
                </Stack>
              </Grid>
            </Grid> 
          </Box>
        )} */}
      </Grid>
    </Grid>
  )
}
