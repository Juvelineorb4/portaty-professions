import {
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import * as Location from "expo-location";
import styles from "@/utils/styles/MapMarket.module.css";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const MapFilter = ({ open, close, initialLocation, country, city }) => {
  console.log(country, city);
  const global = require("@/utils/styles/global.js");
  const [description, setDescription] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  let mapRef = useRef();
  const obtenerCoordenadas = async (address) => {
    console.log(mapRef);
    console.log(address);
    const direccionComplete = `${address}, ${city}, ${country}`;
    let coordenadas = await Location.geocodeAsync(direccionComplete);

    let direcciones = await Location.reverseGeocodeAsync(coordenadas[0]);

    console.log(direcciones);

    if (direcciones[0].country !== country || direcciones[0].city === null) {
      console.log("No ta");
      return;
    }

    setRegion({
      latitude: coordenadas[0].latitude,
      longitude: coordenadas[0].longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current.animateToRegion(
      {
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      7000
    );
  };
  useEffect(() => {}, []);
  return (
    <Modal animationType="none" transparent={true} visible={open}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTop}>
            <Pressable
              onPress={() => {
                close();
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
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation={open}
                ref={mapRef}
                region={region}
              >
                <Circle
                  center={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                  radius={1000}
                  strokeWidth={1}
                  strokeColor={"#1a66ff"}
                  fillColor={"rgba(26, 102, 255, 0.3)"}
                />
              </MapView>
            )}
            <View
            >
              <GooglePlacesAutocomplete
                placeholder="Buscar"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(data)
                  setSelectedPlace(details);
                }}
                query={{
                  key: "AIzaSyD2t22FbClP1nmHLYQiSSfJgk40LgXKzPI",
                  language: "es",
                  components: "country:ve", 
                }}
              />
              {selectedPlace && (
                <View style={{ padding: 20 }}>
                  <Text>Dirección seleccionada:</Text>
                  <Text>{selectedPlace.formatted_address}</Text>
                  <Text>Latitud: {selectedPlace.geometry.location.lat}</Text>
                  <Text>Longitud: {selectedPlace.geometry.location.lng}</Text>
                </View>
              )}
            </View>
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
                width: 235,
                backgroundColor: "#fff",
              }}
            >
              <TextInput
                value={description}
                onChangeText={(e) => {
                  setDescription(e);
                }}
                placeholder={`Introduce una direccion`}
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                }}
              />
              <TouchableOpacity
                style={[
                  {
                    position: "absolute",
                    bottom: -1,
                    right: -65,
                    justifyContent: "center",
                    alignContent: "center",
                    borderRadius: 5,
                    height: 40,
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
              </TouchableOpacity>
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
              //   onPress={onHandleConfirm}
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
