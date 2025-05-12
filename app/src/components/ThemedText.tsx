import { Text, TextProps, TextStyle, useColorScheme } from "react-native";

// components/ThemedText.tsx
type ThemedTextProps = TextProps & {
  baseStyle: TextStyle;
  lightColor?: string;
  darkColor?: string;
};

export const ThemedText: React.FC<ThemedTextProps> = ({
  baseStyle,
  lightColor,
  darkColor,
  style,
  ...props
}) => {
  const theme = useColorScheme(); // 'light' | 'dark'
  const textColor = theme === 'dark' ? darkColor : lightColor;



  const finalStyle: TextStyle = {
    ...baseStyle,
    color: textColor ?? baseStyle.color,
  };

  return <Text style={[finalStyle, style]} {...props} />;
};
