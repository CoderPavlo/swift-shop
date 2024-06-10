import { Grid, Card, CardContent, Stack, Typography, Button } from '@mui/material'
import React from 'react'

import PaymentIcon from '@mui/icons-material/Payment';
import AddCardIcon from '@mui/icons-material/AddCard';

export default function PaymentTab() {
    return (
        <Grid container spacing={3} mt={0}>
            {['2324', '2351'].map((item, index) =>
                <Grid key={index} item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Stack display='flex' justifyContent='space-between' flexDirection='row' alignItems='center'>
                                <Typography variant="h6">
                                    {'**** ' + item}
                                </Typography>
                                <PaymentIcon sx={{ height: '2rem' }} />
                            </Stack>
                            <Stack display='flex' justifyContent='space-between' flexDirection='row' alignItems='center' mt={1}>
                                <Button variant='outlined'>
                                    Оновити
                                </Button>
                                <Button variant='outlined' color='error'>
                                    Видалити
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}

            <Grid item xs={12} sm={6}>
                <Card>
                    <Button size='large' fullWidth startIcon={<AddCardIcon />} sx={{ height: '100%', minHeight: '116.1px' }}>
                        Додати нову картку
                    </Button>
                </Card>
            </Grid>
        </Grid>
    )
}
