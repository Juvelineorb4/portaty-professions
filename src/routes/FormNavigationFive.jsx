import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepFive from "@/screens/Profile/Form/StepFive";

const FormNavigatorFive = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`StepFive`}>
        <Stack.Screen
          name="StepFive"
          component={StepFive}
          options={{
            animation: "slide_from_right",
            headerShown: false,
            presentation: 'transparentModal'
          }}
        />
    </Stack.Navigator>
  );
};

export default FormNavigatorFive;