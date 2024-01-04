import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LeftHeader from "@/components/Header/LeftHeader";
import StepOne from "@/screens/Profile/Form/StepOne";
import StepTwo from "@/screens/Profile/Form/StepTwo";
import StepThree from "@/screens/Profile/Form/StepThree";
import StepFour from "@/screens/Profile/Form/StepFour";
import Form from "@/screens/Profile/Form";

const FormNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`StepOne`}>
      <Stack.Screen
          name="StepOne"
          component={StepOne}
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepTwo"
          component={StepTwo}
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepThree"
          component={StepThree}
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepFour"
          component={StepFour}
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
    </Stack.Navigator>
  );
};

export default FormNavigator;
