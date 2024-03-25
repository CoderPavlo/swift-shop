import { ArrowDropDown, ArrowDropUp, TrendingDown, TrendingUp } from '@mui/icons-material'
import { Button, Card, CardContent, Chip, Grid, Stack, Typography, alpha } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
const getColor = (percentage: number): 'primary' | 'error' | 'warning' => {
    return percentage > 10 ? 'primary' : percentage < -10 ? 'error' : 'warning';
}

interface IAnalytic {
    title: string,
    count: string,
    extra: string,
    statistics: number,
    prediction: number,
    selected?: boolean,
    onClick?: ()=>void,
}

export default function Analytic({ title, count, extra, statistics, prediction, selected, onClick }: IAnalytic) {
    const theme = useTheme();
    return (
        <Button fullWidth sx={{textTransform: 'none'}} onClick={onClick} disabled={selected===undefined}>
        <Card sx={{ width: '100%', backgroundImage: selected ? `linear-gradient(${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.1)})` : ''}}>
            <CardContent>
                <Stack spacing={0.5}>
                    <Typography variant="subtitle1" color="secondary" textAlign='left'>
                        {title}
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Typography variant="h5" color="inherit">
                                {count}
                            </Typography>
                        </Grid>
                        {prediction && (
                            <Grid item>
                                <Chip
                                    color={getColor(prediction)}
                                    icon={
                                        <>
                                            {prediction >= 0 ?
                                                <TrendingUp style={{ fontSize: '0.75rem', color: 'inherit' }} />
                                                :
                                                <TrendingDown style={{ fontSize: '0.75rem', color: 'inherit' }} />
                                            }
                                        </>
                                    }
                                    label={`${prediction}%`}
                                    sx={{ ml: 1.25, pl: 1 }}
                                    size="small"
                                />
                            </Grid>
                        )}
                    </Grid>
                </Stack>
                <Stack sx={{ pt: 1 }}>
                    <Stack direction='row'>
                        {statistics>=0 ?
                            <ArrowDropUp color={getColor(statistics)}/>
                            :
                            <ArrowDropDown color={getColor(statistics)} />
                        }
                        <Typography variant='body1' sx={{ color: `${getColor(prediction)}.main` }} ml='5px'>
                            {statistics + '%'}
                        </Typography>
                    </Stack>
                    <Typography variant="caption" color="secondary" textAlign='left'>
                        You made an extra{' '}
                        <Typography component="span" variant="caption" sx={{ color: `${getColor(prediction) || 'primary'}.main` }}>
                            {extra}
                        </Typography>{' '}
                        this year
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
        </Button>
    )
}
