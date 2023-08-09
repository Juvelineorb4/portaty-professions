import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaAndroid,
} from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { useFonts } from "expo-font";
import { Platform, SafeAreaView as SafeAreaIOS } from "react-native";

import Navigation from "@/routes/Navigation";
// amplify
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports.js";

// stripe
import { StripeProvider } from '@stripe/stripe-react-native'


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

Amplify.configure({
  ...awsconfig,
  API: {
    endpoints: [
      {
        name: "api-gateway-dev",
        endpoint: "https://h5920e8h3l.execute-api.us-east-1.amazonaws.com/dev"
      },
    ]
  }
});

const STRIPE_KEY = 'pk_test_51Mr0b4ATCZIkEkhB3Rt0AOz9zZ0UaseZRy9CCEomDtT0pxfoX0o64fYlwHxRJszj5OoqHXfb3lX8NQvGcQmRQgws00vTrph7XJ'

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
    return null;
  }

  if (Platform.OS === "ios") return (
      <SafeAreaIOS style={{flex: 1}}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RecoilRoot>
              <StripeProvider publishableKey={STRIPE_KEY}>
                <Navigation />
              </StripeProvider>
            </RecoilRoot>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaIOS>
    );

    return (
      <SafeAreaAndroid style={{flex: 1}}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RecoilRoot>
              <StripeProvider publishableKey={STRIPE_KEY}>
                <StatusBar style="dark" backgroundColor="#fff" />
                <Navigation />
              </StripeProvider>
            </RecoilRoot>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaAndroid>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
