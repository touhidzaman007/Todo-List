import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  lightMode: () => {},
  darkMode: () => {},
});

export const ThemeContextProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
