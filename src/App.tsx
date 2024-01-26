import React from 'react';

import { useTranslation} from 'react-i18next';

import useMediaQuery from '@mui/material/useMediaQuery';
import ThemeComponent from './general/components/ThemeComponent';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage  from './general/authentication/RegisterPage';
import LoginPage from './general/authentication/LoginPage';

function App() {

  const prefersMode: 'dark' | 'light' = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const [mode, setMode] = React.useState<'dark' | 'light'>(prefersMode);


  return (
    <ThemeComponent mode={mode}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}>

          </Route>
          <Route path='/login' element={<LoginPage />}/> 
          <Route path='/register' element={<RegisterPage />}/> 
        </Routes>
        </BrowserRouter>
    </ThemeComponent>
  );
}

export default App;
