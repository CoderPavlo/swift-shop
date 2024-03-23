import { IRoute } from "../App";
import GoodsPage from "./GoodsPage/GoodsPage";
import HomePage from "./HomePage/HomePage";
import Navbar from "./Navbar/Navbar";

export const routes: IRoute[] = [
    {
        path: '/',
        element: <Navbar />,
        childrenRoutes: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: 'goods',
                element: <GoodsPage />,
            },
            {
                path: '/orders',
                element: <div />,
            },
            {
                path: '/dashboard',
                element: <div />,
            },
            {
                path: '/profile',
                element: <div />,
            },
        ]
    }
]