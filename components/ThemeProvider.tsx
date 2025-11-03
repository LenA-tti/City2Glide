/*
 * THEME PROVIDER - Pure React Native
 * No web dependencies, only React Native APIs
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define theme types
export type Theme = 'light' | 'dark';

interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Accent colors
  accent1: string;
  accent2: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Background colors
  background: string;
  surface: string;
  card: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  
  // Border and divider
  border: string;
  divider: string;
  
  // Icon colors
  icon: string;
  iconSecondary: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeColors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('smartride-theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('smartride-theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  // Custom color palette - NO React Native Paper dependencies
  const themeColors: ThemeColors = theme === 'dark'
    ? {
        // Primary colors
        primary: '#9B3922',
        primaryLight: '#B54D36',
        primaryDark: '#7D2A18',
        
        // Accent colors
        accent1: '#FF6B35',
        accent2: '#FF8E53',
        
        // Text colors
        text: '#FFFFFF',
        textSecondary: '#E5E7EB',
        textMuted: '#9CA3AF',
        
        // Background colors
        background: '#0F0F0F',
        surface: '#1A1A1A',
        card: '#2A2A2A',
        
        // Status colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        
        // Border and divider
        border: '#374151',
        divider: '#374151',
        
        // Icon colors
        icon: '#FFFFFF',
        iconSecondary: '#9CA3AF',
      }
    : {
        // Primary colors
        primary: '#211832',
        primaryLight: '#3D2B5A',
        primaryDark: '#150E23',
        
        // Accent colors
        accent1: '#6D28D9',
        accent2: '#8B5CF6',
        
        // Text colors
        text: '#1F2937',
        textSecondary: '#374151',
        textMuted: '#6B7280',
        
        // Background colors
        background: '#FFFFFF',
        surface: '#F8FAFC',
        card: '#FFFFFF',
        
        // Status colors
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        
        // Border and divider
        border: '#E5E7EB',
        divider: '#F3F4F6',
        
        // Icon colors
        icon: '#374151',
        iconSecondary: '#6B7280',
      };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    themeColors,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}