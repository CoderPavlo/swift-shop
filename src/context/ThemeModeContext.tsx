import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeModeContextProps {
    themeMode: 'dark' | 'light' | 'system';
    setThemeMode: (mode: 'dark' | 'light' | 'system') => void;
}

const ThemeModeContext = createContext<ThemeModeContextProps | undefined>(undefined);

interface ThemeModeProviderProps {
    children: ReactNode;
}

function getDefaultValue(): 'dark' | 'light' | 'system' {
    const value = window.localStorage.getItem('themeMode');
    if (value === 'dark' || value === 'light')
        return value;
    else 
        return 'system';
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {

    const [themeMode, setMode] = useState<'dark' | 'light' | 'system'>(getDefaultValue());     
    const setThemeMode = (mode: 'dark' | 'light' | 'system') => {
        window.localStorage.setItem('themeMode', mode);
        setMode(mode);
    }
    return (
        <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error();
    }
    return context;
}
