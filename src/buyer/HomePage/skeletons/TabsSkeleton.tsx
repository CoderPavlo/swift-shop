import React from 'react'

import { Stack, Skeleton } from '@mui/material';

export default function TabsSkeleton(): React.JSX.Element {
    return (
        <Stack flexDirection='row' height='80px'>
            <Skeleton width='144px' sx={{ borderRadius: '16px' }} />
            <Skeleton width='103px' sx={{ marginInline: '16px', borderRadius: '16px' }} />
            <Skeleton width='90px' sx={{ borderRadius: '16px' }} />
        </Stack>
    )
}
