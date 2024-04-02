import React from 'react'
import { useTranslation } from 'react-i18next';

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Select, MenuItem,

} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { ESteps } from '../components/RegisterStepper';

export interface IBuyerData {
  firstname: string,
  lastname: string,
  day: number,
  month: number,
  year: number,
  gender: number,
}

interface IRegisterFormBuyerProps {
  data: IBuyerData,
  setData: React.Dispatch<React.SetStateAction<IBuyerData>>,
  setActiveStep: React.Dispatch<React.SetStateAction<ESteps>>,
}
export default function RegisterFormBuyer({ data, setData, setActiveStep }: IRegisterFormBuyerProps): React.JSX.Element {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const months = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december')
  ];
  const genders = [
    t('genders.not-selected'),
    t('genders.male'),
    t('genders.female')
  ]
  return (
    <Formik
      initialValues={data}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255, t('incorrect-entry')).required(t('required-field')),
        lastname: Yup.string().max(255, t('incorrect-entry')).required(t('required-field')),
        day: Yup.number().min(1, t('incorrect-entry')).max(31, t('incorrect-entry')).required(t('required-field')),
        month: Yup.number().required(t('required-field')),
        year: Yup.number().min(year - 100, t('incorrect-entry')).max(year, t('incorrect-entry')).required(t('required-field')),
        gender: Yup.number().required(t('required-field')),
      })}
      onSubmit={async (values) => {
        setData(values);
        setActiveStep(ESteps.AVATAR)
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                type="firstname"
                value={values.firstname}
                name="firstname"
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                error={Boolean(touched.firstname && errors.firstname)}
                helperText={errors.firstname}
                label={t("register.firstname")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                error={Boolean(touched.lastname && errors.lastname)}
                type="lastname"
                value={values.lastname}
                name="lastname"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.lastname}
                label={t("register.lastname")}
              />
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12}>
                <InputLabel>{t("register.date")}</InputLabel>
              </Grid>
              <Grid item xs={3} >
                <TextField
                  label={t("register.day")}
                  type="text"
                  value={values.day}
                  name="day"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.day && errors.day)}
                  helperText={errors.day}
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl sx={{ width: '100%' }} error={Boolean(touched.month && errors.month)}>
                  <InputLabel id="select-month-label">Місяць</InputLabel>
                  <Select
                    labelId="select-month-label"
                    id="select-month"
                    value={values.month}
                    label={t("register.month")}
                    name="month"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.month && errors.month)}
                    fullWidth
                  >
                    {months.map((item, index) =>
                      <MenuItem key={index} value={index}>{item}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText>{errors.month}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={4} >
                <TextField
                  label={t('register.year')}
                  type="text"
                  value={values.year}
                  name="year"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.year && errors.year)}
                  helperText={errors.year}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                {t('next')}
              </Button>
            </Grid>

          </Grid>
        </form>
      )}
    </Formik>
  )
}
