import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  PermissionsAndroid,
} from "react-native";
import * as Location from "expo-location";
import { Auth, API } from "aws-amplify";
import Grid from "@/components/Home/Grid";
import List from "@/components/Home/List";
import {
  favoritesState,
  inputFavoritesSearch,
  mapUser,
  userAuthenticated,
  updateListFavorites,
  connectionStatus,
} from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as subscriptions from "@/graphql/CustomSubscriptions/Favorites";
import CustomButton from "@/components/CustomButton";
import styles from "@/utils/styles/Home.js";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import ModalAlert from "@/components/ModalAlert";
import News from "@/components/Home/News";
import ModalUpdate from "@/components/ModalUpdate";
// Hooks
import useCheckAppVersion from "@/hooks/useCheckAppVersion";
import NetInfo from "@react-native-community/netinfo";
import Promotions from "@/components/Home/Promotions";

const Home = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const { updateAvailable, fetchUpdate, updateVersion, updateDate } =
    useCheckAppVersion();
  const [mode, setMode] = useState(3);
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
  const [isConnected, setIsConnected] = useRecoilState(connectionStatus);

  const fetchFavorites = async () => {
    setLoading(true);
    if (userAuth === null) {
      console.log(userAuth);
      setLoading(false);
      return;
    }
    try {
      const fetchAllFavorites = async (nextToken, result = []) => {
        const response = await API.graphql({
          query: queries.listFavoritesbyUserID,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            userID: userAuth?.attributes["custom:userTableID"],
            nextToken,
          },
        });

        const items = response.data.listFavoritesbyUserID.items;
        result.push(...items);

        if (response.data.listFavoritesbyUserID.nextToken) {
          return fetchAllFavorites(
            response.data.listFavoritesbyUserID.nextToken,
            result
          );
        }

        return result;
      };

      const allFavorites = await fetchAllFavorites();
      let temporalList = [];
      setFavoritesList(allFavorites);
      if (allFavorites.length === 0) setNothing(true);
      if (inputFavorite !== "") {
        allFavorites.map((item, index) => {
          let newArray = item?.business?.tags?.map((cadena) =>
            cadena.replace(/\[|\]/g, "")
          );
          newArray.map((newItem, newIndex) => {
            if (
              newItem
                .trim()
                .toLowerCase()
                .includes(inputFavorite.trim().toLowerCase())
            )
              temporalList.push(item);
          });
        });
        if (temporalList.length !== 0) {
          setFavoritesList(temporalList);
        } else {
          setResultNothing(true);
        }
      } else {
        setFavoritesList(allFavorites);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* Permiso Ubicacion */

  const openAppSettings = async () => {
    try {
      // await Linking.openSettings();
    } catch (error) {
      console.log("Error al abrir la configuración:", error);
    }
  };

  const checkLocationPermission = async () => {
    try {
      const granted = await Location.getForegroundPermissionsAsync();
      if (granted) {
        console.log("Permiso de ubicación concedido");

        // Realiza acciones según el permiso concedido
      } else {
        console.log("Permiso de ubicación denegado");
        // Realiza acciones según el permiso denegado
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("aqui", status);
      }
    } catch (error) {
      console.error("Error al verificar permiso:", error);
    }
  };
  /*  */

  /* Validar conexion a internet */
  const getConnection = async () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (userLocation) fetchFavorites();
        setIsConnected(state.isConnected);
      } else {
        setIsConnected(state.isConnected);
      }
    });
  };
  /* */

  /* Refresh */
  const [refreshing, setRefreshing] = useState(false);

  const Wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getConnection();
    Wait(2000).then(() => setRefreshing(false));
  });
  /* Refresh */

  useLayoutEffect(() => {
    openAppSettings();
    checkLocationPermission();
    getConnection();
    const updateSub = API.graphql({
      query: subscriptions.onUpdateUsers,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        filter: {
          email: { eq: userAuth?.attributes?.email },
        },
      },
    }).subscribe({
      next: ({ provider, value: { data } }) => {},
      error: (error) => console.warn(error),
    });
    return () => {
      getConnection();
      if (updateSub) {
        updateSub.unsubscribe();
      }
    };
  }, [route, statusFavorites, inputFavorite, updateFavorite, userAuth]);
  useEffect(() => {
    if (userAuth) {
      fetchPromotions();
    }
  }, [userAuth]);
  const fetchPromotions = async () => {
    const api = "api-portaty";
    const path = "/listPromotions";
    const params = {
      headers: {},
    };

    try {
      const response = await API.get(api, path, params);
      console.log("EL PEPE: ", response.data);
      response.data?.map((item) => console.log(item));
    } catch (error) {
      console.log("ERROR AL CONSULTAR PROMOCIONES: ", error.response.datar);
    }
  };
  if (updateAvailable === true)
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
        <ModalUpdate
          isVisible={updateAvailable}
          version={updateVersion ? updateVersion : "No definido"}
          updateDate={updateDate ? updateDate : "No definido"}
          onConfirm={fetchUpdate}
        />
      </View>
    );
  if (loading && !resultNothing)
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <ActivityIndicator size="large" color="#ffb703" />
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
            onRefresh();
          }}
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );

  if (!isConnected)
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
          }}
        >
          No tienes conexión. Intenta de nuevo
        </Text>
        <CustomButton
          text={`Refrescar`}
          handlePress={() => {
            setResultNothing(false);
            onRefresh();
          }}
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );

  if (!userAuth && !loading)
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
        <Text
          style={{ fontSize: 16, fontFamily: "light", textAlign: "center" }}
        >
          Ingresa a tu cuenta para guardar tus negocios favoritos
        </Text>
        <CustomButton
          text={`Iniciar sesion`}
          handlePress={() => {
            navigation.navigate("Login_Welcome");
          }}
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );

  if (favoritesList.length !== 0)
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
          }}
        >
          <Promotions />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={[
                {
                  borderColor: "#1f1f1f",
                  borderWidth: 0.7,
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 8,
                },
                mode === 1 ? global.bgYellow : global.bgWhite,
              ]}
              onPress={() => setMode(1)}
            >
              <SimpleLineIcons
                name="bell"
                size={16}
                color={mode === 1 ? "#1f1f1f" : "#1f1f1f"}
              />
            </TouchableOpacity>
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
                    borderWidth: 0.7,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  },
                  mode === 2 ? global.bgYellow : global.bgWhite,
                ]}
                onPress={() => setMode(2)}
              >
                <Ionicons
                  name="grid-outline"
                  size={17}
                  color={mode === 2 ? "#1f1f1f" : "#1f1f1f"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    marginLeft: 2,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    padding: 10,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                  },
                  mode === 3 ? global.bgYellow : global.bgWhite,
                ]}
                onPress={() => setMode(3)}
              >
                <Ionicons
                  name="list-outline"
                  size={18}
                  color={mode === 3 ? "#1f1f1f" : "#1f1f1f"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            paddingBottom: 80,
          }}
        >
          {!loading ? (
            mode === 2 ? (
              <Grid data={favoritesList} />
            ) : mode === 3 ? (
              <List data={favoritesList} />
            ) : (
              <News data={favoritesList} />
            )
          ) : (
            <View
              style={[
                { flex: 1, alignItems: "center", justifyContent: "center" },
                global.bgWhite,
              ]}
            >
              <ActivityIndicator size="large" color="#ffb703" />
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
        <ActivityIndicator size="large" color="#1f1f1f" />
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
        <Text style={{ fontSize: 16, fontFamily: "regular" }}>
          No tienes ningun favorito aun
        </Text>
        <CustomButton
          text={`Buscar`}
          handlePress={() => navigation.navigate("Search_Tab")}
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );
};

export default Home;
