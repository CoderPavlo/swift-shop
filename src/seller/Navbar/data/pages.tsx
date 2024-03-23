
import {HomeOutlined, AppsOutlined, InboxOutlined, InsertChartOutlined, ManageAccountsOutlined} from '@mui/icons-material';
import { ISetting } from '../../../general/settings/settings';

export const pages: ISetting[] = [
    {
        title: 'pages.home',
        value: '',
        icon: <HomeOutlined/>
    },
    {
        title: 'pages.goods',
        value: 'goods',
        icon: <AppsOutlined/>
    },
    {
        title: 'pages.orders',
        value: 'orders',
        icon: <InboxOutlined/>
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