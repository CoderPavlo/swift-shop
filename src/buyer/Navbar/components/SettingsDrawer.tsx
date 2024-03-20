import React from "react";
import {
  Container,
  Drawer,
  Paper,
  Divider,
  ToggleButton,
  Typography,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { modes, languages } from '../data/settings';

import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../../../context/ThemeModeContext";
import { useTranslation } from 'react-i18next';
import StyledToggleButtonGroup from "./StyledToggleButtonGroup";



interface IStyledTypographyProps {
  children: React.ReactNode,
}

const StyledTypography = ({ children }: IStyledTypographyProps) => {
  return (
    <Typography variant="subtitle1" color="text" sx={{ marginTop: "15px" }}>
      {children}
    </Typography>
  );
};

interface ISettingsDrawerProps {
  open: boolean,
  handleSettingsOpen: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
}

const SettingsDrawer = ({ open, handleSettingsOpen }: ISettingsDrawerProps) => {
  const theme = useTheme();
  const { themeMode, setThemeMode } = useThemeMode();

  const { t, i18n } = useTranslation();
  return (
    <Drawer anchor="right" open={open} onClose={handleSettingsOpen(false)}>
      <Paper
        sx={{
          background: theme.palette.background.default,
          height: "100%",
          width: 360,
          padding: 1,
        }}
        square
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "2px",
          }}
        >
          <Typography gutterBottom variant="h6" component="div" color="primary">
            {t('settings.title')}
          </Typography>
          <IconButton
            size="small"
            edge="end"
            aria-label="close"
            aria-haspopup="true"
            onClick={handleSettingsOpen(false)}
            color="primary"
          >
            <CloseIcon />
          </IconButton>
        </Container>
        <Divider />
        <Container sx={{ padding: "10px" }} disableGutters>
          <StyledTypography>{t("settings.language")}</StyledTypography>
          <StyledToggleButtonGroup value={i18n.language} onChange={(e, value) => {if(value) i18n.changeLanguage(value)}}>
            {languages.map((item, index) =>
              <ToggleButton key={index} value={item.value} sx={{ width: '50%' }}>
                {item.icon}
                {item.title}
              </ToggleButton>
            )}
          </StyledToggleButtonGroup>

          <StyledTypography>{t('settings.theme')}</StyledTypography>
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
        </Container>
      </Paper>
    </Drawer >
  );
};

export default SettingsDrawer;