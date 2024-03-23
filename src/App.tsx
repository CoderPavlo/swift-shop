import React from 'react';

import ThemeComponent from './general/components/ThemeComponent';
import { ThemeModeProvider } from './context/ThemeModeContext';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes as buyerRoutes } from './buyer/routes';
import { routes as sellerRoutes } from './seller/routes';
import { routes as authRoutes } from './general/authentication/routes';

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

  return (
    <ThemeModeProvider>
      <ThemeComponent>
        <BrowserRouter>
          <Routes>

            {false && renderRoutes(buyerRoutes)}

            {renderRoutes(sellerRoutes)}

            {renderRoutes(authRoutes)}

            <Route path='*' element={<Navigate to='/' />} />

          </Routes>
        </BrowserRouter>
      </ThemeComponent>
    </ThemeModeProvider>
  );
}

export default App;
