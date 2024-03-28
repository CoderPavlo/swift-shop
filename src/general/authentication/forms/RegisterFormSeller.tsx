import React from 'react'
import { useTranslation } from 'react-i18next';

import {
  Button,
  Grid,
  TextField,

} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { ESteps } from '../components/RegisterStepper';

export interface ISellerData {
  company: string,
  phone_number: string,
  adress: string,
}

interface IRegisterFormSellerProps {
  data: ISellerData,
  setData: React.Dispatch<React.SetStateAction<ISellerData>>,
  setActiveStep: React.Dispatch<React.SetStateAction<ESteps>>,
}
export default function RegisterFormBuyer({ data, setData, setActiveStep }: IRegisterFormSellerProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={data}
      validationSchema={Yup.object().shape({
        company: Yup.string().max(255, t('incorrect-entry')).required(t('required-field')),
        phone_number: Yup.string().max(255, t('incorrect-entry')).required(t('required-field')),
        adress: Yup.string().max(255, t('incorrect-entry')).required(t('required-field')),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log(values);
        setData(values);
        setActiveStep(ESteps.AVATAR)
        setStatus({ success: true });
        setSubmitting(true);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="company"
                value={values.company}
                name="company"
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                error={Boolean(touched.company && errors.company)}
                helperText={errors.company}
                label={t('register.company')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={Boolean(touched.phone_number && errors.phone_number)}
                value={values.phone_number}
                name="phone_number"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.phone_number}
                label={t('register.phone_number')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                error={Boolean(touched.adress && errors.adress)}
                value={values.adress}
                name="adress"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.adress}
                label={t('register.adress')}
              />
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
