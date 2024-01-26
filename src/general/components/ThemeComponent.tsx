import React from 'react'
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkPalette = {
  primary: {
    main: '#24B47E',
  },
  secondary: {
    main: '#808080',
  },
  background: {
    default: '#181818',
    paper: '#212121',
  },
  error: {
    main: '#FF5733', // Червоний (Accent Color)
  },
  success: {
    main: '#28A745', // Зелений (Positive Action Color)
  },
  warning: {
    main: '#FFC107', // Помаранчевий (Warning Color)
  },
  text: {
    primary: '#FFFFFF', // Білий (Text Color)
    secondary: '#545454'
  },
  common: {
    white: '#FFFFFF', // Білий (Background Color)
  },
}

const lightPalette = {
  primary: {
    main: '#24B47E',
  },
  secondary: {
    main: '#A8A8A8',
  },
  background: {
    default: '#F8F8F8',
    paper: '#ECECEC',
  },
  error: {
    main: '#FF5733', // Червоний (Accent Color)
  },
  success: {
    main: '#28A745', // Зелений (Positive Action Color)
  },
  warning: {
    main: '#FFC107', // Помаранчевий (Warning Color)
  },
  text: {
    primary: '#2A2A2A',
    secondary: '#666666'
  },
  common: {
    white: '#FFFFFF', // Білий (Background Color)
  },
}

export interface ITheme {
  mode: 'light' | 'dark',
  children: React.ReactNode,
}

function ThemeComponent(props: ITheme): React.JSX.Element {

  const theme: Theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: props.mode,
          ...(props.mode === 'light' ? lightPalette : darkPalette),
        },
      }),
    [props.mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}

export default ThemeComponent