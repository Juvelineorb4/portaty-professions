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
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import styles from "@/utils/styles/MapMarket.module.css";
import { mapBusiness } from "@/atoms";
import { useRecoilState } from "recoil";
// hook form
import { Controller } from "react-hook-form";

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

const MapMarketBusiness = ({
  initialLocation,
  control,
  name,
  text,
  placeholder,
  rules = {},
}) => {
  const global = require("@/utils/styles/global.js");
  const [marketLocation, setMarketLocation] = useState(null);
  const [initalMarketLocation, setInitialMarketLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectMap, setSelectMap] = useState(false);
  const [selectMapBusiness, setSelectMapBusiness] = useRecoilState(mapBusiness);
  let mapRef = useRef(null);
  const onHandleMapMarket = async () => {
    setModalVisible(!modalVisible);
  };
  const onHandleMarketMove = (e) => {
    let {
      nativeEvent: { coordinate },
    } = e;
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
    setSelectMapBusiness(coordinate);
    setSelectMap(true);
  };

  const onHandleConfirm = () => {
    setSelectMap(true);
    setModalVisible(!modalVisible);
  };
  useEffect(() => {}, []);

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
                  global.mainBgColor,
                  {
                    height: 50,
                    width: 110,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    marginRight: 35,
                  },
                ]}
              >
                <Text
                  style={[
                    global.white,
                    {
                      fontFamily: "medium",
                      fontSize: 13,
                    },
                  ]}
                >
                  Abrir mapa
                </Text>
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
            </TouchableOpacity>
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
            >
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
                      provider={PROVIDER_GOOGLE}
                      style={{ flex: 1 }}
                      showsUserLocation={modalVisible}
                      ref={mapRef}
                      initialRegion={{
                        latitude: initialLocation.latitude,
                        longitude: initialLocation.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                      }}
                      showsPointsOfInterest={false}
                      onDoublePress={(e) => {
                        onHandlePress(e);
                        onChange(e.nativeEvent.coordinate);
                      }}
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
            {error && (
              <Text style={{ color: "red" }}>
                No has Selecciona la Ubicacion de tu Negocio
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    />
  );
};

export default MapMarketBusiness;
