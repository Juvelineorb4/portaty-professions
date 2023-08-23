import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Auth, API } from "aws-amplify";
import { searchBusinessByDistance, searchByDistance } from "@/graphql/queries";
import Grid from "@/components/Home/Grid";
import List from "@/components/Home/List";
const Home = () => {
  const global = require("@/utils/styles/global.js");
  const [mode, setMode] = useState(false)
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
          flexDirection: "row",
          justifyContent: 'flex-end',
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          style={[{ borderColor: "#1f1f1f", borderWidth: 0.5, paddingHorizontal: 15, paddingVertical: 8, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }, mode ? global.mainBgColor : global.bgWhite]}
          onPress={() => setMode(!mode)}
        >
          <Text style={[{fontSize: 14, fontFamily: 'light'}, mode ? global.white : global.mainColor]}>Grid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{ borderColor: "#1f1f1f", borderWidth: 0.5, padding: 10, borderTopRightRadius: 8, borderBottomRightRadius: 8, paddingHorizontal: 15, paddingVertical: 8, }, !mode ? global.mainBgColor : global.bgWhite]}
          onPress={() => setMode(!mode)}
        >
          <Text style={[{fontSize: 14, fontFamily: 'light'}, !mode ? global.white : global.mainColor]}>List</Text>
        </TouchableOpacity>
      </View>
        <View style={{padding: 10, paddingBottom: 80}}>
          {mode ? <Grid /> : <List /> }
        </View>
      {/* <Text
        onPress={() => {
          Auth.signOut();
        }}
      >
        Logout
      </Text> */}
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
