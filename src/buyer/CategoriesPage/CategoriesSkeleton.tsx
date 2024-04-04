import React from 'react'

import { Grid, Skeleton, Stack } from '@mui/material';

export default function CategoriesSkeleton() {
    return (
        <>
            {[1, 2].map(index =>
                <Stack key={index}>
                    <Skeleton height='64px' sx={{ marginBlock: '16px' }} />
                    <Grid container spacing={2}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Grid key={i} item xs={4} md={2.4}>
                                <Skeleton key={index} variant='rounded' sx={{ borderRadius: '10px', width: '100%', maxWidth: 'none' }}>
                                    <div style={{ width: '100%', aspectRatio: '1' }} />
                                    <div style={{ height: '92px' }} />
                                </Skeleton>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            )}
        </>
    )
}
