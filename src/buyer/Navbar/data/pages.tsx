import React from 'react';
import { ISetting } from "../../../general/settings/settings";
import {HomeOutlined, AppsOutlined, ShoppingCartOutlined, InsertChartOutlined, ManageAccountsOutlined} from '@mui/icons-material';

export const pages: ISetting[] = [
    {
        title: 'pages.home',
        value: '',
        icon: <HomeOutlined/>
    },
    {
        title: 'pages.cattegories',
        value: 'categories',
        icon: <AppsOutlined/>
    },
    {
        title: 'pages.cart',
        value: 'cart',
        icon: <ShoppingCartOutlined/>
    },
    {
        title: 'pages.dashboard',
        value: 'dashboard',
        icon: <InsertChartOutlined/>
    },
    {
        title: 'pages.profile',
        value: 'profile',
        icon: <ManageAccountsOutlined/>
    },
]