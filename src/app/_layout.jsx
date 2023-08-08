import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Amplify, Hub } from "aws-amplify";
import awsExports from "@/aws-exports";
import { Platform, SafeAreaView as SafeAreaIOS } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaAndroid,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import { useUserManagement } from "@/hooks";

Amplify.configure(awsExports);
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

  if (Platform.OS === "ios")
    return (
      <SafeAreaIOS style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RecoilRoot>
              <ConfigureNavigation />
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
            <ConfigureNavigation />
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

const ConfigureNavigation = () => {
  const { checkUser, userSignIn, userSignOut } = useUserManagement();
  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("HUB: ", event);
      switch (event) {
        case "configured":
          break;
        case "signIn":
          userSignIn(data);
          break;
        case "signOut":
          userSignOut();
          break;
        case "confirmSignUp":
          break;
        case "autoSignIn":
          break;
        case "updateUserAttributes":
          console.log("UPDATE USER ATTRIBUTES: ", data);
          break;
      }
    });
    checkUser();
    return unsubscribe;
  }, []);
};

export default Navigation;
