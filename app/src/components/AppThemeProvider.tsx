
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AppColors } from '../theme/useAppTheme';
import { ThemedView } from './components';

type Props = {
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <ThemedView
        lightColor={AppColors.light.background}
        darkColor={AppColors.dark.background}
        style={{ flex: 1 }}
      >
        {children}
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </ThemedView>
    </ThemeProvider>
  );
};
