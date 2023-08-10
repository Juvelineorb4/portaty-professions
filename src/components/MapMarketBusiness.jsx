import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import styles from "@/utils/styles/MapMarket.module.css";

const MapMarketBusiness = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [activeMap, setActiveMap] = useState(false);
  const [marketLocation, setMarketLocation] = useState(null);
  const [initalMarketLocation, setInitialMarketLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let mapRef = useRef(null);

  const onHandleMarkerDragStart = (e) => {
    let {
      nativeEvent: { coordinate },
    } = e;
    setInitialMarketLocation(coordinate);
  };

  const onHandleConfirm = () => {
    console.log(marketLocation);
    setActiveMap(false)
  };
  const onMapMarket = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    console.log(location.coords);
    setUserLocation(location.coords);
    setMarketLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setActiveMap(true)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labelInput}>Direccion</Text>
        <TouchableOpacity
          style={[styles.inputContainer]}
          onPress={onMapMarket}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.textInput}>
              Av. Bolivar - Calle 1
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {activeMap && (
        <>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            showsPointsOfInterest={false}
            onPress={(e) => {}}
            customMapStyle={[
              {
                featureType: "poi.business",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
            ]}
            showsUserLocation={true}
          >
            {marketLocation && (
              <Marker
                title="Your Location"
                coordinate={marketLocation}
                draggable
                onDragStart={(e) => onHandleMarkerDragStart(e)}
              />
            )}
          </MapView>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              backgroundColor: "gray",
              padding: 10,
              borderRadius: 5,
            }}
            onPress={onHandleConfirm}
          >
            <Text style={{ color: "black" }}>{`Confirmar`}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default MapMarketBusiness;
