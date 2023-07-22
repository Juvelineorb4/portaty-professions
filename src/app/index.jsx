import { View, Text } from "react-native";
import React from "react";
import { Redirect, Slot, useRouter } from "expo-router";

const App = () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => {
        router.replace("/(tabs)/home")
      }}>
        Login Otro
      </Text>
    </View>
  );
};

export default App;
