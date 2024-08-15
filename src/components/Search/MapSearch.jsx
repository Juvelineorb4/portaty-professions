import { View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "@/utils/styles/MapSearch.js";

const MapSearh = ({ initialLocation, markers }) => {
  const global = require("@/utils/styles/global.js");
  const [coords, setCoords] = useState(null);
  const [region, setRegion] = useState({
    latitude: initialLocation?.latitude,
    longitude: initialLocation?.longitude,
    latitudeDelta: 0.018,
    longitudeDelta: 0.018,
  });
  let mapRef = useRef(null);
  const getMarkers = () => {
    let mapsMarkers = [];
    markers.map((item, index) => {
      for (let i = 0; i < item.length; i++) {
        let cut = item[i].coordinates;
        let mark = { latitude: cut.lat, longitude: cut.lon };
        mapsMarkers.push(mark);
      }
    });
    setCoords(mapsMarkers);
  };
  useEffect(() => {
    getMarkers();
  }, []);
  if (coords)
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ flex: 1 }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              showsUserLocation
              ref={mapRef}
              region={region}
            >
              {coords.map((coord, index) => (
                <Marker key={index} coordinate={coord} />
              ))}
            </MapView>
          </View>
        </View>
      </View>
    );
};

export default MapSearh;
