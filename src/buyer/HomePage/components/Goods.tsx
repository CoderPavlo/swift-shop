import React from 'react'

import { Grid, Card, CardMedia, CardContent, Typography, Rating, Stack, Tooltip, IconButton, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { goods } from '../../../db/goods/goods';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useTheme } from "@mui/material/styles";
export default function Goods(): React.JSX.Element {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            {goods.map((item, index) =>
                <Grid key={index} item xs={6} sm={4} md={3} xl={2.4}>

                    <Link to={`/goods/${item.id}`} style={{ textDecoration: 'none' }}>
                        <Card
                            sx={{
                                background: 'transparent',
                                position: 'relative',
                                '&:hover': {
                                    background: theme.palette.background.paper
                                }
                            }}
                        >
                            {item.discount !== 0 &&
                                <Typography variant='subtitle2' color='error' sx={{ marginLeft: '85%', marginTop: '8px' }} position='absolute'>
                                    -{item.discount}%
                                </Typography>
                            }


                            <CardMedia
                                sx={{ width: '100%', aspectRatio: '1', marginTop: 0 }}
                                image={item.image}
                                title={item.name}
                            >
                            </CardMedia>
                            <CardContent>
                                <Typography variant='h6' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {item.name}
                                </Typography>
                                <Stack display="flex" flexDirection="row" justifyContent="space-between">
                                    <Stack>
                                        <Rating value={item.score} readOnly size="small" precision={0.1} />

                                        <Typography variant='h5' sx={{ overflow: 'hidden', mt: 1 }}>
                                            $&#160;{item.price}
                                        </Typography>

                                    </Stack>
                                    <Tooltip title="Додати до корзини">
                                        <IconButton color="primary" size='large' onClick={(e) => e.preventDefault()}>
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </CardContent>

                        </Card>
                    </Link>
                </Grid>
            )
            }
        </Grid >
    )
}
