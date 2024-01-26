import React from 'react'

import { Link } from 'react-router-dom';
import { ButtonBase, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Logo(): React.JSX.Element {
    const theme = useTheme();
    return (
        <ButtonBase
            disableRipple
            component={Link}
            to='/'
        >
            <>
            <svg fill="none" height="40" viewBox="0 0 48 48" width="40" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 0h48v48h-48z" fill={theme.palette.primary.main} fillOpacity=".01" />
                <g stroke={theme.palette.text.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                    <path d="m4 12h40v8l-1.3985.8391c-2.2168 1.3301-4.9862 1.3301-7.203 0l-1.3985-.8391-1.3985.8391c-2.2168 1.3301-4.9862 1.3301-7.203 0l-1.3985-.8391-1.3985.8391c-2.2168 1.3301-4.9862 1.3301-7.203 0l-1.3985-.8391-1.3985.8391c-2.2168 1.3301-4.98619 1.3301-7.20297 0l-1.39853-.8391z" fill={theme.palette.primary.main} />
                    <path d="m8 22.4889v21.5111h32v-22" />
                    <path d="m8 11.8222v-7.8222h32v8" />
                    <path d="m19 32h10v12h-10z" fill={theme.palette.primary.main} />
                </g>
            </svg>
            </>
            <Typography variant="h3" color='text' ml={1}>
                SwiftShop
            </Typography>

        </ButtonBase>
    )
}

export default Logo