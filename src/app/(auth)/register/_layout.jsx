import LeftHeader from "@/components/Header/LeftHeader";
import { Stack, useRouter } from "expo-router";

const RegisterNavigation = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <LeftHeader handle={() => router.replace('/login')} />,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="confirm"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
};

export default RegisterNavigation;
