import { Stack } from "expo-router";

const SearchNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="forgot" options={{headerShown: false}}/>
      <Stack.Screen name="register" options={{headerShown: false}}/>
    </Stack>
  );
};

export default SearchNavigation