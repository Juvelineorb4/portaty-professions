import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/screens/Auth/Login";
import RegisterNavigator from "./RegisterNavigator";
import ForgotNavigator from "./ForgotNavigator";
import LeftHeader from "@/components/Header/LeftHeader";


const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={`Login`}>
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{
          header: (props) => <LeftHeader {...props} />,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name={"Register_App"}
        component={RegisterNavigator}
        options={{
          animation: 'slide_from_right',
          headerShown: false
        }}
      />
      <Stack.Screen
        name={"Forgot_App"}
        component={ForgotNavigator}
        options={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
