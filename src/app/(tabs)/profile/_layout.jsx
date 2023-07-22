import { Stack } from "expo-router";

const ProfileNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>
  );
};

export default ProfileNavigation