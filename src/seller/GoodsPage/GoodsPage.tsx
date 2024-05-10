import { Add, Delete } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
// import { goods } from '../../db/goods/goods';
import GoodCard from '../../general/components/cards/GoodCard';
import GoodDialog from './components/GoodDialog';
import { categoriesAPI } from '../../store/services/categoriesAPI';
import { useTranslation } from 'react-i18next';
import { IGoodFilterForShop } from '../../models/IGood';
import { goodAPI } from '../../store/services/goodAPI';
import GoodsSkeleton from '../../buyer/HomePage/skeletons/GoodsSkeleton';
import SwapVertIcon from './components/SwapVertIcon';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { baseUrl } from '../../store/services/baseUrl';

export default function GoodsPage() {
    const theme = useTheme();
    const { t } = useTranslation();
    const [filter, setFilter] = React.useState<IGoodFilterForShop>({ categoryId: -1, searchQuery: '', order: true, page: 1 });
    const [goodProcessing, setGoodProcessing] = React.useState<{ action: 'add' | 'edit' | 'delete' | null, id: number }>({ action: null, id: -1 });
    const [editId, setEditId] = React.useState<number>(-1);
    const { data: categories, error: categoriesError, isLoading: categoriesLoading } = categoriesAPI.useFetchSubCategoriesByShopQuery();
    const { data: goods, error: goodsError, isFetching: goodsLoading, refetch: goodsRefetch } = goodAPI.useFetchGoodsByShopQuery(filter, { refetchOnMountOrArgChange: false });
    const [deleteGood, { error: deleteError, isLoading: deleteLoading }] = goodAPI.useDeleteGoodMutation();
    const { data: goodForChange, error: goodForChangeError, isLoading: goodForChangeLoading } = goodAPI.useFetchGoodByIdForEditQuery(editId, { refetchOnMountOrArgChange: true });

    let startTime: Date = new Date();
    let typingTimer: ReturnType<typeof setTimeout>;
    const changeFilter = (type: 'category' | 'order' | 'search' | 'page', value: number | string | boolean) => {
        if (type === 'category') setFilter({ ...filter, categoryId: value as number, page: 1 });
        else if (type === 'order') setFilter({ ...filter, order: value as boolean, page: 1 });
        else if (type === 'page') {
            setFilter({ ...filter, page: value as number });
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else if ((new Date).getTime() - startTime.getTime() > 500) {

            clearTimeout(typingTimer);
            typingTimer = setTimeout(() =>
                setFilter((prev) => { return prev.searchQuery === value as string ? prev : { ...filter, searchQuery: value as string, page: 1 } })
                , 500);

        }
    }
    React.useEffect(() => { goodsRefetch() }, [filter]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setFilter({ ...filter, searchQuery: (event.target as HTMLInputElement).value, page: 1 });
            goodsRefetch();
        }
    };

    const handleClose = () => setGoodProcessing({ action: null, id: -1 });

    // React.useEffect(()=>{
    //     console.log(goodForChange);
    // }, [goodForChange])

    return (
        <>
            <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2} alignItems='center'>
                <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
                    Сітка товарів
                </Typography>
                <Button variant='contained' startIcon={<Add />} onClick={() => setGoodProcessing({ action: 'add', id: -1 })}>
                    Створити новий
                </Button>
            </Stack>
            {categoriesLoading ?

                <Skeleton variant="rectangular" height='40px' sx={{ marginBlock: 1 }} />
                : categoriesError ?
                    <Box height='56px' display='flex' justifyContent="center" alignItems='center'>
                        <Typography variant='subtitle1' color='error' textAlign='center'>
                            Сталася помилка при загрузці
                        </Typography>
                    </Box> :

                    <Stack padding={1} display='flex' justifyContent="space-between" flexDirection="row" alignItems='center'>
                        <TextField placeholder='Пошук...' size='small' sx={{ width: { md: '35%' } }} onKeyDown={handleKeyDown} onChange={(e) => changeFilter('search', e.target.value)} />
                        <Stack direction='row' display='flex' alignItems='center'>
                            <FormControl size='small' sx={{ marginInline: 1, minWidth: '121px' }}>
                                <InputLabel id="category-select-label">Категорія</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={filter.categoryId}
                                    label="Категорія"
                                    onChange={(e) => changeFilter('category', e.target.value)}
                                >
                                    <MenuItem value={-1}>
                                        <em>Всі</em>
                                    </MenuItem>
                                    {categories?.map(category =>
                                        <MenuItem key={category.id} value={category.id}>{t(category.name)}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Button variant='outlined' endIcon={<SwapVertIcon color1={filter.order ? theme.palette.primary.main : theme.palette.secondary.main} color2={filter.order ? theme.palette.secondary.main : theme.palette.primary.main} />} onClick={() => changeFilter('order', !filter.order)}>
                                Останні
                            </Button>
                        </Stack>
                    </Stack>
            }

            {goodsLoading ? <GoodsSkeleton /> :
                goodsError ?
                    <Typography variant='subtitle1' color='error' textAlign='center'>
                        Сталася помилка при загрузці
                    </Typography> :
                    <>
                        <Grid container spacing={2} sx={{ mt: '4px' }}>
                            {goods?.data.map(good =>
                                <GoodCard key={good.id} type='edit' good={good}
                                    editClick={(event) => {
                                        event.preventDefault();
                                        setGoodProcessing({ action: 'edit', id: good.id });
                                        setEditId(good.id);
                                    }}
                                    deleteClick={(event) => {
                                        event.preventDefault();
                                        setGoodProcessing({ action: 'delete', id: good.id });
                                    }}
                                />
                            )}
                        </Grid>
                        {goods?.pages && goods.pages > 1 &&
                            <Pagination count={goods?.pages} variant="outlined" color="primary" page={filter.page} onChange={(e, value) => changeFilter('page', value)}
                                size='large'
                                sx={{
                                    paddingBlock: 2,
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            />
                        }
                    </>
            }

            <GoodDialog open={goodProcessing.action === 'add' || goodProcessing.action === 'edit'} handleClose={handleClose} type={goodProcessing.action === 'edit' ? 'edit' : 'add'}
                data={goodProcessing.action === 'edit' && goodForChange ? {
                    id: goodForChange.id,
                    name: goodForChange.name,
                    image: baseUrl + goodForChange.image,
                    description: goodForChange.description,
                    price: goodForChange.price,
                    discount: goodForChange.discount,
                    count: goodForChange.count,
                    categories: goodForChange.categories,
                    tags: goodForChange.tags,
                } : undefined} loading={goodForChangeLoading} error={Boolean(goodForChangeError)}
            />
            <Dialog
                open={goodProcessing.action === 'delete'}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Видалення товару"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" color='text.primary'>
                        Чи справді ви хочете видалити обраний товар?
                    </DialogContentText>
                    {deleteError &&
                        <Alert severity="error">
                            <AlertTitle>Помилка</AlertTitle>
                            Сталася помилка, спробуйте повторити пізніше
                        </Alert>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Скасувати</Button>
                    <LoadingButton onClick={async () => {
                        await deleteGood(goodProcessing.id).then(() => handleClose());
                    }} autoFocus color='error' loading={deleteLoading}
                        loadingPosition="start"
                        startIcon={<Delete />}>
                        Видалити
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
