import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import GridSearch from "@/components/Search/GridSearch";
import * as customSearch from "@/graphql/CustomQueries/Search";
import * as Location from "expo-location";
import { Auth, API, Storage } from "aws-amplify";

const Search = ({route}) => {
  const SearchDistance = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    const result = await API.graphql({
      query: customSearch.searchBusinessByDistance,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        location: {
          lat: location.coords.latitude,
          lon: location.coords.longitude
        },
        km: 10,
        text: 'pizza'
      },
    });
    // const result = await API.graphql({
    //   query: customSearch.searchBusinesses,
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    //   variables: { filter: { tags: { match: "restaurante" } } },
    // });
    console.log(result);
  };
  useEffect(() => {
    SearchDistance();
  }, [route]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <GridSearch />
    </ScrollView>
  );
};

export default Search;
