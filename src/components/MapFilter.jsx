import {
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import * as Location from "expo-location";
import styles from "@/utils/styles/MapMarket.js";
import { useRecoilState } from "recoil";
import { kmRadio, mapUser, searchAddressInitial } from "@/atoms";
import Slider from "@react-native-community/slider";
import { API } from "aws-amplify";
import { debounce } from "lodash";

const MapFilter = ({ open, close, initialLocation, country, city }) => {
  const global = require("@/utils/styles/global.js");
  const [description, setDescription] = useState("");
  const [labelSelected, setLabelSelected] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filterRadio, setFilterRadio] = useRecoilState(kmRadio);
  const [changeTag, setChangeTag] = useState(filterRadio);
  const [searchActive, setSearchActive] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [searchAddress, setSearchAddress] =
    useRecoilState(searchAddressInitial);
  const [mapChange, setMapChange] = useRecoilState(mapUser);
  const [region, setRegion] = useState({
    latitude: initialLocation?.latitude,
    longitude: initialLocation?.longitude,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  });
  const [searchTerm, setSearchTerm] = useState("");
  let mapRef = useRef(null);
  const timerIdRef = useRef(null);

  const getAddress = async (obj) => {
    setSearchAddress(obj?.label);
    setMapChange({
      latitude: obj?.latitude,
      longitude: obj?.longitude,
    });
  };
  const getAddressReverse = async (coords) => {
    let reverseGeocode = await Location.reverseGeocodeAsync(coords);
    if (reverseGeocode.length > 0) {
      let address = reverseGeocode[0];
      let addressString = [
        address.street,
        address.city,
        address.region,
        address.country,
      ]
        .filter(Boolean)
        .join(", ");
      setSearchAddress(addressString);
    } else {
      setSearchAddress("Ocurrio un error, intenta de nuevo");
    }
  };
  const onHandlePress = (e) => {
    const {
      nativeEvent: { coordinate },
    } = e;
    setMapChange({
      latitude: coordinate?.latitude,
      longitude: coordinate?.longitude,
    });
    if (mapRef.current) {
      const newRegion = mapRef.current.__lastRegion;
    }
    setRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
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
      latitudeDelta: 0.018,
      longitudeDelta: 0.018,
    });
    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.018,
        longitudeDelta: 0.018,
      },
      7000
    );
    setSuggestions(null);
  };
  const obtenerCoordenadas = async (address) => {
    const direccionComplete = `${address}, ${city}, ${country}`;
    let coordenadas = await Location.geocodeAsync(direccionComplete);

    let direcciones = await Location.reverseGeocodeAsync(coordenadas[0]);

    if (direcciones[0].country !== country || direcciones[0].city === null) {
      return;
    }

    setRegion({
      latitude: coordenadas[0].latitude,
      longitude: coordenadas[0].longitude,
      latitudeDelta: 0.018,
      longitudeDelta: 0.018,
    });
    mapRef.current.animateToRegion(
      {
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
        latitudeDelta: 0.018,
        longitudeDelta: 0.018,
      },
      7000
    );
  };

  const search = async () => {
    setSuggestions(null);
    if (description === "") return;
    const api = "api-opense";
    const path = "/location/_search";
    const params = {
      headers: {},
      queryStringParameters: {
        text: description, //texto a buscar
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
      search(e);
    }, 1000);

    if (description !== "") {
      debouncedSetSearch(description);
    }
  }, [description]);
  return (
    <Modal animationType="none" transparent={true} visible={open}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTop}>
            <Pressable
              onPress={() => {
                close();
                setFilterRadio(1);
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
            <Text style={styles.modalText}>Salir</Text>
          </View>
          <View style={{ flex: 1 }}>
            {open && (
              <MapView
                // provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation={open}
                ref={mapRef}
                region={region}
                onDoublePress={(e) => {
                  onHandlePress(e);
                }}
              >
                <Circle
                  center={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                  radius={filterRadio * 1000}
                  strokeWidth={1}
                  strokeColor={"#1a66ff"}
                  fillColor={"rgba(26, 102, 255, 0.3)"}
                />
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                >
                  <View style={styles.marker}>
                    <View style={styles.innerMarker} />
                  </View>
                </Marker>
              </MapView>
            )}

            <View
              style={{
                position: "absolute",
                flex: 1,
                marginHorizontal: 5,
                marginVertical: 13,
                padding: 5,
                borderRadius: 5,
                borderColor: "#1f1f1f",
                borderWidth: 0.7,
                width: 295,
                backgroundColor: "#fff",
              }}
            >
              <TextInput
                value={description}
                onChangeText={handleInputChange}
                placeholder={`Introduce una direccion`}
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  height: 40,
                }}
                placeholderTextColor={"#1f1f1f"}
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
                    top: 40,
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
                    right: -65,
                    justifyContent: "center",
                    alignContent: "center",
                    borderRadius: 5,
                    height: 52,
                    width: 60,
                    alignItems: "center",
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                  },
                  global.bgYellow,
                ]}
                onPress={() => obtenerCoordenadas(description)}
              >
                <Text
                  style={[global.black, { fontFamily: "bold", fontSize: 12 }]}
                >{`Buscar`}</Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: "#ffb703",
                margin: 20,
                borderColor: "#1f1f1f",
                borderWidth: 1,
                borderRadius: 7,
                paddingVertical: 15,
                paddingHorizontal: 5,
                // flex: 1,
                alignItems: "stretch",
                justifyContent: "center",
                height: 50,
              }}
            >
              <Slider
                value={filterRadio}
                onValueChange={(e) => {
                  if (e < 4) setChangeTag(e * 2 - 5);
                  if (e >= 4 && e < 8) setChangeTag(e * 2);
                  if (e >= 8 && e < 13) setChangeTag(e * 2 + 5);
                  if (e >= 13 && e < 15) setChangeTag(e * 2 + 8);
                  if (e === 15) setChangeTag(e * 2 + 10);
                  if (e === 16) setChangeTag(e * 2 + 12);
                  if (e === 17) setChangeTag(e * 2 + 14);
                  if (e === 18) setChangeTag(e * 2 + 16);
                  if (e === 19) setChangeTag(e * 2 + 17);
                  if (e === 20) setChangeTag(e * 2 + 17);
                  if (e === 21) setChangeTag(e * 2 + 19);
                  if (e === 22) setChangeTag(e * 2 + 21);
                  if (e === 23) setChangeTag(e * 2 + 21);
                  if (e === 24) setChangeTag(e * 2 + 22);
                  if (e >= 25 && e < 35) setChangeTag(e * 3);
                  if (e >= 35 && e < 46) setChangeTag(e * 3 + 5);
                  if (e === 46) setChangeTag(e * 3 + 6);
                  if (e === 48) setChangeTag(e * 3 + 7);
                  if (e === 49) setChangeTag(e * 3 + 8);
                  if (e === 50) setChangeTag(e * 3 + 10);

                  setFilterRadio(e);
                }}
                minimumValue={1}
                maximumValue={50}
                step={1}
                style={{
                  width: 200,
                }}
                thumbTintColor={`#1f1f1f`}
                minimumTrackTintColor={`#1f1f1f`}
                maximumTrackTintColor={`#fff`}
              />
              <View
                style={{
                  position: "absolute",
                  left: changeTag,
                  top: -35,
                  backgroundColor: "#fff",
                  padding: 10,
                  // borderColor: "#1f1f1f",
                  // borderWidth: 1,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: 12,
                  }}
                >
                  {filterRadio} km
                </Text>
                <View
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 30,
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderTopWidth: 20,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderTopColor: "#fff",
                    // transform: [{ translateX: -10 }],
                  }}
                />
              </View>
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
              onPress={() => {
                if (labelSelected) {
                  getAddress(labelSelected);
                } else {
                  getAddressReverse(mapChange);
                }
                close();
              }}
            >
              {/* {loading ? (
                <ActivityIndicator size="small" color="#1f1f1f" />
              ) : ( */}
              <Text
                style={[global.black, { fontFamily: "bold" }]}
              >{`Confirmar`}</Text>
              {/* )} */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MapFilter;
