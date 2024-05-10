import React from 'react'
import { Grid, Card, Typography, CardMedia, CardContent, Stack, Rating, Tooltip, IconButton, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Delete, Edit } from '@mui/icons-material'
import { IGoodCardData } from '../../../models/IGood'
import { baseUrl } from '../../../store/services/baseUrl'
import ViewCard from './ViewCard'

interface IGoodCardProps {
    type: 'view' | 'edit' | 'order',
    good: IGoodCardData,
    editClick?: (event: React.MouseEvent<HTMLButtonElement>)=>void,
    deleteClick?: (event: React.MouseEvent<HTMLButtonElement>)=>void,
}

export default function GoodCard({ type, good, editClick, deleteClick }: IGoodCardProps) {
    const theme = useTheme();

    return (
        <Grid item xs={6} sm={4} md={2} {...(type !== 'order' && { xs: 6, md: 3, sm: 4, xl: 2.4 })}>
            <Link to={`/goods/${good.id}`} style={{ textDecoration: 'none' }}>
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
                        image={baseUrl + good.image}
                        title={good.name}
                        component='img'
                        loading="lazy"
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography variant='h6' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {good.name}
                        </Typography>
                        {type === 'view' && <ViewCard good={good}/>}
                        {type === 'edit' &&
                            <>
                                <Typography variant='h5'>
                                    $&#160;{good.price}
                                </Typography>
                                <Stack direction={{ xs: 'column', md: 'row' }} mt={1} display='flex' justifyContent='space-evenly'>
                                    <Button variant='outlined' color='info' startIcon={<Edit />} onClick={editClick}>
                                        Змінити
                                    </Button>
                                    <Button variant='outlined' color='error' sx={{ marginLeft: { md: 1 }, mt: { xs: 1, md: 0 } }} startIcon={<Delete />} onClick={deleteClick}>
                                        Видалити
                                    </Button>
                                </Stack>
                            </>

                        }
                        {type === 'order' &&
                            <>
                                <Typography variant='body2' color='secondary' marginBlock={1}>
                                    Специфікація
                                </Typography>
                                <Stack direction='row'>
                                    <Typography variant='body1' color='text'>
                                        {'$ ' + good.price}
                                    </Typography>
                                    <Typography variant='body1' color='secondary' ml={2}>
                                        {'x' + '2'}
                                    </Typography>
                                </Stack>
                            </>

                        }
                    </CardContent>
                </Card>
            </Link>
        </Grid >
    )
}
