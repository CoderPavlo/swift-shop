import React from 'react';
import { IRoute } from "../../App";
import { ERole } from "../../models/IUser";
import AuthPage from "./components/AuthPage";
import LoginPage from "./LoginPage";
import RegisterPage, { RegisterCard } from "./RegisterPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const routes: IRoute[] = [
    {
        path: '/',
        element: <AuthPage />,
        childrenRoutes: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register/',
                element: <RegisterPage />,
                childrenRoutes: [
                    {
                        path: '/register/',
                        element: <RegisterCard role={ERole.BUYER} />
                    },
                    {
                        path: 'shop',
                        element: <RegisterCard role={ERole.SELLER} />,
                    }
                ]
            },
            {
                path: '*',
                element: <Navigate to='/login' />,
            }
        ]
    },
]