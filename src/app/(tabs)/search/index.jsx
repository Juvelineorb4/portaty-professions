import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Search = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFFFF' }}>
      <Text>search je</Text>
      <Link href={`/search/1`}>
        Search 1
      </Link>
      <Link href={`/search/2`}>
        Search 2
      </Link>
      <Link href={`/search/3`}>
        Search 3
      </Link>
    </View>
  );
};

export default Search;
