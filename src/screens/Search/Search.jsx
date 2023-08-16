import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import GridSearch from "@/components/Search/GridSearch";
import * as customSearch from "@/graphql/CustomQueries/Search";
import * as Location from "expo-location";
import { Auth, API, Storage } from "aws-amplify";

const Search = ({ route }) => {
  const [moreItems, setMoreItems] = useState(1);
  const [items, setItems] = useState(null);

  const searchDistance = async () => {
    fetch("https://36mpr9wfhd.execute-api.us-east-1.amazonaws.com/dev/searchBusinessByDistance")
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const data = [
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
    {
      test: "prueba",
    },
  ];
  const getData = () => {
    let temporary = data.slice(0, moreItems);
    console.log(temporary);
    setItems(temporary);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      console.log(location.coords)
    })();
    // searchDistance()
    getData();
    console.log(moreItems);
  }, [route, moreItems]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingBottom: 50 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <GridSearch />}
        keyExtractor={(item, index) => index}
        ListFooterComponent={() => (
          <View
            style={{
              height: 100,
              background: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 20,
            }}
          >
            <ActivityIndicator size="large" color="#1f1f1f" />
          </View>
        )}
        onEndReached={() => setMoreItems(moreItems + 1)}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

export default Search;
