import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginNavigator from "./Authentication/LoginNavigator";
import Tabs from "./Tabs/Tabs";
// Navigation Settings
import NavSettings from "./NavSettings";
// recoil
import { useRecoilValue } from "recoil";
import { userAuthenticated } from "@/atoms";
const Navigation = () => {
  const userAuth = useRecoilValue(userAuthenticated);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
