import { View, Text, ScrollView } from "react-native";
import React from "react";
import GridSearch from "@/components/Search/GridSearch";

const Search = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <GridSearch />
    </ScrollView>
  );
};

export default Search;