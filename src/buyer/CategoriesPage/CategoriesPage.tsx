import React from 'react'
import { Typography, Stack, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import CategoriesSkeleton from './CategoriesSkeleton';
import { categoriesAPI } from '../../store/services/categoriesAPI';
import { useTranslation } from 'react-i18next';
import { baseUrl } from '../../store/services/baseUrl';

export default function CategoriesPage(): React.JSX.Element {
    const theme = useTheme();
    const { data: categories, error, isLoading } = categoriesAPI.useFetchCategoriesQuery();
    const {t} = useTranslation();
    return (
        <>
            {isLoading ? <CategoriesSkeleton /> :
                error ?
                    <Stack height='100%' display='flex' justifyContent='center' alignItems='center'>
                        <Typography variant='h6' color='error'>
                            Сталася помилка при загрузці
                        </Typography>
                    </Stack>
                    :
                    <>
                        {categories?.map((category, i) =>
                            <div key={i}>
                                <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2}>
                                    <Typography variant="h6" color="primary" textTransform='uppercase'>
                                        {t(category.name)}
                                    </Typography>
                                    {/* <Typography variant='subtitle1' component={Link} to={`/categories/${category.id}`} color="secondary">
                                        Вибрати
                                    </Typography> */}
                                </Stack>
                                <Grid container spacing={2}>
                                    {category.subcategories.map((subcategory, j) =>
                                        <Grid item xs={4} md={2.4}>
                                            <Link to={`/subcategories/${subcategory.id}`} style={{ textDecoration: 'none' }}>
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
                    </>
            }
        </>
    )
}
