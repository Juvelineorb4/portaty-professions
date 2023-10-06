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
  const [checkRender, setCheckRender] = useState(true);
  const [userState, setUserState] = useState(false);
  const userAuth = useRecoilValue(userAuthenticated);
  // pido localizacion
  const { location } = useLocation();
  const renderNavigation = () => {
    try {
      if (userAuth !== null) setUserState(true);
      setCheckRender(false);
    } catch (error) {
      console.log(error);
      setCheckRender(false);
    }
  };

  useEffect(() => {
    renderNavigation();
  }, [userAuth]);

  return (
    <NavigationContainer linking={linking} fallback={<Loading />}>
      <NavSettings />
      {checkRender === false ? (
        <Stack.Navigator>
          {userState ? (
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
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={<Loading />}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;