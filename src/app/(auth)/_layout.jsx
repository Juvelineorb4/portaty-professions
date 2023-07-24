import { Stack } from "expo-router";

const SearchNavigation = () => {
  return (
    <Stack initialRouteName={`login`}>
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="forgot" options={{headerShown: false}}/>
      <Stack.Screen name="register" options={{headerShown: false}}/>
    </Stack>
  );
};

export default SearchNavigation