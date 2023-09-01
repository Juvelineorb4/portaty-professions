import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Auth, API } from "aws-amplify";
import { searchBusinessByDistance, searchByDistance } from "@/graphql/queries";
import Grid from "@/components/Home/Grid";
import List from "@/components/Home/List";
import { mapUser } from "@/atoms";
import { useRecoilState } from "recoil";
import * as Location from "expo-location";
import * as queries from "@/graphql/CustomQueries/Favorites";
import CustomButton from "@/components/CustomButton";
import styles from "@/utils/styles/Home.module.css";

const Home = ({ navigation }) => {
  const global = require("@/utils/styles/global.js");
  const [mode, setMode] = useState(false);
  const [userLocation, setUserLocation] = useRecoilState(mapUser);
  const [favoritesList, setFavoritesList] = useState([]);
  const [nothing, setNothing] = useState(false);
  const fetchFavorites = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const result = await API.graphql({
      query: queries.userByEmail,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        email: attributes.email,
      },
    });
    setFavoritesList(result.data.userByEmail.items[0].favorites.items);
    if (result.data.userByEmail.items[0].favorites.items.length === 0)
      setNothing(true);
  };
  useLayoutEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        setUserLocation(location.coords);
        console.log(status);
      }
    })();
    fetchFavorites();
  }, []);

  if (favoritesList.length !== 0)
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            style={[
              {
                borderColor: "#1f1f1f",
                borderWidth: 0.5,
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              },
              mode ? global.mainBgColor : global.bgWhite,
            ]}
            onPress={() => setMode(!mode)}
          >
            <Text
              style={[
                { fontSize: 14, fontFamily: "light" },
                mode ? global.white : global.mainColor,
              ]}
            >
              Grid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                borderColor: "#1f1f1f",
                borderWidth: 0.5,
                padding: 10,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                paddingHorizontal: 15,
                paddingVertical: 8,
              },
              !mode ? global.mainBgColor : global.bgWhite,
            ]}
            onPress={() => setMode(!mode)}
          >
            <Text
              style={[
                { fontSize: 14, fontFamily: "light" },
                !mode ? global.white : global.mainColor,
              ]}
            >
              List
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10, paddingBottom: 80 }}>
          {favoritesList ? (
            mode ? (
              <Grid data={favoritesList} />
            ) : (
              <List data={favoritesList} />
            )
          ) : (
            <View
              style={[
                { flex: 1, alignItems: "center", justifyContent: "center" },
                global.bgWhite,
              ]}
            >
              <ActivityIndicator size="large" color="#5E2129" />
            </View>
          )}
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

  if (!nothing && favoritesList.length === 0)
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <ActivityIndicator size="large" color="#5E2129" />
      </View>
    );

  if (nothing)
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 80,
          },
          global.bgWhite,
        ]}
      >
        <Text style={{ fontSize: 16, fontFamily: "light" }}>
          No tienes ningun favorito aun
        </Text>
        <CustomButton
          text={`Buscar`}
          handlePress={() => navigation.navigate("Search_Tab")}
          textStyles={[styles.textSearch, global.white]}
          buttonStyles={[styles.search, global.mainBgColor]}
        />
      </View>
    );
};

export default Home;
