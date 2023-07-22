import { Stack } from "expo-router";

const RegisterNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  );
};

export default RegisterNavigation