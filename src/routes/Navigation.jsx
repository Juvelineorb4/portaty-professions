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
import { userAuthenticated, mapUser } from "@/atoms";
import * as Location from "expo-location";
// linking
import SharePage from "@/screens/Search/SharePage";
import ShareListPage from "@/screens/Search/ShareListPage";
import linking from "./linking";
import LeftHeaderShare from "@/components/Header/LeftHeaderShare";
// hooks
import useLocation from "@/hooks/useLocation";

const Navigation = () => {
  const userAuth = useRecoilValue(userAuthenticated);
  const Stack = createNativeStackNavigator();
  // pido localizacion
  useLocation();
  return (
    <NavigationContainer linking={linking}>
      <NavSettings />
      <Stack.Navigator initialRouteName="Login_Welcome">
        {!userAuth && (
          <Stack.Screen
            name={`Login_Welcome`}
            component={LoginNavigator}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Stack.Screen
          name={`Tabs_Navigation`}
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SharePage"
          component={SharePage}
          options={{
            animation: "slide_from_right",
            header: (props) => <LeftHeaderShare {...props} />,
          }}
        />
        <Stack.Screen
          name="ShareListPage"
          component={ShareListPage}
          options={{
            animation: "slide_from_right",
            header: (props) => <LeftHeaderShare {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
