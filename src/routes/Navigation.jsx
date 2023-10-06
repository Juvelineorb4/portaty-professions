import "react-native-gesture-handler";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginNavigator from "./Authentication/LoginNavigator";
import Tabs from "./Tabs/Tabs";
// Navigation Settings
import NavSettings from "./NavSettings";
// recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { userAuthenticated, mapUser, checkRenderState } from "@/atoms";
// linking
import SharePage from "@/screens/Search/SharePage";
import linking from "./linking";
import LeftHeaderShare from "@/components/Header/LeftHeaderShare";
// hooks
import useLocation from "@/hooks/useLocation";
import ShareNavigator from "./ShareNavigator";
import SplashScreen from "@/components/SplashScreen";
import { Text, View, Image } from "react-native";
import Loading from "@/components/Loading";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const global = require("@/utils/styles/global.js");

  const [userState, setUserState] = useState(false);
  const userAuth = useRecoilValue(userAuthenticated);
  const checkRender = useRecoilValue(checkRenderState);
  // pido localizacion
  const { location } = useLocation();

  return (
    <NavigationContainer  fallback={<SplashScreen />}>
      <NavSettings />
      <Stack.Navigator>
        {userAuth && checkRender ? (
          <Stack.Screen
            name={`Tabs_Navigation`}
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name={`Login_Welcome`}
            component={LoginNavigator}
            options={{
              headerShown: false,
            }}
          />
        )}

        <Stack.Screen
          name="SharePage"
          component={SharePage}
          options={{
            animation: "slide_from_right",
            header: (props) => <LeftHeaderShare {...props} />,
          }}
        />
        <Stack.Screen
          name="ShareNavigator"
          component={ShareNavigator}
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;