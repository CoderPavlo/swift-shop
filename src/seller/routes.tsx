import { IRoute } from "../App";
import DashboardPage from "./DashboardPage/DashboardPage";
import GoodsPage from "./GoodsPage/GoodsPage";
import HomePage from "./HomePage/HomePage";
import Navbar from "./Navbar/Navbar";
import OrdersPage from "./OrdersPage/OrdersPage";

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
                element: <OrdersPage />,
            },
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/profile',
                element: <div />,
            },
        ]
    }
]