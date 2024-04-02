import React from 'react'
import { useTranslation} from 'react-i18next';
import {
    Button,
    Grid,
    TextField,
    InputLabel,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { ESteps } from '../components/RegisterStepper';
import { IBuyerData } from './RegisterFormBuyer';
import { IAuthData } from './RegisterForm';
import { ISellerData } from './RegisterFormSeller';
import { ERole } from '../../../models/IUser';

interface IEmailConfirmFormProps {
    data: IConfirmEmailData,
    setData: React.Dispatch<React.SetStateAction<IConfirmEmailData>>,
    setActiveStep: React.Dispatch<React.SetStateAction<ESteps>>,
    personalDataBuyer: IBuyerData,
    personalDataSeller: ISellerData,
    role: ERole,
    authData: IAuthData,

}

export interface IConfirmEmailData {
    code: string,
    sucess: string | null,
}

export default function EmailConfirmForm(props: IEmailConfirmFormProps): React.JSX.Element {
    const { data, setData, setActiveStep, personalDataBuyer, personalDataSeller, role, authData } = props;
    const {t} = useTranslation();
    return (
        <Formik
            initialValues={data}
            validationSchema={Yup.object().shape({
                code: Yup.string().required(t('required-field')),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                if(role===ERole.BUYER)
                    console.log({ ...values, ...personalDataBuyer, ...authData })
                else
                    console.log({ ...values, ...personalDataSeller, ...authData })
                try {
                    setData(values);
                    setStatus({ success: false });
                    setSubmitting(false);
                } catch (err: any) {
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ sucess: err.message });
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <InputLabel>{t('code.entry')}</InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.code}
                                name="code"
                                label={t('code.label')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                fullWidth
                                error={Boolean(touched.code && errors.code)}
                                helperText={errors.code}
                            />
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Button onClick={() => setActiveStep(ESteps.AUTH_DATA)} disableElevation fullWidth size="large" type="button" variant="outlined" color="primary">
                                    {t('back')}
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                    {t('email.confirm')}
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </form>
            )}
        </Formik>
    )
}
