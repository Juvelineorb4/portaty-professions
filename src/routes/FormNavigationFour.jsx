import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepFour from "@/screens/Profile/Form/StepFour";


const FormNavigatorFour = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`StepFour`}>
        <Stack.Screen
          name="StepFour"
          component={StepFour}
          options={{
            animation: "slide_from_right",
            headerShown: false,
            presentation: 'transparentModal'
          }}
        />
    </Stack.Navigator>
  );
};

export default FormNavigatorFour;