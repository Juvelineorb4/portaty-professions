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
import { favoritesState, inputFavoritesSearch, mapUser, userAuthenticated, updateListFavorites } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Location from "expo-location";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as subscriptions from "@/graphql/CustomSubscriptions/Favorites";
import CustomButton from "@/components/CustomButton";
import styles from "@/utils/styles/Home.module.css";
import { Ionicons } from "@expo/vector-icons";
import ModalAlert from "@/components/ModalAlert";

const Home = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const [mode, setMode] = useState(false);
  const [userLocation, setUserLocation] = useRecoilState(mapUser);
  const statusFavorites = useRecoilValue(favoritesState);
  const inputFavorite = useRecoilValue(inputFavoritesSearch);
  const updateFavorite = useRecoilValue(updateListFavorites);
  const [inputFavorites, setInputFavorites] =
    useRecoilState(inputFavoritesSearch);
  const [favoritesList, setFavoritesList] = useState([]);
  const [nothing, setNothing] = useState(false);
  const userAuth = useRecoilValue(userAuthenticated);
  const [resultNothing, setResultNothing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchFavorites = async () => {
    setLoading(true);
    const result = await API.graphql({
      query: queries.userByEmail,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        email: userAuth?.attributes?.email,
      },
    });
    let temporalList = []
    setFavoritesList(result?.data?.userByEmail?.items[0]?.favorites?.items);
    if (result?.data?.userByEmail?.items[0]?.favorites?.items?.length === 0)
      setNothing(true);
    if (inputFavorite !== "") {
      result?.data?.userByEmail?.items[0]?.favorites?.items?.map((item, index) => {
        let newArray = item?.business?.tags?.map(cadena => cadena.replace(/\[|\]/g, ""));
        newArray.map((newItem, newIndex) => {
          if (newItem.trim().toLowerCase().includes(inputFavorite.trim().toLowerCase())) temporalList.push(item)
        })
      });
      if (temporalList.length !== 0) {
        setFavoritesList(temporalList);
      } else {
        setResultNothing(true);
      }
    } else {
      setFavoritesList(result.data.userByEmail.items[0].favorites.items);
    }
    // setTimeout(() => {}, 2000);
    setLoading(false);
  };
  useLayoutEffect(() => {
    fetchFavorites();
    const updateSub = API.graphql({
      query: subscriptions.onUpdateUsers,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        filter: {
          email: { eq: userAuth?.attributes?.email },
        },
      },
    }).subscribe({
      next: ({ provider, value: { data } }) => {
        console.log("EL SUBS", data);
      },
      error: (error) => console.warn(error),
    });
    return () => {
      fetchFavorites()
      updateSub.unsubscribe();
    };
  }, [route, statusFavorites, inputFavorite, updateFavorite]);

  if (loading && !resultNothing)
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

  if (resultNothing && inputFavorite !== "")
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
          No tienes ningun favorito por '{inputFavorite}'
        </Text>
        <CustomButton
          text={`Refrescar`}
          handlePress={() => {
            setResultNothing(false);
          }}
          textStyles={[styles.textSearch, global.white]}
          buttonStyles={[styles.search, global.mainBgColor]}
        />
      </View>
    );

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
            <Ionicons
              name="grid-outline"
              size={18}
              color={mode ? "#ffffff" : "#fb8500"}
            />
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
            <Ionicons
              name="list-outline"
              size={18}
              color={!mode ? "#ffffff" : "#fb8500"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10, paddingBottom: 80 }}>
          {!loading ? (
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
              <ActivityIndicator size="large" color="#fb8500" />
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
        <ActivityIndicator size="large" color="#fb8500" />
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
