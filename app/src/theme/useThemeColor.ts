/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// hooks/useThemeColor.ts
import { useColorScheme } from 'react-native';


export function useThemeColor(
  dark?: string ,
  light?: string,
): string {
  const theme = useColorScheme(); // 'light' or 'dark'

  // Return the corresponding color based on the theme, or fallback to the default light or dark value.
  return theme === 'dark' ? dark ?? light ?? '#ffffff' : light ?? '#ffffff';
}
