import React from 'react'
import { IGoods } from '../../../db/goods/goods'
import { Grid, Card, Typography, CardMedia, CardContent, Stack, Rating, Tooltip, IconButton, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { AddShoppingCart, Delete, Edit } from '@mui/icons-material'

interface IInterimCardProps {
    good: IGoods,
    children?: React.ReactNode,

}
const InterimCard = ({ good, children }: IInterimCardProps) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                background: 'transparent',
                position: 'relative',
                '&:hover': {
                    background: theme.palette.background.paper
                }
            }}
        >
            {good.discount !== 0 &&
                <Typography variant='subtitle2' color='error' sx={{ marginLeft: '85%', marginTop: '8px' }} position='absolute'>
                    -{good.discount}%
                </Typography>
            }
            <CardMedia
                sx={{ width: '100%', aspectRatio: '1', marginTop: 0 }}
                image={good.image}
                title={good.name}
            >
            </CardMedia>
            <CardContent>
                <Typography variant='h6' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {good.name}
                </Typography>
                {children}
            </CardContent>
        </Card>
    )
}



interface IGoodCardProps {
    type: 'buyer' | 'seller',
    good: IGoods,

}

export default function GoodCard({ type, good }: IGoodCardProps) {
    return (
        <Grid item xs={6} sm={4} md={3} xl={2.4}>
            {type === 'buyer' ?
                <Link to={`/goods/${good.id}`} style={{ textDecoration: 'none' }}>
                    <InterimCard good={good}>
                        <Stack display="flex" flexDirection="row" justifyContent="space-between">
                            <Stack>
                                <Rating value={good.score} readOnly size="small" precision={0.1} />

                                <Typography variant='h5' sx={{ overflow: 'hidden', mt: 1 }}>
                                    $&#160;{good.price}
                                </Typography>

                            </Stack>
                            <Tooltip title="Додати до корзини">
                                <IconButton color="primary" size='large' onClick={(e) => e.preventDefault()}>
                                    <AddShoppingCart />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </InterimCard>
                </Link>
                :
                <InterimCard good={good}>
                    <Typography variant='h5'>
                        $&#160;{good.price}
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} mt={1} display='flex' justifyContent='space-evenly'>
                        <Button variant='outlined' color='info' startIcon={<Edit />}>
                            Змінити
                        </Button>
                        <Button variant='outlined' color='error' sx={{ marginLeft: { md: 1 }, mt: { xs: 1, md: 0 } }} startIcon={<Delete />}>
                            Видалити
                        </Button>
                    </Stack>
                </InterimCard>
            }
        </Grid>
    )
}
