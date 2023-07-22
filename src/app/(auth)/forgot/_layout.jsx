import { Stack } from "expo-router";

const ForgotNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  );
};

export default ForgotNavigation