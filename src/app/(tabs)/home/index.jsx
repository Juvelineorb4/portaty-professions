import React from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Auth } from "aws-amplify";

const Home = () => {
  const data = [
    { id: 1, text: "Elemento 1" },
    { id: 2, text: "Elemento 2" },
    { id: 3, text: "Elemento 3" },
    { id: 4, text: "Elemento 4" },
    { id: 5, text: "Elemento 5" },
    { id: 6, text: "Elemento 6" },
    { id: 7, text: "Elemento 7" },
    { id: 8, text: "Elemento 8" },
    { id: 9, text: "Elemento 9" },
    // Agrega más elementos si es necesario
  ];
  const router = useRouter();
  const { email, password } = useLocalSearchParams();
  console.log(email, password);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View style={styles.container}>
          {data.map((item) => (
            <View key={item.id} style={styles.column}>
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text
        onPress={() => {
          Auth.signOut();
        }}
      >
        Logout
      </Text>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    width: "30%", // Ajusta el tamaño de cada columna según tus necesidades
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
});
