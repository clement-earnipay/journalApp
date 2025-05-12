// utils/textStyleWithColor.ts
import { TextStyle } from 'react-native';
import { useThemeColor } from './useThemeColor';


export function useTextStyleWithColor(
  baseStyle: TextStyle,
  darkColor?: string,
  lightColor?: string
): TextStyle {
  const color = useThemeColor(darkColor, lightColor);
  return { ...baseStyle, color };
}
