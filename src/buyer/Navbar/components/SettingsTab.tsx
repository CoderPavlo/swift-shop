import React from 'react'
import {
    ToggleButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material";

import { modes, languages } from '../data/settings';

import { useThemeMode } from "../../../context/ThemeModeContext";
import { useTranslation } from 'react-i18next';
import StyledToggleButtonGroup from './StyledToggleButtonGroup';
import { ExpandLess, ExpandMore, Language, Contrast } from '@mui/icons-material';

export default function SettingsTab() {
    const { themeMode, setThemeMode } = useThemeMode();

    const { t, i18n } = useTranslation();
    const [collapse, setCollapse] = React.useState<{ lang: boolean, mode: boolean }>({ lang: false, mode: false });

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, } }}>
            <ListItemButton onClick={() => setCollapse((value) => ({ ...value, lang: !value.lang }))}>
                <ListItemIcon>
                    <Language />
                </ListItemIcon>
                <ListItemText primary="Мова" />
                {collapse.lang ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapse.lang} timeout="auto" unmountOnExit>
                <ListItem>
                    <StyledToggleButtonGroup value={i18n.language} onChange={(e, value) => { if (value) i18n.changeLanguage(value) }}>
                        {languages.map((item, index) =>
                            <ToggleButton key={index} value={item.value} sx={{ width: '50%' }}>
                                {item.icon}
                                {item.title}
                            </ToggleButton>
                        )}
                    </StyledToggleButtonGroup>
                </ListItem>
            </Collapse>
            <ListItemButton onClick={() => setCollapse((value) => ({ ...value, mode: !value.mode }))}>
                <ListItemIcon>
                    <Contrast />
                </ListItemIcon>
                <ListItemText primary="Тема" />
                {collapse.mode ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapse.mode} timeout="auto" unmountOnExit>
                <ListItem>
                    <StyledToggleButtonGroup
                        value={themeMode}
                        onChange={(e, value) => { if (value) setThemeMode(value) }}
                    >
                        {modes.map((item, index) =>
                            <ToggleButton key={index} value={item.value} sx={{ width: '35%' }}>
                                {item.icon}
                                {t(item.title)}
                            </ToggleButton>
                        )}
                    </StyledToggleButtonGroup>
                </ListItem>
            </Collapse>
        </List>
    )
}
