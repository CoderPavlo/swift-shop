import React from 'react'

import { useTranslation } from 'react-i18next';
import AuthPage from './components/AuthPage';
import LoginForm from './forms/LoginForm';
import AuthHeader from './components/AuthHeader';
import AuthCard from './components/AuthCard';

export default function LoginPage(): React.JSX.Element {
    const { t } = useTranslation();
    return (
      <AuthPage>
        <AuthCard bRadius={4}>
          <AuthHeader
            title={t('login.title')}
            link="/register"
            linkText={t('login.link')} />
          <LoginForm />
        </AuthCard>
      </AuthPage>
    );
  }