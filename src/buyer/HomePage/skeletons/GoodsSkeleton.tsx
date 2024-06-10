import React from 'react'
import { Grid, Skeleton } from '@mui/material';

export default function GoodsSkeleton(): React.JSX.Element {
    return (
        <Grid container spacing={2} mt={2}>
            {Array.from({ length: 10 }, (_, index) =>
                <Grid key={index} item xs={6} sm={4} md={3} xl={2.4}>
                    <Skeleton variant='rounded' sx={{ borderRadius: '10px', width: '100%', maxWidth: '100%' }}>
                        <div style={{ width: '100%', aspectRatio: '1' }} />
                        <div style={{ height: '130px' }} />
                    </Skeleton>
                </Grid>
            )}
        </Grid>
    )
}
