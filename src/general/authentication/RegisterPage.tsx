import React from 'react'
import { useTranslation } from 'react-i18next';
import AuthPage from './components/AuthPage';

import { useTheme } from '@mui/material/styles';
import {
  Tabs,
  Tab,
} from '@mui/material';
import AuthHeader from './components/AuthHeader';
import AuthCard from './components/AuthCard';
import RegisterStepper from './components/RegisterStepper';

export enum ERole {
  BUYER,
  SELLER,
  ADMIN,
}

export default function RegisterPage(): React.JSX.Element {
  const { t } = useTranslation();
  const [role, setRole] = React.useState<ERole>(ERole.BUYER);
  const theme = useTheme();
  return (
    <AuthPage>
      <Tabs value={role} sx={{ mt: 2, }}
        TabIndicatorProps={{
          sx: { bgcolor: "transparent", }
        }}
        onChange={(e, newValue) => setRole(newValue)}>
        <Tab label={t('register.client')}
          sx={{
            background: role === 0 ? theme.palette.background.paper : 'transparent',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: '50%',
          }}
        />
        <Tab label={t('register.shop')}
          sx={{
            background: role === 1 ? theme.palette.background.paper : 'transparent',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: '50%',
          }} />
      </Tabs>
      <AuthCard bRadius={4} bTopRadius="0px">
        <AuthHeader
          title={t("register.title")}
          link="/login"
          linkText={t("register.link")}
        />
        <RegisterStepper role={role} />
      </AuthCard>
    </AuthPage>
  )
}

