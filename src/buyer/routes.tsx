import React, { Suspense } from "react";
import NavbarSkeleton from "../general/Navbar/NavbarSkeleton";
import Navbar from "./Navbar/Navbar";
import CartPage from "./CartPage/CartPage";
import CategoriesPage from "./CategoriesPage/CategoriesPage";
import DashboardPage from "./DashboardPage/DashboardPage";
import GoodPage from "./GoodPage/GoodPage";
import HomePage from "./HomePage/HomePage";
import HomeSkeleton from "./HomePage/HomeSkeleton";
import ProfilePage from "./ProfilePage/ProfilePage";
import { IRoute } from "../App";

export const routes: IRoute[] = [
    {
        path: '/',
        element: <Suspense fallback={<NavbarSkeleton />}><Navbar /></Suspense>,
        childrenRoutes: [
            {
                path: '/',
                element: <Suspense fallback={<HomeSkeleton />}><HomePage /></Suspense>,
            },
            {
                path: 'categories',
                element: <CategoriesPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: 'goods/:id',
                element: <GoodPage />,
            },

        ]
    },
]