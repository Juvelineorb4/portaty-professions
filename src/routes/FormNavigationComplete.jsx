import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepComplete from "@/screens/Profile/Form/StepComplete";

const FormNavigatorComplete = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`StepComplete`}>
        <Stack.Screen
          name="StepComplete"
          component={StepComplete}
          options={{
            animation: "slide_from_right",
            headerShown: false,
            presentation: 'transparentModal'
          }}
        />
    </Stack.Navigator>
  );
};

export default FormNavigatorComplete;