import { Stack } from "expo-router";

const SearchNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>
  );
};

export default SearchNavigation