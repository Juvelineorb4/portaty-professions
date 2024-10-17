import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import GridSearch from "@/components/Search/GridSearch";
import * as customSearch from "@/graphql/CustomQueries/Search";
import { Auth, API, Storage } from "aws-amplify";
import styles from "@/utils/styles/Tags.js";
import {
  mapUser,
  searchStatus,
  searchCache,
  kmRadio,
  totalSearch,
  searchAddressInitial,
  mapUserChange,
  connectionStatus,
  searchMap,
} from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Location from "expo-location";
// import useLocation from "@/hooks/useLocation";
import SkeletonSearch from "@/components/SkeletonSearch";
import SkeletonMoreItems from "@/components/SkeletonMoreItems";
import * as Cellular from "expo-cellular";
import { Entypo } from "@expo/vector-icons";
import MapFilter from "@/components/MapFilter";
import NetInfo from "@react-native-community/netinfo";
import CustomButton from "@/components/CustomButton";
import MapSearch from "@/components/Search/MapSearch";
import ListSearch from "@/components/Search/ListSearch";

const Search = ({ route, navigation }) => {
  const global = require("@/utils/styles/global.js");
  const userLocation = useRecoilValue(mapUser);
  const [userLocationChange, setUserLocationChange] = useRecoilState(mapUser);
  const userChangeLocation = useRecoilValue(mapUserChange);
  const [moreItems, setMoreItems] = useState(1);
  const [items, setItems] = useState([]);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [searchActive, setSearchActive] = useRecoilState(searchStatus);
  const [searchCacheActive, setSearchCacheActive] = useRecoilState(searchCache);
  const [totalData, setTotalData] = useRecoilState(totalSearch);
  const [totalLimit, setTotalLimit] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [filterRadio, setFilterRadio] = useRecoilState(kmRadio);
  // const { location } = useLocation();
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState(false);
  const [visibleMap, setVisibleMap] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchAddress, setSearchAddress] =
    useRecoilState(searchAddressInitial);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useRecoilState(connectionStatus);

  /* Mapa */
  const [searchLocal, setSearchLocal] = useRecoilState(searchMap);

  const getAddress = async (coords) => {
    let direcciones = await Location.reverseGeocodeAsync(coords);
    if (direcciones && direcciones.length > 0) {
      let direccion = direcciones[0];
      let direccionString = `${
        direccion.street === null ? "" : `${direccion.street}, `
      }${direccion.city === null ? "" : direccion.city} - ${
        direccion.region === null ? "" : direccion.region
      }, ${direccion.postalCode === null ? "" : direccion.postalCode} `;
      setSearchAddress(direccionString);
      setCity(direccion.region);
    }
  };

  const kilometers = [1, 5, 10, 20, 50, 100];
  let number = 26 * moreItems;

  const getData = async () => {
    if (!searchActive || route.params?.refresh) setIsLoading(true);
    const api = "api-opense";
    const path = "/search/businessBySectors";
    const params = {
      headers: {},
      queryStringParameters: {
        location: JSON.stringify({
          lat: userLocation?.latitude,
          lon: userLocation?.longitude,
        }),
        km: filterRadio,
        from: 0,
        limit: number,
      },
    };
    try {
      const response = await API.get(api, path, params);
      setTotalData(response.total_items);
      setTotalLimit(response.total_items);
      setIsLoading(false);
      setSearchActive(true);
      setSearchCacheActive(response.items);
      return setItems(response.items);
    } catch (error) {
      return console.log("ERROR EN BSUQUEDA DEFAULT: aqui ", error);
    }
  };

  /* Validar conexion a internet */
  const getConnection = async () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (userLocation) getData();
        setIsConnected(state.isConnected);
      } else {
        setIsConnected(state.isConnected);
        setSearchActive(false);
      }
    });
  };
  /* */

  const getFilterData = async () => {
    setStatusFilter(true);
    getConnection();
    // setTimeout(() => {}, 3000);
    setStatusFilter(false);
  };

  async function getCountryCode(array) {
    let reverseGeocode = await Location.reverseGeocodeAsync(userLocation);
    if (reverseGeocode.length > 0) {
      const countryCode = reverseGeocode[0].isoCountryCode.toUpperCase();
      array.map((item, index) => {
        if (item.cca2 === countryCode) {
          setCountry(item);
        }
      });
    } else {
      console.log("Ocurrio un error");
    }
  }

  const filteredCountries = countries.filter((item) =>
    item?.name?.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

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

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2`)
      .then((response) => {
        return response.json();
      })
      .then((item) => {
        setCountries(item);
        getCountryCode(item);
      });
    getConnection();
  }, [userLocation, moreItems, refreshing, route]);

  const getUserLocation = async () => {
    setLoadingAddress(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      setLoadingAddress(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      coords: { latitude, longitude },
    });
    let { latitude, longitude } = location.coords;
    getAddress({ latitude, longitude });
    setUserLocationChange({ latitude, longitude });
    setLoadingAddress(false);
  };

  if (isLoading) {
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <SkeletonSearch />
      </View>
    );
  }
  if (!isConnected) {
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
          handlePress={() => onRefresh()}
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );
  }

  if (searchActive && isConnected && !isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingBottom: 50 }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "regular",
              }}
            >
              Tienes {totalData} negocios cerca de ti
            </Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                if (searchAddress === "") getAddress(userLocation);
              }}
            >
              <Image
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 30,
                  marginRight: 4,
                  resizeMode: "contain",
                }}
                source={{
                  uri: country ? country?.flags?.png : countries[0]?.flags?.png,
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "mediumItalic",
                }}
              >
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>

          <Modal animationType="none" transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalTop}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setVisibleCountries(false);
                    }}
                  >
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        resizeMode: "contain",
                      }}
                      source={require("@/utils/images/arrow_back.png")}
                    />
                  </Pressable>
                  <Text
                    style={{ fontFamily: "regular", fontSize: 14 }}
                  >{`Filtra tu busqueda`}</Text>
                </View>
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: 15,
                    marginBottom: 15,
                  }}
                >{`Tu país de ubicación:`}</Text>
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.inputContainerBot,
                      {
                        height: 50,
                        width: "100%",
                        marginRight: 10,
                        borderColor: "#404040",
                        borderWidth: 0.7,
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 8,
                        justifyContent: "space-between",
                      },
                    ]}
                    activeOpacity={1}
                    // onPress={() => setVisibleCountries(!visibleCountries)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 30,
                          marginLeft: 10,
                          marginRight: 2,
                          resizeMode: "contain",
                        }}
                        source={{
                          uri: country
                            ? country?.flags?.png
                            : countries[0]?.flags?.png,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 14,
                          color: "#000",
                          marginLeft: 7,
                        }}
                      >
                        {country?.name?.common}
                      </Text>
                    </View>
                    {/* <Entypo
                      name="chevron-down"
                      size={24}
                      color="black"
                      style={{ marginRight: 5 }}
                    /> */}
                  </TouchableOpacity>
                  {visibleCountries && (
                    <View
                      style={{
                        flex: 1,
                        height: 320,
                        position: "absolute",
                        top: 50,
                        backgroundColor: "#fff",
                        zIndex: 10,
                        borderRadius: 5,
                      }}
                    >
                      <TextInput
                        value={searchCountry}
                        onChangeText={(e) => setSearchCountry(e)}
                        placeholder={`Busca tu pais`}
                        defaultValue={searchCountry}
                        style={{
                          margin: 5,
                          borderWidth: 1,
                          borderColor: "#1f1f1f",
                          padding: 5,
                          fontFamily: "medium",
                          fontSize: 12,
                          borderRadius: 5,
                        }}
                      />
                      <View style={[{ flex: 1 }]}>
                        <FlatList
                          data={searchCountry ? filteredCountries : countries}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={[
                                // styles.inputContainerBot,
                                {
                                  height: 40,
                                  width: 250,
                                  flexDirection: "row",
                                  borderWidth: 0.5,
                                  borderColor: "#1f1f1f",
                                  alignItems: "center",
                                  marginHorizontal: 5,
                                  borderRadius: 8,
                                  marginBottom: 5,
                                },
                              ]}
                              onPress={() => {
                                setCountry(item);
                                setVisibleCountries(!visibleCountries);
                              }}
                            >
                              <Image
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 10,
                                  marginHorizontal: 10,
                                  resizeMode: "contain",
                                }}
                                source={{ uri: item?.flags?.png }}
                              />
                              <Text
                                style={{
                                  fontFamily: "regular",
                                  fontSize: 12,
                                  color: "#000",
                                  width: 150,
                                }}
                              >
                                {item?.name?.common}
                              </Text>
                            </TouchableOpacity>
                          )}
                          keyExtractor={(item, index) => index}
                          showsVerticalScrollIndicator={false}
                        />
                      </View>
                    </View>
                  )}
                </View>
                {userChangeLocation === null ? (
                  <MapFilter
                    initialLocation={userLocation}
                    open={visibleMap}
                    close={() => setVisibleMap(!visibleMap)}
                    country={country?.name?.common}
                    city={city}
                    loading={(e) => setLoadingAddress(e)}
                  />
                ) : (
                  <MapFilter
                    initialLocation={userChangeLocation}
                    open={visibleMap}
                    close={() => setVisibleMap(!visibleMap)}
                    country={country?.name?.common}
                    city={city}
                    loading={(e) => setLoadingAddress(e)}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: 15,
                      marginVertical: 20,
                      lineHeight: 25,
                    }}
                  >
                    {`Te encuentras en: `}{" "}
                    {loadingAddress ? (
                      <View
                        style={{
                          paddingHorizontal: 5,
                        }}
                      >
                        <ActivityIndicator color={"#ffb703"} />
                      </View>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 14,
                        }}
                      >
                        {`${searchAddress}`}
                        {"  "}
                      </Text>
                    )}
                    <Text
                      onPress={() => setVisibleMap(true)}
                      style={{
                        fontFamily: "bold",
                        fontSize: 15,
                        textDecorationLine: "underline",
                      }}
                    >
                      Cambiar
                    </Text>
                  </Text>
                  <TouchableOpacity onPress={() => getUserLocation()}>
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: 15,
                        textDecorationLine: "underline",
                      }}
                    >
                      Seleccionar mi ubicacion
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <TouchableOpacity
                    style={[
                      global.bgYellow,
                      {
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 49,
                        // marginTop: 60,
                        borderWidth: 0.7,
                        borderColor: "#1f1f1f",
                      },
                    ]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      if (userLocation) getFilterData();
                    }}
                  >
                    <Text
                      style={[
                        global.black,
                        { fontFamily: "bold", fontSize: 14 },
                      ]}
                    >
                      {`Buscar`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {statusFilter ? (
          <View
            style={[
              { flex: 1, alignItems: "center", justifyContent: "center" },
              global.bgWhite,
            ]}
          >
            <ActivityIndicator size="large" color="#ffb703" />
          </View>
        ) : searchActive ? (
          <FlatList
            data={searchCacheActive}
            renderItem={({ item, index }) => (
              <ListSearch renderItems={item} more={index} type={`area`} />
            )}
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
                {totalData === totalLimit ? (
                  <Text style={{ fontFamily: "regular", fontSize: 14 }}>
                    No hay mas negocios por mostrar
                  </Text>
                ) : (
                  <SkeletonMoreItems />
                )}
              </View>
            )}
            onEndReached={() => {
              if (totalData > totalLimit) setMoreItems(moreItems + 1);
            }}
            onEndReachedThreshold={0}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          items.length !== 0 && (
            <FlatList
              data={items}
              renderItem={({ item, index }) => (
                <ListSearch renderItems={item} more={index} type={`area`} />
              )}
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
                  {/* {totalData > totalLimit && (
                    <ActivityIndicator size="large" color="#5E2129" />
                  )} */}
                  {totalData === totalLimit ? (
                    <Text style={{ fontFamily: "regular", fontSize: 14 }}>
                      No hay mas negocios por mostrar
                    </Text>
                  ) : (
                    <SkeletonMoreItems />
                  )}
                </View>
              )}
              onEndReached={() => {
                if (totalData > totalLimit) setMoreItems(moreItems + 1);
              }}
              onEndReachedThreshold={0}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )
        )}
      </View>
    );
  }
};

export default Search;
