import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import {
  Button,
  FormHelperText,
  Grid,
  Link,
  Typography,
  TextField,

} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import NewPasswordInput from '../../components/Inputs/NewPasswordInput';
import { ESteps } from '../components/RegisterStepper';
import { IBuyerData } from './RegisterFormBuyer';
import { ISellerData } from './RegisterFormSeller';
import { IAvatarData } from '../../components/AvatarLoad/AvatarLoad';
import { ERole } from '../RegisterPage';

interface IRegisterFormProps {
  personalDataBuyer: IBuyerData,
  personalDataSeller: ISellerData,
  avatarData: IAvatarData,
  role: ERole,
  setActiveStep: React.Dispatch<React.SetStateAction<ESteps>>,
}

export interface IAuthData {
  email: string,
  password: string,
  submit: string | null,
}

export default function RegisterForm({ personalDataBuyer, personalDataSeller, avatarData, role, setActiveStep }: IRegisterFormProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email(t('email.valid')).max(255, t('incorrect-entry')).required(t('required-field')),
        password: Yup.string().max(255, t('incorrect-entry')).required(t('required-field'))
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: false });
          setSubmitting(false);
        } catch (err: any) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                {t('register.agree')/* By Signing up, you agree to our &nbsp; */}
                <Link variant="subtitle2" component={RouterLink} to="#">
                  {t('register.terms')/* Terms of Service */}
                </Link>
                {t('register.and')}
                <Link variant="subtitle2" component={RouterLink} to="#">
                  {t('register.policy')/* Privacy Policy */}
                </Link>
              </Typography>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} md={6}>
                <Button onClick={() => setActiveStep(ESteps.AVATAR)} disableElevation fullWidth size="large" type="button" variant="outlined" color="primary">
                  {t('back')}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                  Зареєструватися
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </form>
      )}
    </Formik>
  )
}
