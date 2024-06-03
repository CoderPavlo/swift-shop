import {ExpandMore } from '@mui/icons-material'
import { Stack, Typography, Checkbox, FormControlLabel, Accordion, AccordionDetails, AccordionSummary, Box, } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { orderTypes } from '../../general/settings/orderTypes';
import OrdersList from '../../general/components/orders/OrdersList';

export default function OrdersPage() {
    const theme = useTheme();
    const [expandedPanel, setExpandedPanel] = React.useState<number>();
    return (
        <>
            <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2} alignItems='center'>
                <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
                    Список замовлень
                </Typography>
                <FormControlLabel control={<Checkbox />} label="Ще не відправлені" />
            </Stack>
            <Box sx={{ background: theme.palette.background.paper }} width='100%' paddingLeft={2} paddingRight={5} paddingBlock='12px'>
                <Stack width='100%' direction='row'>
                    <Typography variant='subtitle1' color='secondary' sx={{ width: '25%' }}>
                        Номер
                    </Typography>
                    <Typography variant='subtitle1' color='secondary' sx={{ width: '25%' }}>
                        Дата
                    </Typography>
                    <Typography variant='subtitle1' color='secondary' sx={{ width: '25%' }}>
                        Ціна
                    </Typography>
                    <Typography variant='subtitle1' color='secondary' sx={{ width: '25%' }}>
                        Статус
                    </Typography>
                </Stack>
            </Box>
            {/* {orders.map((item, index) =>
                <Accordion key={index} sx={{ background: theme.palette.background.paper }} expanded={expandedPanel===item.id} onChange={(e, newExpanded)=>setExpandedPanel(newExpanded ? item.id : undefined)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"

                    >
                        <Typography variant='subtitle1' color='secondary' sx={{ width: '25%' }}>
                            {item.id}
                        </Typography>
                        <Typography variant='subtitle1' color='secondary' sx={{ width: '25%' }}>
                            {item.date.toISOString().slice(0, 10)}
                        </Typography>
                        <Typography variant='subtitle1' color='secondary' sx={{ width: '25%' }}>
                            {'$ ' + item.total}
                        </Typography>
                        <Typography variant='subtitle1' color={orderTypes[item.status].color} sx={{ width: '25%' }}>
                            {orderTypes[item.status].label}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{background: theme.palette.background.default, border: `4px solid ${theme.palette.background.paper}`}}>
                        <OrdersList type='seller' goods={item.goods} status={item.status}/>
                    </AccordionDetails>
                </Accordion>
            )} */}
        </>
    )
}
