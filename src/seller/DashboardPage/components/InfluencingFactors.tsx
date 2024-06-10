import { Grid, Typography } from '@mui/material'
import React from 'react'
import { forecastAPI } from '../../../store/services/forecastAPI'
import { ScatterChart } from '@mui/x-charts';
import Loading from '../../../general/components/Loading';

export default function InfluencingFactors() {
    const { data, isFetching, error, refetch } = forecastAPI.useFetchInfluencingFactorsQuery();

    return (
        <Grid container spacing={1}>
            <Loading
                loading={isFetching}
                error={Boolean(error)}
                refetch={refetch}
            >
                {data &&
                    <>
                        {
                            data.x.map((x, index) =>
                                <Grid item key={index} xs={12} md={4}>
                                    <ScatterChart
                                        height={600}
                                        series={[
                                            {
                                                data: x.map((value, i) => ({ x: value, y: data.y[i], id: i })),
                                            },
                                        ]}
                                        xAxis={[
                                            {
                                                label: data.label[index],
                                            },
                                        ]}
                                    />
                                    <Typography variant='subtitle1' width='100%' textAlign='center' mt={1}>
                                        {`Коефіцієнт: ${data.coefficients[index]}`}
                                    </Typography>
                                </Grid>
                            )}
                        <Typography variant='subtitle1' width='100%' textAlign='center' mt={1}>
                            {`Точність моделі: ${data.accuracy}`}
                        </Typography>
                    </>
                }
            </Loading>
        </Grid>
    )
}
