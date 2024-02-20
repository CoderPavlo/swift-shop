import React from 'react'
import { Typography, Stack, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { categories } from '../../db/categories/categories';
import { useTheme } from "@mui/material/styles";

export default function CategoriesPage(): React.JSX.Element {
    const theme = useTheme();
    return (
        <>
            {categories.map((category, i) =>
                <div key={i}>
                    <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2}>
                        <Typography variant="h6" color="primary" textTransform='uppercase'>
                            {category.name}
                        </Typography>
                        <Typography variant='subtitle1' component={Link} to={`/categories/${category.id}`} color="secondary">
                            Вибрати
                        </Typography>
                    </Stack>
                    <Grid container spacing={2}>
                        {category.subCategories.map((subcategory, j) =>
                            <Grid item xs={4} md={2.4}>
                                <Link to={`/categories/${subcategory.id}`} style={{ textDecoration: 'none' }}>
                                    <Card sx={{
                                        borderRadius: '10px', background: 'transparent',
                                        '&:hover': {
                                            background: theme.palette.background.paper,
                                        }
                                    }}>
                                        <img
                                            src={subcategory.image}
                                            alt={subcategory.name}
                                            style={{ width: '100%' }}
                                        />
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', height: '92px' }}>
                                            <Typography variant="subtitle2" textAlign="center">
                                                {subcategory.name}
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
    )
}
