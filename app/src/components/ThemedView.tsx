import { useThemeColor } from '@/app/src/theme/useAppTheme';
import { View, type ViewProps } from 'react-native';


import React from 'react';


export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  // colorKey?: keyof typeof import('@/constants/Colors').Colors['light'];
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  // colorKey = 'background',
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor( lightColor,  darkColor );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
