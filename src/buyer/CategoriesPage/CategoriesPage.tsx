import React from 'react'
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import CategoriesSkeleton from './CategoriesSkeleton';
import { categoriesAPI } from '../../store/services/categoriesAPI';
import { useTranslation } from 'react-i18next';
import { baseUrl } from '../../store/services/baseUrl';
import Loading from '../../general/components/Loading';

export default function CategoriesPage(): React.JSX.Element {
    const theme = useTheme();
    const { data: categories, error, isFetching, refetch } = categoriesAPI.useFetchCategoriesQuery();
    const { t } = useTranslation();
    return (
        <Loading
            loading={isFetching}
            skeleton={<CategoriesSkeleton />}
            error={Boolean(error)}
            refetch={refetch}
        >
            {categories?.map((category, i) =>
                <div key={i}>
                        <Typography variant="h6" color="primary" textTransform='uppercase' paddingBlock={2}>
                            {t(category.name)}
                        </Typography>
                    <Grid container spacing={2}>
                        {category.subcategories.map((subcategory, j) =>
                            <Grid item xs={4} md={2.4}>
                                <Link to={`/search/?category=${subcategory.id}`} style={{ textDecoration: 'none' }}>
                                    <Card sx={{
                                        borderRadius: '10px', background: 'transparent',
                                        '&:hover': {
                                            background: theme.palette.background.paper,
                                        }
                                    }}>
                                        <img
                                            src={baseUrl + subcategory.image}
                                            alt={subcategory.name}
                                            style={{ width: '100%' }}
                                        />
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', height: '92px' }}>
                                            <Typography variant="subtitle2" textAlign="center">
                                                {t(subcategory.name)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </div>

            )}
        </Loading>
    )
}
