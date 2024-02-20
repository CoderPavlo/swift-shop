import React from 'react'

import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Skeleton, Stack } from '@mui/material';

export default function CategoriesSceleton() {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));

    const [count, setCount] = React.useState<number>(10);

    React.useEffect(() => {
        setCount((prevValue) => {
            if (xl) return 10;
            if (lg) return 8;
            if (md) return 6;
            if (sm) return 4;
            if (xs) return 3;
            return prevValue;
        });
    }, [xs, sm, md, lg, xl]);

    return (
        <>
            <Skeleton height='28px' sx={{ marginBlock: '16px' }} />
            <Stack marginInline='25px' display='flex' flexDirection='row'>
                {Array.from({ length: count }, (_, index) =>
                    <Skeleton key={index} variant='rounded' sx={{ marginInline: '10px', borderRadius: '10px', width: `calc(100% / ${count})`, maxWidth: '50%' }}>
                        <div style={{ width: '100%', aspectRatio: '1' }} />
                        <div style={{ height: '92px' }} />
                    </Skeleton>
                )}
            </Stack>
        </>
    )
}
