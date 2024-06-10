import { Update } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import React from 'react'
export interface ILoadingProps {
    loading?: boolean,
    skeleton?: React.ReactNode,
    error?: boolean,
    height?: string,
    refetch?: () => void,
    children: React.ReactNode,
}
export default function Loading({ loading, skeleton, error, height, refetch, children }: ILoadingProps) {
    return (
        <>
            {loading ?
                <>
                    {skeleton ? skeleton :
                        <Box sx={{ display: 'flex', height: height ? height : '100px', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                </> :
                error ?
                    <>
                        <Typography variant='h6' color='error' textAlign='center' display='flex' alignItems= 'center' height={height} justifyContent='center' >
                            <>
                                Сталася помилка при загрузці
                                <IconButton sx={{ marginLeft: 1 }} onClick={refetch}>
                                    <Update />
                                </IconButton>
                            </>
                        </Typography>
                    </> :
                    children
            }
        </>
    )
}
