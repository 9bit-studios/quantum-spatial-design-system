/**
 * THEME PROVIDER
 * Design System Theme Context
 */

import React, { createContext, useContext, useState } from 'react';

export interface Theme {
  name: string;
  colors: Record<string, string>;
  [key: string]: any;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme: Theme }> = ({
  children,
  defaultTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export default ThemeProvider;
