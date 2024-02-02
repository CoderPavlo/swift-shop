import React from 'react'
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import {
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import AuthCard from './components/AuthCard';
import AuthHeader from './components/AuthHeader';
import RegisterStepper from './components/RegisterStepper';
export enum ERole {
  BUYER,
  SELLER,
  ADMIN,
}

export function RegisterCard({ role }: { role: ERole }): React.JSX.Element {
  const { t } = useTranslation();
  return (
      <AuthCard bRadius={4} bTopRadius="0px">
          <AuthHeader
              title={t("register.title")}
              link="/login"
              linkText={t("register.link")}
          />
          <RegisterStepper role={role} />
      </AuthCard>
  )
}

export default function RegisterPage(): React.JSX.Element {
  const { t } = useTranslation();

  const [role, setRole] = React.useState<ERole>(window.location.href.split('/')[4]==='shop' ? ERole.SELLER : ERole.BUYER);
  const theme = useTheme();
  const navigate = useNavigate()
  return (
    <>
      <Tabs value={role} sx={{ mt: 2, }}
        TabIndicatorProps={{
          sx: { bgcolor: "transparent", }
        }}
        onChange={(e, newValue) => {setRole(newValue); navigate(newValue === 0 ? '/register':'/register/shop' );}}>
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
      <Outlet/>
      </>
  )
}

