import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import * as Location from "expo-location";
import styles from "@/utils/styles/MapMarketBusiness.js";
import {
  directionBusiness,
  directionBusinessOn,
  emptyLocation,
  mapBusiness,
  selectLocation,
} from "@/atoms";
import { useRecoilState } from "recoil";
// hook form
import { Controller } from "react-hook-form";
import { createRef } from "react";
import { API } from "aws-amplify";
import { debounce } from "lodash";

const MAP_SETTINGS = [
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const MapMarketBusiness = ({
  initialLocation,
  control,
  name,
  text,
  placeholder,
  title,
  rules = {},
}) => {
  const global = require("@/utils/styles/global.js");
  const markerRef = useRef(null);
  const [marketLocation, setMarketLocation] = useState(null);
  const [errorMap, setErrorMap] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectMap, setSelectMap] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [direction, setDirection] = useRecoilState(directionBusiness);
  const [directionOn, setDirectionOn] = useRecoilState(directionBusinessOn);
  const [selectMapBusiness, setSelectMapBusiness] = useRecoilState(mapBusiness);
  const [labelSelected, setLabelSelected] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [selectionLocation, setSelectionLocation] =
    useRecoilState(selectLocation);
  const [selectionEmptyLocation, setSelectionEmptyLocation] =
    useRecoilState(emptyLocation);
  let mapRef = useRef();

  const onHandleMapMarket = async () => {
    setModalVisible(!modalVisible);
    setSelectionLocation(true);
  };
  const onHandleMarketMove = (e) => {
    let {
      nativeEvent: { coordinate },
    } = e;
    setMarketLocation(coordinate);
    setSelectMapBusiness(coordinate);
    setSelectMap(true);
  };
  const obtenerDireccion = async (coords) => {
    let direcciones = await Location.reverseGeocodeAsync(coords);
    if (direcciones && direcciones.length > 0) {
      let direccion = direcciones[0];
      let direccionString = `${
        direccion.street === null ? "" : `${direccion.street}, `
      }${direccion.city === null ? "" : direccion.city} - ${
        direccion.region === null ? "" : direccion.region
      }, ${direccion.postalCode === null ? "" : direccion.postalCode} `;
      setDirection(direccionString);
      setDirectionOn(direcciones);
    }
  };

  const autocompleteCoords = (label, latitude, longitude) => {
    setLabelSelected({
      label: label,
      latitude: latitude,
      longitude: longitude,
    });
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      7000
    );
    setSuggestions(null);
  };

  const obtenerCoordenadas = async (address) => {
    let direccion = await Location.reverseGeocodeAsync(initialLocation);
    const direccionComplete = `${direccion[0].country}, ${direccion[0].region}, ${address}`;
    let coordenadas = await Location.geocodeAsync(direccionComplete);
    setRegion({
      latitude: coordenadas[0]?.latitude,
      longitude: coordenadas[0]?.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current.animateToRegion(
      {
        latitude: coordenadas[0]?.latitude,
        longitude: coordenadas[0]?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      7000
    );
  };

  const onHandlePress = (e) => {
    const {
      nativeEvent: { coordinate },
    } = e;
    setRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSelectMapBusiness(coordinate);
    setSelectMap(true);
  };
  let lastPress = 0;
  const doublePress = () => {
    const now = new Date().getTime();

    if (now - lastPress < 100) {
      // Doble clic
      console.log("Doble clic");
      // onChange(e.nativeEvent.coordinate);
    } else {
      // Clic simple
      console.log("Clic simple");
      console.log(lastPress);
      console.log(now);
    }

    lastPress = now;
  };
  const onHandleConfirm = () => {
    if (!marketLocation) return setErrorMap(true);
    setLoading(true);
    obtenerDireccion(selectMapBusiness);
    setTimeout(() => {
      setLoading(false);
      setErrorMap(false);
      setSelectMap(true);
      setSelectionLocation(false);
      setSelectionEmptyLocation(false);
      setModalVisible(!modalVisible);
    }, 2000);
  };
  useEffect(() => {
    if (modalVisible) {
      if (marketLocation !== null) {
        setRegion({
          latitude: marketLocation.latitude,
          longitude: marketLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        setMarketLocation({
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
      setSelectMapBusiness({
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
      });
    }
  }, [modalVisible]);

  const search = async () => {
    setSuggestions(null);
    if (description === "") return;

    const api = "api-opense";
    const path = "/location/_search";
    const params = {
      headers: {},
      queryStringParameters: {
        text: description,
        location: JSON.stringify({
          latitude: initialLocation?.latitude,
          longitude: initialLocation?.longitude,
        }),
      },
    };

    try {
      const response = await API.get(api, path, params);
      setSuggestions(response.data);
    } catch (error) {
      console.log("Error buscando algo", error);
    }
  };

  const handleInputChange = (e) => {
    setDescription(e);
  };

  useEffect(() => {
    const debouncedSetSearch = debounce((e) => {
      console.log(e);
      search(e);
    }, 1000);

    if (description !== "") {
      debouncedSetSearch(description);
    }
  }, [description]);

  const showTitleMarket = () => {
    markerRef?.current?.showCallout();
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <ScrollView
          style={[global.bgWhite, { flex: 1 }]}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <TouchableOpacity
              onPress={() => onHandleMapMarket()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              <View
                style={[
                  global.bgYellow,
                  {
                    height: 50,
                    width: 110,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    marginRight: 35,
                    borderColor: "#1f1f1f",
                    borderWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    global.black,
                    {
                      fontFamily: "bold",
                      fontSize: 13,
                    },
                  ]}
                >
                  Abrir mapa
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                {direction ? (
                  <Text
                    style={styles.textTag}
                  >{`¡Tu ubicacion: ${direction} se agrego exitosamente!`}</Text>
                ) : selectionLocation ? (
                  <Text
                    style={styles.textInputTagError}
                  >{`No has seleccionado una ubicacion`}</Text>
                ) : (
                  <Text
                    style={styles.textInputTag}
                  >{`Selecciona una ubicacion`}</Text>
                )}
              </View>
            </TouchableOpacity>

            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalTop}>
                      <Pressable
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Image
                          style={{
                            width: 45,
                            height: 45,
                            resizeMode: "contain",
                            marginLeft: 15,
                          }}
                          source={require("@/utils/images/arrow_back.png")}
                        />
                      </Pressable>
                      <Text style={styles.modalText}>
                        Salir de la seleccion de ubicacion
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      {modalVisible && marketLocation && (
                        <MapView
                          // provider={PROVIDER_GOOGLE}
                          style={{ flex: 1 }}
                          showsUserLocation={modalVisible}
                          ref={mapRef}
                          region={region}
                          // onPress={() => doublePress()}
                          onPress={(e) => {
                            // onHandlePress(e);
                            onChange(e.nativeEvent.coordinate);
                          }}
                          onDoublePress={onHandleMarketMove}
                        >
                          <Marker
                            key={1}
                            // title="Contenido del Callout"
                            coordinate={marketLocation}
                            draggable
                            onDragEnd={onHandleMarketMove}
                            ref={markerRef}
                          >
                            {/* <Callout>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: "bold" }}>
                                {title}
                              </Text>
                            </View>
                          </Callout> */}
                          </Marker>
                        </MapView>
                      )}

                      {errorMap && (
                        <Text
                          style={{
                            position: "absolute",
                            bottom: 25,
                            right: 120,
                            width: 170,
                            fontFamily: "bold",
                            color: "red",
                            fontSize: 14,
                          }}
                        >
                          Aun no seleccionaste ninguna ubicacion
                        </Text>
                      )}
                      <View
                        style={{
                          position: "absolute",
                          flex: 1,
                          marginHorizontal: 15,
                          marginVertical: 13,
                          paddingLeft: 10,
                          borderRadius: 5,
                          borderColor: "#1f1f1f",
                          borderWidth: 0.7,
                          width: 295,
                          height: 50,
                          backgroundColor: "#fff",
                        }}
                      >
                        <TextInput
                          value={description}
                          onChangeText={(e) => {
                            handleInputChange(e);
                            setActiveButton(false);
                          }}
                          placeholder={`Introduce una direccion`}
                          placeholderTextColor={`#1f1f1f80`}
                          style={{
                            fontFamily: "regular",
                            fontSize: 14,
                            height: 50,
                          }}
                        />
                        {suggestions && (
                          <FlatList
                            data={suggestions}
                            showsVerticalScrollIndicator={true}
                            keyExtractor={(item) => item?.Label}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                style={{
                                  paddingVertical: 8,
                                  borderBottomColor: "#1f1f1f",
                                  borderBottomWidth: 1,
                                }}
                                onPress={() =>
                                  autocompleteCoords(
                                    item?.Label,
                                    item?.Point[1],
                                    item?.Point[0]
                                  )
                                }
                              >
                                <Text
                                  style={{
                                    fontFamily: "light",
                                    fontSize: 12,
                                  }}
                                >
                                  {item?.Label}
                                </Text>
                              </TouchableOpacity>
                            )}
                            style={{
                              flex: 1,
                              position: "absolute",
                              backgroundColor: "white",
                              padding: 10,
                              paddingTop: 0,
                              borderColor: "#1f1f1f",
                              borderWidth: 1,
                              top: 50,
                              width: 295,
                              borderBottomRightRadius: 8,
                              borderBottomLeftRadius: 8,
                              // height: 200,
                              zIndex: 100,
                            }}
                          />
                        )}
                        {/* <TouchableOpacity
                          style={[
                            {
                              position: "absolute",
                              bottom: -1,
                              right: -90,
                              justifyContent: "center",
                              alignContent: "center",
                              borderRadius: 5,
                              height: 50,
                              width: 85,
                              alignItems: "center",
                              borderColor: "#1f1f1f",
                              borderWidth: 0.7,
                              opacity:
                                activeButton || description !== "" ? 0.8 : 1,
                            },
                            activeButton || description === ""
                              ? global.bgWhite
                              : global.bgYellow,
                          ]}
                          pointerEvents="auto"
                          disabled={
                            description === "" || activeButton ? true : false
                          }
                          onPress={() => {
                            if (description !== "") {
                              obtenerCoordenadas(description);

                              setActiveButton(true);
                            }
                          }}
                        >
                          {loadingSearch ? (
                            <ActivityIndicator size="small" color="#1f1f1f" />
                          ) : (
                            <Text
                              style={[
                                global.black,
                                { fontFamily: "bold", fontSize: 14 },
                              ]}
                            >{`Buscar`}</Text>
                          )}
                        </TouchableOpacity> */}
                      </View>

                      <TouchableOpacity
                        style={[
                          {
                            position: "absolute",
                            bottom: 20,
                            right: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 15,
                            borderRadius: 5,
                            width: 100,
                            alignItems: "center",
                            borderColor: "#1f1f1f",
                            borderWidth: 1,
                          },
                          global.bgYellow,
                        ]}
                        onPress={onHandleConfirm}
                      >
                        {loading ? (
                          <ActivityIndicator size="small" color="#1f1f1f" />
                        ) : (
                          <Text
                            style={[global.black, { fontFamily: "bold" }]}
                          >{`Confirmar`}</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        </ScrollView>
      )}
    />
  );
};

export default MapMarketBusiness;
