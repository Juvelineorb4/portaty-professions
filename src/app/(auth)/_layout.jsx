import { Slot, Stack } from "expo-router";

const SearchNavigation = () => {
  return (
    <Slot>
      <Stack initialRouteName={`login`}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="forgot"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
      </Stack>
    </Slot>
  );
};

export default SearchNavigation;
