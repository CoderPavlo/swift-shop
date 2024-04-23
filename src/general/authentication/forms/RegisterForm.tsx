import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Grid,
  Link,
  Typography,
  TextField,

} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import * as Yup from 'yup';
import { Formik } from 'formik';
import NewPasswordInput from '../../components/Inputs/NewPasswordInput';
import { ESteps } from '../components/RegisterStepper';
import { IBuyerData } from './RegisterFormBuyer';
import { ISellerData } from './RegisterFormSeller';
import { IAvatarData } from '../../components/ImageLoad/AvatarLoad';
import { authAPI } from '../../../store/services/authAPI';
import { ERole, IAuth } from '../../../models/IUser';
import getCroppedImg from '../../components/ImageLoad/getCroppedImg';
import { authSlice } from '../../../store/reducers/authSlice';
import { useAppDispatch } from '../../../store/hooks';
import Cookies from 'js-cookie';

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
  const [register, { isLoading }] = authAPI.useRegisterMutation();
  const { setTokens } = authSlice.actions
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (Cookies.get('refreshToken') && Cookies.get('accessToken'))
    navigate('/');

  return (
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
        const avatar = await getCroppedImg(avatarData.loadImage, avatarData.croppedAreaPixels);
        await register({
          email: values.email,
          password: values.password,
          role: role,
          buyer: role === ERole.BUYER ? {
            first_name: personalDataBuyer.firstname,
            last_name: personalDataBuyer.lastname,
            day: personalDataBuyer.day,
            month: personalDataBuyer.month,
            year: personalDataBuyer.year,
            gender: personalDataBuyer.gender,
          } : undefined,
          seller: role === ERole.SELLER ? {
            name: personalDataSeller.company,
            phone: personalDataSeller.phone_number,
            adress: personalDataSeller.adress,
          } : undefined,
          avatar: avatar,
        }).unwrap()
          .then((payload: IAuth) => {
            dispatch(setTokens({
              access_token: payload.access_token,
              refresh_token: payload.refresh_token,
              role: role
            }));
            navigate('/');
          })
          .catch(async (error) => {
            if ('data' in error) {
              await setTouched({ email: true });
              setErrors({ email: (error.data as { message: string }).message });
            }
            else {
              await setTouched({ password: true, email: true })
              setErrors({ email: 'Щось пішло не так', password: ' ' });
            }
          })
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, values, touched }) => (
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
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} md={5}>
                <Button onClick={() => setActiveStep(ESteps.AVATAR)} disableElevation fullWidth size="large" type="button" variant="outlined" color="primary">
                  {t('back')}
                </Button>
              </Grid>
              <Grid item xs={12} md={7}>
                <LoadingButton
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<LoginIcon />}
                  disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                  Зареєструватися
                </LoadingButton>
              </Grid>
            </Grid>

          </Grid>
        </form>
      )}
    </Formik>
  )
}
