import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaAndroid,
} from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { useFonts } from "expo-font";
import { Platform, SafeAreaView as SafeAreaIOS, View, Text, StyleSheet } from "react-native";
import Navigation from "@/routes/Navigation";
import { Amplify, AWSKinesisFirehoseProvider, Analytics } from "aws-amplify";
import awsconfig from "./src/aws-exports.js";
import { StatusBar } from "expo-status-bar";
import * as Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { api } from "@/utils/constants/api.jsx";
import * as WebBrowser from 'expo-web-browser';
const ENDPOINT =
  Constants?.AppOwnership?.Expo === ""
    ? api?.stage_endpoint?.dev
    : api?.stage_endpoint?.prod;

const REDIRECT_SIGNIN =
  Constants?.AppOwnership?.Expo === ""
    ? api?.rediret_signin?.dev
    : api?.rediret_signin?.prod;
const REDIRECT_SIGNOUT =
  Constants?.AppOwnership?.Expo === ""
    ? api?.rediret_signout?.dev
    : api?.rediret_signout?.prod;
console.log("ENDPOINT: ", ENDPOINT);

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}
Amplify.configure({
  ...awsconfig,
  API: {
    endpoints: [
      {
        name: "api-professions-gateway",
        endpoint: ENDPOINT,
      },
      {
        name: "api-opense",
        endpoint: ENDPOINT,
      },
      {
        name: "api-portaty",
        endpoint: ENDPOINT,
      },
    ],
  },
  Analytics: {
    AWSKinesisFirehose: {
      region: awsconfig.aws_project_region,
    },
  },
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: REDIRECT_SIGNIN,
    redirectSignOut: REDIRECT_SIGNOUT,
    urlOpener
  }
});

Analytics.addPluggable(new AWSKinesisFirehoseProvider());
// SplashScreen.preventAutoHideAsync();
export default function App() {
  const global = require("@/utils/styles/global.js");
  const [fontsLoaded] = useFonts({
    thin: require("@/utils/fonts/Montserrat-Thin.ttf"),
    regular: require("@/utils/fonts/Montserrat-Regular.ttf"),
    light: require("@/utils/fonts/Montserrat-Light.ttf"),
    bold: require("@/utils/fonts/Montserrat-Bold.ttf"),
    extralight: require("@/utils/fonts/Montserrat-ExtraLight.ttf"),
    medium: require("@/utils/fonts/Montserrat-Medium.ttf"),
    black: require("@/utils/fonts/Montserrat-Black.ttf"),
    semibold: require("@/utils/fonts/Montserrat-SemiBold.ttf"),
    thinItalic: require("@/utils/fonts/Montserrat-ThinItalic.ttf"),
    mediumItalic: require("@/utils/fonts/Montserrat-MediumItalic.ttf"),
    lightItalic: require("@/utils/fonts/Montserrat-LightItalic.ttf"),
    boldItalic: require("@/utils/fonts/Montserrat-BoldItalic.ttf"),
    name: require("@/utils/fonts/ConeriaScript.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>No cargo</Text>
      </View>
    );
  }

  if (Platform.OS === "ios")
    return (
      <SafeAreaIOS style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RecoilRoot>
              <RootSiblingParent>
                <Navigation />
              </RootSiblingParent>
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
            <RootSiblingParent>
              <StatusBar style="dark" backgroundColor="#fff" />
              <Navigation />
            </RootSiblingParent>
          </RecoilRoot>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </SafeAreaAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});