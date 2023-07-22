import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

const Home = () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => {
        router.replace("/(auth)/login")
      }}>
        Logout
      </Text>
    </View>
  );
};

export default Home;
