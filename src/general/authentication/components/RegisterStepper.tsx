import React from 'react'
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Stack, Stepper, Step, StepLabel, } from '@mui/material';
import Check from '@mui/icons-material/Check';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import RegisterFormBuyer, { IBuyerData } from '../forms/RegisterFormBuyer';
import RegisterForm, { IAuthData } from '../forms/RegisterForm';
import EmailConfirmForm, { IConfirmEmailData } from '../forms/EmailConfirmForm';
import { ERole } from '../RegisterPage';
import RegisterFormSeller, { ISellerData } from '../forms/RegisterFormSeller';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.text.secondary,
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.text.secondary,
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: theme.palette.primary.main,
        }),
        '& .QontoStepIcon-completedIcon': {
            color: theme.palette.primary.main,
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" /> }
        </QontoStepIconRoot>
    );
}

export enum ESteps {
    PERSONAL_DATA,
    AUTH_DATA,
    EMAIL_CONFIRM,
}
interface IRegisterStepperProps {
    role: ERole
}
export default function RegisterStepper({ role }: IRegisterStepperProps): React.JSX.Element {
    const { t } = useTranslation();
    const steps = [t('register.entry_data'), t('register.create_pswd'), t('register.confirm_email')];

    const [activeStep, setActiveStep] = React.useState<ESteps>(ESteps.PERSONAL_DATA);
    const date = new Date();

    React.useEffect(() => {
        setActiveStep(ESteps.PERSONAL_DATA);
    }, [role]);

    const [personalDataBuyer, setPersonalDataBuyer] = React.useState<IBuyerData>({
        firstname: '',
        lastname: '',
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        gender: 0,
    });

    const [personalDataSeller, setPersonalDataSeller] = React.useState<ISellerData>({
        company: '',
        phone_number: '',
        adress: ''
    })

    const [authData, setAuthData] = React.useState<IAuthData>({
        email: '',
        password: '',
        submit: null
    })

    const [confirmEmailData, setConfirmEmailData] = React.useState<IConfirmEmailData>({
        code: '',
        sucess: null,
    })


    return (
        <>
            <Stack sx={{ width: '100%', mb: 2 }} spacing={4}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>
            {activeStep === ESteps.PERSONAL_DATA &&
                (role === ERole.BUYER ?
                    <RegisterFormBuyer
                        data={personalDataBuyer}
                        setData={setPersonalDataBuyer}
                        setActiveStep={setActiveStep}
                    /> :
                    <RegisterFormSeller
                        data={personalDataSeller}
                        setData={setPersonalDataSeller}
                        setActiveStep={setActiveStep}
                    />
                )
            }
            {activeStep === ESteps.AUTH_DATA &&
                <RegisterForm
                    data={authData}
                    setData={setAuthData}
                    setActiveStep={setActiveStep}
                />
            }
            {activeStep === ESteps.EMAIL_CONFIRM &&
                <EmailConfirmForm
                    data={confirmEmailData}
                    setData={setConfirmEmailData}
                    setActiveStep={setActiveStep}
                    personalDataBuyer={personalDataBuyer}
                    personalDataSeller={personalDataSeller}
                    role={role}
                    authData={authData}
                />
            }
        </>
    )
}
