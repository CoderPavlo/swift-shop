import React from 'react'
import { useTranslation} from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
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

function LoginForm() : React.JSX.Element {
  const { t } = useTranslation();


  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(t('email.valid')).max(255, t('incorrect-entry')).required(t('required-field')),
          password: Yup.string().max(255, t('incorrect-entry')).required(t('required-field'))
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err: any) {
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
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                {t('login.button')}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default LoginForm