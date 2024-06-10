import React from 'react'
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup';
import { Formik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import NewPasswordInput from '../../../general/components/Inputs/NewPasswordInput';


export default function InfoTab() {
    const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'))
    const { t } = useTranslation();
    const genders = [
        t('genders.male'),
        t('genders.female'),
        t('genders.not-selected')
    ]
    return (
        <>
            <Formik
                initialValues={{
                    firstname: 'Pavlo',
                    lastname: 'Herasymchuk',
                    gender: 2,
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255, 'Некорректний ввід').required("Обов'язкове поле"),
                    lastname: Yup.string().max(255, 'Некорректний ввід').required("Обов'язкове поле"),
                    email: Yup.string().email('Некорректний ввід').max(255, 'Некорректний ввід').required("Обов'язкове поле"),
                    gender: Yup.number().required("Обов'язкове поле"),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(values);

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3} mt={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="firstname"
                                    value={values.firstname}
                                    name="firstname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    fullWidth
                                    error={Boolean(touched.firstname && errors.firstname)}
                                    helperText={errors.firstname}
                                    label={"Ім'я"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    error={Boolean(touched.lastname && errors.lastname)}
                                    type="lastname"
                                    value={values.lastname}
                                    name="lastname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={errors.lastname}
                                    label={'Прізвище'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(touched.gender && errors.gender)}>
                                    <InputLabel id="select-gender-label">Стать</InputLabel>
                                    <Select
                                        labelId="select-gender-label"
                                        id="select-gender"
                                        value={values.gender}
                                        label={t('register.gender')}
                                        name="gender"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.gender && errors.gender)}
                                        fullWidth
                                    >
                                        {genders.map((item, index) =>
                                            <MenuItem key={index} value={index}>{item}</MenuItem>
                                        )}
                                    </Select>
                                    <FormHelperText>{errors.gender}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label={'День народження'}
                                        value={date}
                                        onChange={(value) => setDate(value)}
                                        name='date'
                                        views={['year', 'month', 'day']}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
                            Оновити Інформацію
                        </Button>
                    </form>
                )}
            </Formik>

            <Formik
                initialValues={{
                    email: 'pavlo@gmail.com',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email(t('email.valid')).max(255, t('incorrect-entry')).required(t('required-field')),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(values);

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            type="email"
                            value={values.email}
                            name="email"
                            label={t('email.label')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            helperText={errors.email}
                            sx={{ mt: 4 }}
                        />
                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
                            Оновити Пошту
                        </Button>
                    </form>
                )}
            </Formik>
            {/* 
                                <Formik
                                    initialValues={{
                                        code: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        code: Yup.string().required(t('required-field')),
                                    })}
                                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                                    }}
                                >
                                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                        <form noValidate onSubmit={handleSubmit}>

                                            <TextField
                                                value={values.code}
                                                name="code"
                                                label={t('code.label')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.code && errors.code)}
                                                helperText={errors.code}
                                                sx={{ mt: 2 }}
                                            />
                                            <Button disableElevation fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                                {t('email.confirm')}
                                            </Button>
                                        </form>
                                    )}
                                </Formik> */}

            <Formik
                initialValues={{
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({

                    password: Yup.string().max(255, t('incorrect-entry')).required(t('required-field'))
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Box mt={4}>
                            <NewPasswordInput
                                id="password-input"
                                error={Boolean(touched.password && errors.password)}
                                label={t('password.label')}
                                helperText={errors.password}
                                fullWidth
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Box>
                        <Button disableElevation fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Змінити пароль
                        </Button>
                    </form>
                )}
            </Formik>
        </>
    )
}
