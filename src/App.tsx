import React from 'react';

import ThemeComponent from './general/components/ThemeComponent';
import { ThemeModeProvider } from './context/ThemeModeContext';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes as buyerRoutes, unAuthRoutes } from './buyer/routes';
import { routes as sellerRoutes } from './seller/routes';
import { routes as authRoutes } from './general/authentication/routes';
import { useAppSelector } from './store/hooks';
import { ERole } from './models/IUser';

export interface IRoute {
  path: string,
  element: React.ReactNode,
  childrenRoutes?: IRoute[],
}

const renderRoutes = (nestedRoutes: IRoute[]) =>
  nestedRoutes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={route.element}
    >
      {route.childrenRoutes && renderRoutes(route.childrenRoutes)}
    </Route>
  ));

function App() {
  const {role} = useAppSelector(state =>state.authReducer);

  return (
    <ThemeModeProvider>
      <ThemeComponent>
        <BrowserRouter>
          <Routes>

            {role===ERole.BUYER && renderRoutes(buyerRoutes)}

            {role===ERole.SELLER && renderRoutes(sellerRoutes)}
            
            {!role && renderRoutes(unAuthRoutes)}

            {renderRoutes(authRoutes)}

            <Route path='*' element={<Navigate to='/' />} />

          </Routes>
        </BrowserRouter>
      </ThemeComponent>
    </ThemeModeProvider>
  );
}

export default App;
