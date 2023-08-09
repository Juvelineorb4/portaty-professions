import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "@/screens/Search/Search";
import SearchHeader from "@/components/Header/SearchHeader";

const SearchNavigator = () => {
const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={`Search`}
    >
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ header: (props) => <SearchHeader {...props} /> }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
