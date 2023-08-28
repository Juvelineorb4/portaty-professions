import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeHeader from "@/components/Header/HomeHeader";
import Home from "@/screens/Home/Home";
import FavoritePage from "@/screens/Home/FavoritePage";
import LeftHeader from "@/components/Header/LeftHeader";

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
      <Stack.Screen
        name="FavoritePage"
        component={FavoritePage}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
