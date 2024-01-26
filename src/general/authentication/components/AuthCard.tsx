import React from 'react'

import { Card, CardContent } from '@mui/material';

export interface IAuthCardProps {
    bRadius: number,
    bTopRadius?: string,
    children: React.ReactNode,

}


export default function AuthCard({bRadius, bTopRadius, children }: IAuthCardProps): React.JSX.Element {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: bRadius,       
                borderTopLeftRadius: bTopRadius ? bTopRadius : bRadius,
                borderTopRightRadius: bTopRadius ? bTopRadius : bRadius,
                maxWidth: { xs: 400, lg: 475 },
                // margin: { xs: 2.5, md: 3 },
                '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%'
                }
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                {children}
            </CardContent>
        </Card>
    )
}
