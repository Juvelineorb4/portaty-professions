import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "@/utils/styles/Mode.module.css";
import ItemShareList from "@/components/ItemShareList";
import * as customSearch from "@/graphql/CustomQueries/Search";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";

const ShareListPage = ({ route }) => {
  const { params } = route;
  const global = require("@/utils/styles/global.js");
  const [data, setData] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [nothing, setNothing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    setLoading(true);
    const { attributes } = await Auth.currentAuthenticatedUser();
    const result = await API.graphql({
      query: queries.getUsers,
      authMode: "AWS_IAM",
      variables: {
        id: "82c735b0-9bba-4049-9c2c-ced64b42c35c",
      },
    });
    
    setFavoritesList(result.data.getUsers.favorites.items);
    console.log(result.data.getUsers.favorites.items);
    if (result.data.getUsers.favorites.items.length === 0) setNothing(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (favoritesList.length === 0)
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <ActivityIndicator size="large" color="#fb8500" />
      </View>
    );

  if (favoritesList.length !== 0)
    return (
      <ScrollView style={[{ flex: 1, padding: 20 }, global.bgWhite]}>
        <Text
          style={{ fontSize: 16, fontFamily: "light", paddingVertical: 20 }}
        >
          Compartieron esta lista de negocios contigo
        </Text>
        <View style={{}}>
          {favoritesList.map((post, index) => (
            <ItemShareList
              key={index}
              data={post}
              styled={{ column: styles.columnList }}
            />
          ))}
        </View>
      </ScrollView>
    );
};

export default ShareListPage;
