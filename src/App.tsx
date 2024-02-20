import React from 'react';

import ThemeComponent from './general/components/ThemeComponent';
import { ThemeModeProvider } from './context/ThemeModeContext';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './buyer/Navbar/Navbar';
import AuthPage from './general/authentication/components/AuthPage';
import LoginPage from './general/authentication/LoginPage';
import RegisterPage, { ERole, RegisterCard } from './general/authentication/RegisterPage';
import HomePage from './buyer/HomePage/HomePage';
import NavbarSkeleton from './buyer/Navbar/NavbarSkeleton';
import { Suspense } from 'react';
import HomeSkeleton from './buyer/HomePage/HomeSkeleton';
import CategoriesPage from './buyer/CategoriesPage/CategoriesPage';
function App() {

  return (
    <ThemeModeProvider>
      <ThemeComponent>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Suspense fallback={<NavbarSkeleton/>}><Navbar /></Suspense>}>
              <Route index element={<Suspense fallback={<HomeSkeleton/>}><HomePage /></Suspense>} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="cart" element={<div />} />
              <Route path="dashboard" element={<div />} />
              <Route path="profile" element={<div />} />
            </Route>

            <Route path="/" element={<AuthPage />}>
              <Route path='login' element={<LoginPage />} />
              <Route path='register/' element={<RegisterPage />} >
                <Route index element={<RegisterCard role={ERole.BUYER} />} />
                <Route path="shop" element={<RegisterCard role={ERole.SELLER} />} />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeComponent>
    </ThemeModeProvider>
  );
}

export default App;
