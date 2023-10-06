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

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const global = require("@/utils/styles/global.js");
  const [checkRender, setCheckRender] = useState(false);
  const [userState, setUserState] = useState(false);
  const userAuth = useRecoilValue(userAuthenticated);
  // pido localizacion
  const { location } = useLocation();
  const renderNavigation = () => {
    setCheckRender(true);
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
    <NavigationContainer
      linking={linking}
      fallback={
        <View style={[{ flex: 1 }, global.mainBgColor]}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            source={require("@/utils/images/splash.png")}
          />
        </View>
      }
    >
      <NavSettings />
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
    </NavigationContainer>
  );
};

export default Navigation;
