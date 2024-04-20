import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepThree from "@/screens/Profile/Form/StepThree";


const FormNavigatorThree = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`StepThree`}>
        <Stack.Screen
          name="StepThree"
          component={StepThree}
          options={{
            animation: "slide_from_right",
            headerShown: false,
            presentation: 'transparentModal'
          }}
        />
    </Stack.Navigator>
  );
};

export default FormNavigatorThree;