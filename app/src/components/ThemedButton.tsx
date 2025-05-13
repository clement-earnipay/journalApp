// components/ThemedButton.tsx
import type { ReactNode } from "react";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { AppTextStyles } from "../theme/TextStyles";
import { ThemedText } from "./ThemedText";

type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const baseBg = isDark ? "#333" : "#eee";
  const pressedBg = isDark ? "#444" : "#ddd";
  const disabledBg = isDark ? "#555" : "#ccc";

  const baseTextColor = isDark ? "#fff" : "#000";
  const disabledTextColor = isDark ? "#aaa" : "#666";

  return (
    <Pressable
      onPress={loading ? undefined : onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: disabled ? disabledBg : pressed ? pressedBg : baseBg,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          opacity: loading ? 0.7 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={baseTextColor} style={{ marginRight: 8 }} />
      ) : (
        icon && <View style={{ marginRight: 8 }}>{icon}</View>
      )}
      <ThemedText
        baseStyle={AppTextStyles.font16Weight500}
        style={[
          { color: disabled ? disabledTextColor : baseTextColor },
          textStyle,
        ]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
};
