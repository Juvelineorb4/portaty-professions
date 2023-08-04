import {
  Slot,
  Stack,
  useRouter,
  useRootNavigationState,
  useRootNavigation,
} from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Amplify, Hub, Logger, Auth } from "aws-amplify";
import awsExports from "@/aws-exports";

import { Platform, SafeAreaView as SafeAreaIOS } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaAndroid,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";

Amplify.configure(awsExports);
SplashScreen.preventAutoHideAsync();
const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
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
        case "configured":
          break;
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
    // onHandleLogin();
    return unsubscribe;
  }, []);
  useEffect(() => {
    // console.log("NAVIGATION: ", rootNavigationState);
    if (isLogin === false && rootNavigationState?.key) onHandleLogin();
  }, [rootNavigationState]);

  const onHandleLogin = () => {
    Auth.currentAuthenticatedUser().then((data) => {
      setIsLogin(true);
      router.replace("/(tabs)/home");
    });
  };

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
            <RecoilRoot>
              <Slot>
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
              </Slot>
            </RecoilRoot>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaIOS>
    );

  return (
    <SafeAreaAndroid style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RecoilRoot>
            <StatusBar style="dark" backgroundColor="#fff" />
            <Slot>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </Slot>
          </RecoilRoot>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </SafeAreaAndroid>
  );
};

export default Navigation;
