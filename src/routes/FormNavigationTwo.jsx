import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepTwo from "@/screens/Profile/Form/StepTwo";


const FormNavigatorTwo = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`StepTwo`}>
        <Stack.Screen
          name="StepTwo"
          component={StepTwo}
          options={{
            animation: "slide_from_right",
            headerShown: false,
            presentation: 'transparentModal'
          }}
        />
    </Stack.Navigator>
  );
};

export default FormNavigatorTwo;
