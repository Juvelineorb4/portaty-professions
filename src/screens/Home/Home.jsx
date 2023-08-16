import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Auth, API } from "aws-amplify";
import { searchBusinessByDistance, searchByDistance } from "@/graphql/queries";
const Home = () => {
  useEffect(() => {
    fecthAlgo();
  }, []);

  const fecthAlgo = async () => {
    const api = "api-professions-gateway";
    const path = "/searchBusinessByDistance";
    const params = {
      headers: {}, // OPTIONAL
      queryStringParameters: {
        location: JSON.stringify({
          lat: 10.175697,
          lon: -69.3123711,
        }),
        km: 10,
        text: "restaurante",
      },
    };
    try {
      const response = await API.get(api, path, params);
      console.log(response);
      return response;
    } catch (error) {
      return {
        error: error,
      };
    }
  };

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
  ];
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
