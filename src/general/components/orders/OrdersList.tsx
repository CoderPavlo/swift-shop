import React from 'react'
import { Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import GoodCard from '../cards/GoodCard'
import { Message } from '@mui/icons-material';
import { IGoodCardData } from '../../../models/IGood';
interface IOrdersListProps {
  goods: IGoodCardData[],
  type: 'buyer' | 'seller',
  total?: number,
  status: number,
}
export default function OrdersList({ goods, type, total, status }: IOrdersListProps) {
  const fullWidth = goods.length > 3 || (type === 'seller' && status >= 2);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={fullWidth ? undefined : 8} container display='flex' alignItems='center' spacing={1}>
        {goods.map(good =>
          <GoodCard key={good.id} good={good} type='order' />
        )}
      </Grid>
      <Grid item xs={12} sm={fullWidth ? undefined : 4} display='flex' flexDirection={{ xs: 'row', ...(!fullWidth && { sm: 'column' }) }} justifyContent={{ xs: 'space-evenly', sm: fullWidth ? undefined : 'center' }} alignItems='center'>
        {type === 'buyer' ?
          <>
            <Stack direction={{ xs: 'column', ...(!fullWidth && { sm: 'row' }) }}>
              <Typography variant='h6' color='text'>
                {'Загалом: '}
              </Typography>
              <Typography variant='h6' color='text' textAlign='center' ml={{ ...(!fullWidth && { sm: 1 }) }}>
                {' $ ' + total}
              </Typography>
            </Stack>
            <Stack direction={{ xs: 'row', ...(!fullWidth && { sm: 'column' }) }} mt={{ ...(!fullWidth && { sm: 2 }) }}>
              <Button variant='outlined' fullWidth sx={{ ml: { xs: 1, sm: !fullWidth ? 0 : 1 } }}>
                Додати до корзини
              </Button>
              <Button variant='contained' fullWidth sx={{ mt: { ...(!fullWidth && { sm: 1 }) }, ml: { xs: 1, sm: !fullWidth ? 0 : 1 } }}>
                {status === 3 ?
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
          </>
          :
          <>
            {status < 2 &&
              <>
                <TextField
                  id="input-with-icon-textfield"
                  label="Повідомлення"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Message color='secondary'/>
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  size='small'
                  sx={{
                    width: {xs: '40%', sm: fullWidth ? '40%' : '100%'}
                  }}
                />
                <Button variant='contained' sx={{ mt: { ...(!fullWidth && { sm: 2 }) }, ml: { xs: 1, sm: !fullWidth ? 0 : 1 }, width: {xs: '40%', sm: fullWidth ? '40%' : '100%'} }}>
                  Відправлено
                </Button>

              </>
            }
          </>
        }
      </Grid>
    </Grid>
  )
}
