import { Slot, Stack } from "expo-router";

const LoginNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  );
};

export default LoginNavigation