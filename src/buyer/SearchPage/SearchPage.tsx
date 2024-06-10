import React from 'react'
import { categoriesAPI } from '../../store/services/categoriesAPI';
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Pagination, Select, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import SwapVertIcon from '../../seller/GoodsPage/components/SwapVertIcon';
import { useSearchParams } from 'react-router-dom';
import { IGoodFilterForBuyer } from '../../models/IGood';
import { useTheme } from '@mui/material/styles';
import { goodAPI } from '../../store/services/goodAPI';
import GoodsSkeleton from '../HomePage/skeletons/GoodsSkeleton';
import GoodCard from '../../general/components/cards/GoodCard';
import Loading from '../../general/components/Loading';
type TQueryParams = "query" | "category";

declare module "react-router-dom" {
    interface URLSearchParams {
        get(name: TQueryParams): string | null;
    }
}


export default function SearchPage() {
    const theme = useTheme();
    const { data: categories, error: categoriesError, isFetching: categoriesLoading, refetch: categoriesRefetch } = categoriesAPI.useFetchSubCategoriesQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultFilter = (): IGoodFilterForBuyer => ({
        searchQuery: searchParams.get('query') || "",
        categoryId: Number(searchParams.get('category') || "-1"),
        page: 1,
    });
    const [filter, setFilter] = React.useState<IGoodFilterForBuyer>(defaultFilter());
    const [price, setPrice] = React.useState<{ from?: number, to?: number }>({})
    React.useEffect(() => setFilter(defaultFilter()), [searchParams]);

    const { data: goods, isFetching, error, refetch } = goodAPI.useFetchSearchQuery(filter);

    const handleChangePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Дозволяємо лише числа та крапку
        if (e.target.value === '') {
            setPrice({ ...price, from: undefined });
        }
        else if (/^[0-9\b.]+$/.test(e.target.value)) {
            setPrice({ ...price, from: Number(e.target.value) });
        }
    };
    const handleChangePriceTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Дозволяємо лише числа та крапку
        if (e.target.value === '') {
            setPrice({ ...price, to: undefined });
        }
        else if (/^[0-9\b.]+$/.test(e.target.value)) {
            setPrice({ ...price, to: Number(e.target.value) });
        }
    };

    return (
        <>
            <Loading
                loading={categoriesLoading}
                skeleton={<Skeleton variant="rectangular" height='40px' sx={{ marginTop: 2, marginBottom: 1, }} />}
                height='56px'
                error={Boolean(categoriesError)}
                refetch={categoriesRefetch}
            >
                <Stack padding={1} marginTop={1} display='flex' justifyContent="space-between" flexDirection="row" alignItems='center'>
                    <Stack direction='row' display='flex' alignItems='center'>
                        <FormControl size='small' sx={{ marginInline: 1, minWidth: '121px' }}>
                            <InputLabel id="category-select-label">Категорія</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={filter.categoryId}
                                label="Категорія"
                                onChange={(e) => setFilter({ ...filter, categoryId: (e.target.value as number), page: 1 })}
                            >
                                <MenuItem value={-1}>
                                    <em>Всі</em>
                                </MenuItem>
                                {categories?.map(category =>
                                    <MenuItem key={category.id} value={category.id}>{t(category.name)}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Button variant='outlined'
                            onClick={() => {
                                if (filter.order)
                                    setFilter({ ...filter, order: false, page: 1 });
                                else if (filter.order === undefined)
                                    setFilter({ ...filter, order: true, page: 1 });
                                else
                                    setFilter({ ...filter, order: undefined, page: 1 });
                            }}

                            endIcon={<SwapVertIcon
                                color1={filter.order ? theme.palette.primary.main : theme.palette.secondary.main}
                                color2={filter.order === false ? theme.palette.primary.main : theme.palette.secondary.main}
                            />}>
                            Ціна
                        </Button>
                    </Stack>
                    <Stack direction='row' display='flex' alignItems='center'>
                        <Typography variant='body1' color="text.primary">
                            Ціна:
                        </Typography>
                        <TextField
                            size='small'
                            label="Від"
                            sx={{ ml: 1, width: '100px' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            value={price.from}
                            onChange={handleChangePriceFrom}
                        />
                        <Typography variant='body1' color="text.secondary" marginInline={1}>
                            -
                        </Typography>
                        <TextField
                            size='small'
                            label="До"
                            sx={{ width: '100px' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            value={price.to}
                            onChange={handleChangePriceTo}
                        />
                        <Button variant='outlined' sx={{ ml: 1 }} onClick={() => {
                            if (price.from || price.to)
                                setFilter({ ...filter, priceFrom: price.from, priceTo: price.to, page: 1 });
                        }}>
                            ОК
                        </Button>
                    </Stack>
                </Stack>
            </Loading>

            <Loading
                loading={isFetching}
                skeleton={<GoodsSkeleton />}
                error={Boolean(error)}
                refetch={refetch}
            >
                <Grid container spacing={2} sx={{ mt: '4px' }}>
                    {goods?.data.map(good =>
                        <GoodCard key={good.id} type='view' good={good} />
                    )}
                </Grid>
                {goods?.pages && goods.pages > 1 &&
                    <Pagination count={goods?.pages} variant="outlined" color="primary" page={Number(searchParams.get('page') || '1')} onChange={(e, page) => { setSearchParams({ tab: searchParams.get('tab') || '0', page: page.toString() }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        size='large'
                        sx={{
                            paddingBlock: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    />
                }
            </Loading>
        </>
    )
}
