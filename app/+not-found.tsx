import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "./src/components/components";
import { AppColors } from "./src/theme/Colors";
import { AppTextStyles } from "./src/theme/useAppTheme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView
        lightColor={AppColors.light.background}
        darkColor={AppColors.dark.background}
        style={styles.container}
      >
        <ThemedText
          baseStyle={AppTextStyles.font14Weight600}
          darkColor={AppColors.white}
          lightColor={AppColors.black}
        >
          This screen does not exist.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText
            baseStyle={AppTextStyles.font14Weight600}
            darkColor={AppColors.white}
            lightColor={AppColors.black}
          >
            Go to home screen!
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
