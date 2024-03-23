import { IRoute } from "../../App";
import AuthPage from "./components/AuthPage";
import LoginPage from "./LoginPage";
import RegisterPage, { RegisterCard, ERole } from "./RegisterPage";

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
        ]
    },
]