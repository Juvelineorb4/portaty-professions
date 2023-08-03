import { Slot, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Amplify, Hub } from "aws-amplify";
import awsExports from "@/aws-exports";
Amplify.configure(awsExports);
import { Platform, SafeAreaView as SafeAreaIOS } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaAndroid,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();
const Navigation = () => {
  const router = useRouter();
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

  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("HUB: ", event);
      switch (event) {
        case "signIn":
          router.replace("/(tabs)/home");
          break;
        case "signOut":
          break;
        case "confirmSignUp":
          break;
        case "autoSignIn":
          break;
        case "updateUserAttributes":
          break;
      }
    });

    return unsubscribe;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (Platform.OS === "ios")
    return (
      <SafeAreaIOS style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot>
              <RecoilRoot>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </RecoilRoot>
            </Slot>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaIOS>
    );

  return (
    <SafeAreaAndroid style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="dark" backgroundColor="#fff" />
          <Slot>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </Slot>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </SafeAreaAndroid>
  );
};

export default Navigation;
