import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LeftHeader from "@/components/Header/LeftHeader";
import Page from "@/screens/Profile/Page";
import Analytics from "@/screens/Profile/Analytics";
import Shedule from "@/screens/Profile/Shedule";
import CustomPromotions from "@/components/CustomPromotions";
import CustomInteractions from "@/components/CustomInteractions";

const PageNavigator = ({route}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`Page`}>
      <Stack.Screen
        name="Page"
        component={Page}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Shedule"
        component={Shedule}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Promotions"
        component={CustomPromotions}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="InteractionsPage"
        component={CustomInteractions}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default PageNavigator;
