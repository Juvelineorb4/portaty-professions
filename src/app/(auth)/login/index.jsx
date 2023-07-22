import { View, Text } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

const Login = () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => {
        router.replace("/(tabs)/home")
      }}>
        Login
      </Text>
    </View>
  );
};

export default Login;
