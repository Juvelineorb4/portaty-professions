import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepOne from "@/screens/Profile/Form/StepOne";


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
            presentation: 'transparentModal'
          }}
        />
    </Stack.Navigator>
  );
};

export default FormNavigator;
