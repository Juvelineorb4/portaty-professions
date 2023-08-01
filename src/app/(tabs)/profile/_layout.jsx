import LeftHeader from "@/components/Header/LeftHeader";
import ProfileHeader from "@/components/Header/ProfileHeader";
import { Stack, useRouter } from "expo-router";

const ProfileNavigation = () => {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen name="index" options={{
          header: () => <ProfileHeader />,
        }} />
        <Stack.Screen name="form" options={{
          header: () => <LeftHeader handle={() => router.replace('/profile')} />,
          animation: 'slide_from_right'
        }} />
    </Stack>
  );
};

export default ProfileNavigation