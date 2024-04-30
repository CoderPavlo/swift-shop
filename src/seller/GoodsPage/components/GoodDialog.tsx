import { Close, Save } from '@mui/icons-material'
import { Alert, AlertTitle, Dialog, DialogTitle, IconButton, DialogContent, Typography, DialogActions, Chip, Grid, TextField, InputAdornment, Autocomplete, CircularProgress, Box, ListItem, Paper, createFilterOptions } from '@mui/material'
import React, { MutableRefObject } from 'react'
import { useTheme } from '@mui/material/styles'
import ImageLoad from '../../../general/components/ImageLoad/ImageLoad';
import { categoriesAPI } from '../../../store/services/categoriesAPI';
import { useTranslation } from 'react-i18next';
import { goodAPI } from '../../../store/services/goodAPI';
import { IGoodByIdForEdit, IGoodFormData, ITag } from '../../../models/IGood';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { baseUrl } from '../../../store/services/baseUrl';


interface IGoodDialogProps {
    open: boolean,
    handleClose: () => void,
    type: 'add' | 'edit',
    data?: IGoodFormData,
    error?: boolean,
    loading?: boolean,
}

const initialValues: IGoodFormData = {
    name: '',
    image: null,
    description: '',
    price: undefined,
    discount: undefined,
    count: undefined,
    categories: [],
    tags: [],
};
export default function GoodDialog({ open, handleClose, type, data, error, loading }: IGoodDialogProps) {
    const theme = useTheme();
    const { t } = useTranslation();
    const { data: categories, error: errorCategories, isLoading: loadingCategories } = categoriesAPI.useFetchSubCategoriesQuery();
    const { data: tags, error: errorTags, isLoading: loadingTags } = goodAPI.useFetchTagsQuery();
    const [addTags, { isLoading: loadingTagsAdd, error: errorTagsAdd }] = goodAPI.useAddTagsMutation();
    const [addGood, { isLoading: loadingGood, error: errorGood }] = goodAPI.useAddGoodMutation();
    const [updateGood, { isLoading: loadingUpdate, error: errorUpdate }] = goodAPI.useUpdateGoodMutation();
    const filter = createFilterOptions<ITag>();
    const formikRef: MutableRefObject<FormikProps<IGoodFormData> | null> = React.useRef(null);
    React.useEffect(() => {
        formikRef.current?.resetForm({ values: type === 'edit' && data ? data : initialValues });
    }, [data, type])



    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth='lg'
            PaperProps={{ sx: { background: theme.palette.background.default } }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Інформація про товар
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>

            <Formik
                innerRef={formikRef}
                initialValues={data && type === 'edit' ? data : initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255, t('incorrect-entry')).required(t('required-field')),
                    image: Yup.mixed().required(t('required-field')),
                    description: Yup.string().max(40000, t('incorrect-entry')).required(t('required-field')),
                    price: Yup.number().required(t('required-field')),
                    discount: Yup.number().required(t('required-field')),
                    count: Yup.number().required(t('required-field')),
                    categories: Yup.array().min(1, t('required-field')),
                    tags: Yup.array().min(1, t('required-field')),
                })}
                onSubmit={async (values) => {
                    let newTags = values.tags.filter((tag) => tag.id === undefined);
                    let success = true;
                    let tags_id: number[] = [];
                    for (let tag of values.tags) {
                        if (tag.id)
                            tags_id.push(tag.id);
                    }
                    if (newTags.length > 0)
                        await addTags(newTags).unwrap()
                            .then((payload: ITag[]) => {
                                for (let tag of payload) {
                                    if (tag.id)
                                        tags_id.push(tag.id);
                                }
                            }).catch(err => {
                                success = false
                            });
                    if (!success) return;
                    if (type === 'add') {
                        await addGood({
                            name: values.name,
                            image: values.image as File,
                            description: values.description,
                            price: values.price,
                            discount: values.discount,
                            count: values.count,
                            categoriesID: values.categories.map(obj => obj.id),
                            tagsID: tags_id,
                        }).then(() => handleClose())
                    }
                    else {
                        await updateGood({
                            id: values.id,
                            name: values.name,
                            image: typeof values.image === 'string' ? null : values.image,
                            description: values.description,
                            price: values.price,
                            discount: values.discount,
                            count: values.count,
                            categoriesID: values.categories.map(obj => obj.id),
                            tagsID: tags_id,
                        }).then(() => handleClose())
                    }


                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <DialogContent dividers>
                            {(type === 'edit' && (loading || error)) ?
                                (loading ? <Box display='flex' justifyContent='center'>
                                    <CircularProgress color="secondary" />
                                </Box>
                                    : <></>)
                                :
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={7} padding={2} sx={{}}>
                                        <TextField
                                            label='Назва товару'
                                            fullWidth
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={errors.name}
                                        />
                                        <Typography variant='subtitle1' marginTop={2} marginBottom={1} color='text.secondary'>
                                            Медіа товару
                                        </Typography>
                                        <ImageLoad image={values.image} setImage={(image) => setFieldValue('image', image)} />
                                        {Boolean(touched.image && errors.image) &&
                                            <Typography variant='caption' color='error' mt='3px' ml='14px'>
                                                {errors.image}
                                            </Typography>
                                        }
                                        <TextField
                                            sx={{ marginBlock: 2 }}
                                            fullWidth
                                            label="Опис товару"
                                            multiline
                                            maxRows={5}
                                            value={values.description}
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.description && errors.description)}
                                            helperText={errors.description}
                                        />
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    label="Ціна"
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                    value={values.price}
                                                    name="price"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(touched.price && errors.price)}
                                                    helperText={errors.price}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    label="Знижка"
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                                    }}
                                                    value={values.discount}
                                                    name="discount"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(touched.discount && errors.discount)}
                                                    helperText={errors.discount}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    label="Кількість"
                                                    fullWidth
                                                    value={values.count}
                                                    name="count"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(touched.count && errors.count)}
                                                    helperText={errors.count}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Typography variant='subtitle1' marginBottom={2} color='text.secondary'>
                                            Категорії товару
                                        </Typography>
                                        {loadingCategories ?
                                            <Box display='flex' justifyContent='center'>
                                                <CircularProgress color="secondary" />
                                            </Box>
                                            : errorCategories ?
                                                <Typography variant='subtitle1' color='error' textAlign='center'>
                                                    Сталася помилка при загрузці
                                                </Typography>
                                                :
                                                categories &&
                                                <>
                                                    <Autocomplete
                                                        onChange={(event, newValue) => {
                                                            if (newValue && !values.categories.some(item => item.id === newValue.id)) setFieldValue('categories', [newValue, ...values.categories]);
                                                        }}
                                                        options={categories}
                                                        getOptionLabel={(option) => t(option.name)}
                                                        renderInput={(params) => <TextField {...params}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.categories && errors.categories)}
                                                            label="Виберіть категорію" />}
                                                        noOptionsText='Немає категорій'
                                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    />
                                                    {Boolean(touched.categories && errors.categories) &&
                                                        <Typography variant='caption' color='error' mt='3px' ml='14px'>
                                                            {errors.categories as string}
                                                        </Typography>
                                                    }
                                                    <Paper component='ul' sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-evently',
                                                        flexWrap: 'wrap',
                                                        listStyle: 'none',
                                                        pl: 0,
                                                        background: theme.palette.background.default
                                                    }}>
                                                        {values.categories.map(category =>
                                                            <ListItem key={category.id} sx={{ width: 'fit-content' }}>
                                                                <Chip
                                                                    sx={{ paddingInline: 1 }}
                                                                    label={t(category.name)}
                                                                    onDelete={() => setFieldValue('categories', values.categories.filter(value => value.id !== category.id))}
                                                                />
                                                            </ListItem>
                                                        )}
                                                    </Paper>
                                                </>
                                        }
                                        <Typography variant='subtitle1' marginBottom={2} color='text.secondary'>
                                            Теги
                                        </Typography>
                                        {loadingTags ?
                                            <Box display='flex' justifyContent='center'>
                                                <CircularProgress color="secondary" />
                                            </Box>
                                            : errorTags ?
                                                <Typography variant='subtitle1' color='error' textAlign='center'>
                                                    Сталася помилка при загрузці
                                                </Typography>
                                                :
                                                tags &&
                                                <>
                                                    <Autocomplete
                                                        filterOptions={(options, params) => {
                                                            const filtered = filter(options, params);

                                                            const { inputValue } = params;
                                                            // Suggest the creation of a new value
                                                            const isExisting = options.some((option) => inputValue === option.name);
                                                            if (inputValue !== '' && !isExisting) {
                                                                filtered.push({
                                                                    id: undefined,
                                                                    name: inputValue,
                                                                });
                                                            }

                                                            return filtered;
                                                        }}
                                                        selectOnFocus
                                                        clearOnBlur
                                                        handleHomeEndKeys
                                                        getOptionLabel={(option) => {
                                                            if (typeof option === 'string') {
                                                                return option;
                                                            }
                                                            return option.name;
                                                        }}
                                                        onChange={(event, newValue) => {
                                                            if(newValue && (!values.tags.some(tag => tag.id === newValue.id) ||
                                                                (newValue.id===undefined && !values.tags.some(tag => tag.name === newValue.name))
                                                            ))
                                                                setFieldValue('tags', [newValue, ...values.tags]);
                                                        }}
                                                        options={tags}
                                                        renderInput={(params) => <TextField {...params}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.tags && errors.tags)}

                                                            label="Виберіть або додайте теги" />}
                                                        isOptionEqualToValue={(option, value) => option.id === value.id}

                                                        noOptionsText='Немає тегів'
                                                    />
                                                    {Boolean(touched.tags && errors.tags) &&
                                                        <Typography variant='caption' color='error' mt='3px' ml='14px'>
                                                            {errors.tags as string}
                                                        </Typography>
                                                    }
                                                    <Paper component='ul' sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-evently',
                                                        flexWrap: 'wrap',
                                                        listStyle: 'none',
                                                        pl: 0,
                                                        background: theme.palette.background.default
                                                    }}>
                                                        {values.tags.map((tag, index) =>
                                                            <ListItem key={index} sx={{ width: 'fit-content' }}>
                                                                <Chip
                                                                    sx={{ paddingInline: 1 }}
                                                                    label={tag.name}
                                                                    onDelete={() => setFieldValue('tags', values.tags.filter(value => value.name !== tag.name))}
                                                                />
                                                            </ListItem>
                                                        )}
                                                    </Paper>
                                                </>
                                        }
                                    </Grid>
                                </Grid>
                            }

                            {((errorTagsAdd || errorGood || errorUpdate) || (type === 'edit' && error)) &&
                                <Alert severity="error">
                                    <AlertTitle>Помилка</AlertTitle>
                                    Сталася помилка, спробуйте повторити пізніше
                                </Alert>
                            }
                        </DialogContent>
                        <DialogActions>
                            <LoadingButton
                                disabled={type === 'edit' && (error || loading)}
                                loading={loadingTagsAdd || loadingGood || loadingUpdate}
                                loadingPosition="start"
                                startIcon={<Save />}
                                autoFocus type='submit'
                                color="primary">
                                Зберегти
                            </LoadingButton>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    )
}
