import ProfileHeader from "@/components/Header/ProfileHeader";
import { Stack } from "expo-router";

const ProfileNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
          header: () => <ProfileHeader />,
        }} />
    </Stack>
  );
};

export default ProfileNavigation