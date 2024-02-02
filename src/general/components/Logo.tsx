import React from 'react'

import { Link } from 'react-router-dom';
import { ButtonBase, SxProps, Theme, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ILogoProps {
    size: "small" | "large",
    sx?: SxProps<Theme>,
}
function Logo({size, sx}:ILogoProps): React.JSX.Element {
    const theme = useTheme();
    return (
        <ButtonBase
            disableRipple
            component={Link}
            to='/'
            sx={sx}
        >
            <>
            <svg fill="none" height={size==="large" ? "40" : "30"} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 0h48v48h-48z" fill={theme.palette.primary.main} fillOpacity=".01" />
                <g stroke={theme.palette.text.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                    <path d="m4 12h40v8l-1.3985.8391c-2.2168 1.3301-4.9862 1.3301-7.203 0l-1.3985-.8391-1.3985.8391c-2.2168 1.3301-4.9862 1.3301-7.203 0l-1.3985-.8391-1.3985.8391c-2.2168 1.3301-4.9862 1.3301-7.203 0l-1.3985-.8391-1.3985.8391c-2.2168 1.3301-4.98619 1.3301-7.20297 0l-1.39853-.8391z" fill={theme.palette.primary.main} />
                    <path d="m8 22.4889v21.5111h32v-22" />
                    <path d="m8 11.8222v-7.8222h32v8" />
                    <path d="m19 32h10v12h-10z" fill={theme.palette.primary.main} />
                </g>
            </svg>
            </>
            <Typography variant={size==="large" ? "h3" : "h5"} color='text' ml="4px">
                SwiftShop
            </Typography>

        </ButtonBase>
    )
}

export default Logo