import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid, Card, CardContent, Avatar, Typography, Tabs, Tab } from '@mui/material';
import { authAPI } from '../../../store/services/authAPI';
import { baseUrl } from '../../../store/services/baseUrl';
import Loading from '../../../general/components/Loading';

export interface IProfilePatternProps {
    value: number,
    onChange: (value: number) => void,
    tabs: string[],
    elements: React.ReactNode[],
}

export default function ProfilePattern({ tabs, elements, value, onChange }: IProfilePatternProps) {
    const theme = useTheme();
    const { data, isFetching, error, refetch } = authAPI.useGetUserInfoQuery();
    return (
        <Grid container spacing={3} mt={-2}>
            <Grid item xs={12} md={4} height={{ md: '685px' }}>
                <Card sx={{ background: theme.palette.background.default, width: '100%', height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Loading
                            loading={isFetching}
                            error={Boolean(error)}
                            refetch={refetch}
                        >
                            <Avatar
                                alt={data?.name}
                                sx={{ width: 250, height: 250, my: 2, border: `1px solid ${theme.palette.secondary.main}` }}
                                src={baseUrl + data?.avatar}
                            />
                            <Typography variant="h4" component="div" color="White" align="center">
                                <div>{data?.name}</div>
                            </Typography>
                            <Typography variant="h6" component="div" color="White" align="center">
                                <div>{data?.email}</div>
                            </Typography>
                        </Loading>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={8}>
                <Card sx={{ background: theme.palette.background.default, width: '100%', height: '100%' }}>
                    <CardContent>
                        <Tabs value={value} onChange={(e, value) => onChange(value)}>
                            {tabs.map((item, index) =>
                                <Tab label={item} key={index} />
                            )}
                        </Tabs>
                        {elements.map((item, index) =>
                            <> {value === index && item} </>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
