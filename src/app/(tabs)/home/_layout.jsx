import HomeHeader from "@/components/Header/HomeHeader";
import { Stack, Slot } from "expo-router";

const HomeNavigation = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
};

export default HomeNavigation;
