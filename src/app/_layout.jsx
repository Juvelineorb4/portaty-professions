import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Navigation = () => {
  const [fontsLoaded] = useFonts({
    thin: require("../assets/fonts/Montserrat-Thin.ttf"),
    regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    light: require("../assets/fonts/Montserrat-Light.ttf"),
    bold: require("../assets/fonts/Montserrat-Bold.ttf"),
    extralight: require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    black: require("../assets/fonts/Montserrat-Black.ttf"),
    semibold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    thinItalic: require("../assets/fonts/Montserrat-ThinItalic.ttf"),
    mediumItalic: require("../assets/fonts/Montserrat-MediumItalic.ttf"),
    lightItalic: require("../assets/fonts/Montserrat-LightItalic.ttf"),
    boldItalic: require("../assets/fonts/Montserrat-BoldItalic.ttf"),
    name: require("../assets/fonts/ConeriaScript.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Slot>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Slot>
  );
};

export default Navigation;
