import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

const Home = () => {
  const router = useRouter()
  const { email, password } = useLocalSearchParams()
  console.log(email, password)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFFFF' }}>
      <Text onPress={() => {
        router.replace("/(auth)/login")
      }}>
        Logout
      </Text>
    </View>
  );
};

export default Home;
