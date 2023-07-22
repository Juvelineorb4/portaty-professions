import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Mi perfil",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
