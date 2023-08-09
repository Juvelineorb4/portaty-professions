import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeHeader from "@/components/Header/HomeHeader";
import Home from "@/screens/Home/Home";

const HomeNavigator = ({ route, navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator id="Home_Stack" initialRouteName={`Home`}>
      <Stack.Screen
        name="Home"
        options={{ header: (props) => <HomeHeader {...props} /> }}
      >
        {(props) => <Home {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
