import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

const COUNTRY_REGION = {
  // colombia
  latitude: 4.5709,
  longitude: -74.2973,
  latitudeDelta: 10, // Ajusta este valor según tus necesidades
  longitudeDelta: 10, // Ajusta este valor según tus necesidades
};

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

const MapMarketBusiness = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [marketLocation, setMarketLocation] = useState(null);
  const [initalMarketLocation, setInitialMarketLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let mapRef = useRef(null);

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    setUserLocation(location.coords);
    setMarketLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const onHandleMarketMove = (e) => {
    let {
      nativeEvent: { coordinate },
    } = e;
    // comentar para pruebas
    // const isInsideColombiaRegion =
    //   coordinate.latitude >=
    //     COUNTRY_REGION.latitude - COUNTRY_REGION.latitudeDelta / 2 &&
    //   coordinate.latitude <=
    //     COUNTRY_REGION.latitude + COUNTRY_REGION.latitudeDelta / 2 &&
    //   coordinate.longitude >=
    //     COUNTRY_REGION.longitude - COUNTRY_REGION.longitudeDelta / 2 &&
    //   coordinate.longitude <=
    //     COUNTRY_REGION.longitude + COUNTRY_REGION.longitudeDelta / 2;

    if (true) {
      console.log("ESTA EN COLOMBIA");
      setMarketLocation(coordinate);
    } else {
      console.log("NO ESTA EN COLOMBIA");
      setMarketLocation(initalMarketLocation);
    }
  };

  const onHandleMarkerDragStart = (e) => {
    let {
      nativeEvent: { coordinate },
    } = e;
    setInitialMarketLocation(coordinate);
  };

  const onHandlePress = (e) => {
    const {
      nativeEvent: { coordinate },
    } = e;
    console.log(coordinate);
    setMarketLocation(coordinate);
  };

  const onHandleConfirm = () => {
    console.log(marketLocation);
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <>
          <MapView
            style={{ flex: 1 }}
            showsUserLocation={true}
            ref={mapRef}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            showsPointsOfInterest={false}
            onDoublePress={onHandlePress}
            customMapStyle={MAP_SETTINGS}
          >
            {marketLocation && (
              <Marker
                title="Your Location"
                coordinate={marketLocation}
                draggable
                onDragStart={(e) => onHandleMarkerDragStart(e)}
                onDragEnd={onHandleMarketMove}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapMarketBusiness;
