import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const lightColors = {
  primary: '#3B82F6',
  background: '#FFFFFF',
  card: '#F9FAFB',
  text: '#1F2937',
};

const darkColors = {
  primary: '#211832',
  secondary: '#181C14',
  accent: '#1B1A55',
  primaryRed: '#9B3922',
  accentRed: '#C62300',
  background: '#000000',
  text: 'rgba(255, 255, 255, 0.8)',
};

const ThemeContext = createContext({
  isDarkMode: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
