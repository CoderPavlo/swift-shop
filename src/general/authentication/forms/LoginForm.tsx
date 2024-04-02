import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  Stack,
  TextField,
} from '@mui/material';

import PasswordInput from '../../components/Inputs/PasswordInput';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../../../store/hooks';
import { authSlice } from '../../../store/reducers/authSlice';
import { authAPI } from '../../../store/services/authAPI';
import { IAuth } from '../../../models/IUser';

function LoginForm(): React.JSX.Element {
  const { t } = useTranslation();

  const [login, { isLoading }] = authAPI.useLoginMutation();
  const { setTokens } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (Cookies.get('refreshToken') && Cookies.get('accessToken'))
    navigate('/');


  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(t('email.valid')).max(255, t('incorrect-entry')).required(t('required-field')),
          password: Yup.string().max(255, t('incorrect-entry')).required(t('required-field'))
        })}
        onSubmit={async (values, { setErrors, setTouched }) => {
          await login({
            email: values.email,
            password: values.password,
          }).unwrap()
            .then((payload: IAuth) => {
              dispatch(setTokens({
                access_token: payload.access_token,
                refresh_token: payload.refresh_token,
                role: payload.role
              }));
              navigate('/');
            })
            .catch(async (error) => {
              await setTouched({ password: true, email: true })
              if ('data' in error) {
                setErrors({ email: (error.data as { message: string }).message, password: ' ' });
              }
              else {
                setErrors({ email: 'Щось пішло не так', password: ' ' });
              }
            })
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack height={170} justifyContent="space-between" direction="column">
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
                  <PasswordInput
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
                </Stack>
              </Grid>

              <Grid item xs={12} mt={-3} mb={-1} display="flex" justifyContent="flex-end" flexDirection="row">
                <Link variant="subtitle2" component={RouterLink} to="" color="text.primary">
                  {t('password.forgot')}
                </Link>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<LoginIcon />}
                  disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  {t('login.button')}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default LoginForm