import React from "react";


import {DarkModeOutlined, LightModeOutlined, SettingsBrightnessOutlined} from "@mui/icons-material";

import Ukraine from "./flags/Ukraine";
import GreatBritain from "./flags/GreatBritain";

export interface ISetting{
    title: string,
    value: string,
    icon: React.ReactNode,
}

export const modes : ISetting[] =[
    {
        title: 'settings.dark',
        value: 'dark',
        icon: <DarkModeOutlined sx={{width: 25, height: 20}}/>,
    },
    {
        title: 'settings.system',
        value: 'system',
        icon: <SettingsBrightnessOutlined sx={{width: 25, height: 20}}/>,
    },
    {
        title: 'settings.light',
        value: 'light',
        icon: <LightModeOutlined sx={{width: 25, height: 20}}/>,
    },
];

export const languages : ISetting[] =[
    {
        title: 'UK',
        value: 'uk',
        icon: <Ukraine/>,
    },
    {
        title: 'en',
        value: 'EN',
        icon: <GreatBritain/>,
    },
];
