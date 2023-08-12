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
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import styles from "@/utils/styles/MapMarket.module.css";
import { mapBusiness } from "@/atoms";
import { useRecoilState } from "recoil";

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
  const global = require("@/utils/styles/global.js");
  const [marketLocation, setMarketLocation] = useState(null);
  const [initalMarketLocation, setInitialMarketLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectMap, setSelectMap] = useState(false);
  const [selectMapBusiness, setSelectMapBusiness] = useRecoilState(mapBusiness);
  let mapRef = useRef(null);

  // useEffect(() => {
  //   // (async () => {
  //   //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   //   if (status !== "granted") {
  //   //     setErrorMsg("Permission to access location was denied");
  //   //     return;
  //   //   }
  //   //   let location = await Location.getCurrentPositionAsync({
  //   //     accuracy: Location.Accuracy.BestForNavigation,
  //   //   });
  //   //   console.log(location.coords)
  //   //   setUserLocation(location.coords);
  //   //   setMarketLocation({
  //   //     latitude: location.coords.latitude,
  //   //     longitude: location.coords.longitude,
  //   //   });
  //   // })();
  // }, []);
  const onHandleMapMarket = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    // console.log(location.coords);
    // setUserLocation(location.coords);
    // setMarketLocation({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    // });
    setModalVisible(!modalVisible);
  };
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
    setMarketLocation(coordinate);
    setSelectMapBusiness(coordinate)
    setSelectMap(true);
  };

  const onHandleConfirm = () => {
    console.log(selectMapBusiness);
    setSelectMap(true);
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    console.log(selectMapBusiness);
  }, []);

  return (
    <ScrollView
      style={[global.bgWhite, { flex: 1 }]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <TouchableOpacity onPress={() => onHandleMapMarket()} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 5}}>
          <View style={[global.mainBgColor, {
            height: 50,
            width: 110,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginRight: 35
          }]}>
            <Text style={[global.white, {
              fontFamily: 'medium',
              fontSize: 13
            }]}>Abrir mapa</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {selectMap ? (
              <Text
                style={styles.textTag}
              >{`Tu ubicacion se agrego exitosamente!`}</Text>
            ) : (
              <Text
                style={styles.textInputTag}
              >{`Selecciona una ubicacion`}</Text>
            )}
          </View>

          <Modal animationType="none" transparent={true} visible={modalVisible}>
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
                        width: 25,
                        height: 25,
                        resizeMode: "contain",
                      }}
                      source={require("@/utils/images/arrow_back.png")}
                    />
                  </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                  <MapView
                    style={{ flex: 1 }}
                    showsUserLocation={modalVisible}
                    ref={mapRef}
                    // initialRegion={{
                    //   latitude: userLocation.latitude,
                    //   longitude: userLocation.longitude,
                    //   latitudeDelta: 0.001,
                    //   longitudeDelta: 0.001,
                    // }}
                    showsPointsOfInterest={false}
                    onDoublePress={onHandlePress}
                    customMapStyle={MAP_SETTINGS}
                  >
                    {marketLocation && (
                      <Marker
                        title="Ubicacion de tu negocion"
                        coordinate={marketLocation}
                        draggable
                        onDragStart={(e) => onHandleMarkerDragStart(e)}
                        onDragEnd={onHandleMarketMove}
                      />
                    )}
                  </MapView>
                  <TouchableOpacity
                    style={[
                      {
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        borderRadius: 5,
                      },
                      global.mainBgColor,
                    ]}
                    onPress={onHandleConfirm}
                  >
                    <Text
                      style={[global.white, { fontFamily: "light" }]}
                    >{`Confirmar`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MapMarketBusiness;
