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

const COUNTRY_REGION = {
  // colombia
  latitude: 4.5709,
  longitude: -74.2973,
  latitudeDelta: 10, // Ajusta este valor según tus necesidades
  longitudeDelta: 10, // Ajusta este valor según tus necesidades
};

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [marketLocation, setMarketLocation] = useState(null);
  const [initalMarketLocation, setInitialMarketLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let mapRef = useRef(null);


  // const onHandleMarketMove = (e) => {
  //   let {
  //     nativeEvent: { coordinate },
  //   } = e;
  //   // comentar para pruebas
  //   // const isInsideColombiaRegion =
  //   //   coordinate.latitude >=
  //   //     COUNTRY_REGION.latitude - COUNTRY_REGION.latitudeDelta / 2 &&
  //   //   coordinate.latitude <=
  //   //     COUNTRY_REGION.latitude + COUNTRY_REGION.latitudeDelta / 2 &&
  //   //   coordinate.longitude >=
  //   //     COUNTRY_REGION.longitude - COUNTRY_REGION.longitudeDelta / 2 &&
  //   //   coordinate.longitude <=
  //   //     COUNTRY_REGION.longitude + COUNTRY_REGION.longitudeDelta / 2;
  //   setMarketLocation(coordinate);
  // };

  const onHandleMarkerDragStart = (e) => {
    let {
      nativeEvent: { coordinate },
    } = e;
    setInitialMarketLocation(coordinate);
  };

  const onHandleConfirm = () => {
    console.log(marketLocation);
  };
  
  useEffect(() => {
    (async () => {
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
    })();
  }, []);
  return (
    <View style={styles.container}>
      {userLocation && (
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
            <Text style={{ color: "black" }}>{`Confirmar >`}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
