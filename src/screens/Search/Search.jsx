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
} from "react-native";
import React, { useEffect, useState } from "react";
import GridSearch from "@/components/Search/GridSearch";
import * as customSearch from "@/graphql/CustomQueries/Search";
import { Auth, API, Storage } from "aws-amplify";
import Slider from "@react-native-community/slider";
import styles from "@/utils/styles/Tags.module.css";
import { mapUser, searchStatus, searchCache, kmRadio, totalSearch } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Location from "expo-location";
import * as queries from "@/graphql/CustomQueries/Favorites";

const Search = ({ route }) => {
  const global = require("@/utils/styles/global.js");
  const [moreItems, setMoreItems] = useState(1);
  const [items, setItems] = useState([]);
  const [searchActive, setSearchActive] = useRecoilState(searchStatus);
  const [searchCacheActive, setSearchCacheActive] = useRecoilState(searchCache);
  const [totalData, setTotalData] = useRecoilState(totalSearch);
  const [totalLimit, setTotalLimit] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [filterRadio, setFilterRadio] = useRecoilState(kmRadio);
  const location = useRecoilValue(mapUser);
  let number = 26 * moreItems;
  const getData = async () => {
    const api = "api-professions-gateway";
    const path = "/searchBusinessByDistance";
    const params = {
      headers: {},
      queryStringParameters: {
        location: JSON.stringify({
          lat: location.latitude,
          lon: location.longitude,
        }),
        km: filterRadio,
        from: 0,
        limit: number,
      },
    };
    try {
      const response = await API.get(api, path, params);
      setTotalData(response.total);
      setTotalLimit(response.limit);
      // let newItems = [];
      let newRenderItems = [];
      const long = 26;
      // const { attributes } = await Auth.currentAuthenticatedUser();

      // for (let i = 0; i < response.items.length; i += 1) {
      //   try {
      //     let result = await API.graphql({
      //       query: queries.favoritesByBusinessID,
      //       authMode: "AMAZON_COGNITO_USER_POOLS",
      //       variables: {
      //         businessID: response.items[i].id,
      //         userID: {eq: attributes["custom:userTableID"]},
      //       },
      //     });

      //     if (result.data.favoritesByBusinessID.items.length !== 0) {
      //       newItems.push({
      //         favorite: result.data.favoritesByBusinessID.items[0].id,
      //         item: response.items[i],
      //       });
      //     } else {
      //       newItems.push({
      //         favorite: "",
      //         item: response.items[i],
      //       });
      //     }
      //   } catch (error) {
      //     // console.log(error)
      //   }
      // }
      for (let i = 0; i < response.items.length; i += long) {
        let cut = response.items.slice(i, i + long);
        newRenderItems.push(cut);
      }
      setSearchActive(true);
      setSearchCacheActive(newRenderItems);
      return setItems(newRenderItems);
    } catch (error) {
      return console.log(error);
    }
  };
  const getFilterData = async () => {
    setStatusFilter(true);
    getData();
    setTimeout(() => {
      setStatusFilter(false);
    }, 3000);
  };
  useEffect(() => {
    getData();
  }, [moreItems]);

  if (searchActive) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingBottom: 50 }}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
                fontFamily: "light",
              }}
            >
              Tienes {totalData} negocios cerca de ti
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("@/utils/images/editcard.png")}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "thinItalic",
                }}
              >
                Filtrar
              </Text>
            </View>
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
                  <Text style={styles.modalText}>{`Filtra tu busqueda`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={styles.modalText}
                  >{`La distancia de tu radio son: ${filterRadio} km`}</Text>
                  <Slider
                    style={{ height: 100 }}
                    minimumValue={1}
                    maximumValue={100}
                    onValueChange={(e) => setFilterRadio(e)}
                    step={1}
                    minimumTrackTintColor="#fb8500"
                    maximumTrackTintColor="#1f1f1f"
                    thumbTintColor="#fb8500"
                    value={filterRadio}
                  />
                  <Text
                    style={styles.modalText}
                  >{`La distancia esta reflejada en un radio de kilometros`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={[
                      global.mainBgColor,
                      {
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 49,
                        marginTop: 80,
                      },
                    ]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      getFilterData();
                    }}
                  >
                    <Text
                      style={[
                        global.white,
                        { fontFamily: "medium", fontSize: 14 },
                      ]}
                    >
                      {`Buscar`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        {statusFilter ? (
          <View
            style={[
              { flex: 1, alignItems: "center", justifyContent: "center" },
              global.bgWhite,
            ]}
          >
            <ActivityIndicator size="large" color="#fb8500" />
          </View>
        ) : ( searchActive ?  <FlatList
          data={searchCacheActive}
          renderItem={({ item, index }) => (
            <GridSearch renderItems={item} more={index} />
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
              {totalData === totalLimit && (
                <Text style={{ fontFamily: "light", fontSize: 14 }}>
                  No hay mas negocios por mostrar
                </Text>
              )}
            </View>
          )}
          onEndReached={() => {
            if (totalData > totalLimit) setMoreItems(moreItems + 1);
          }}
          onEndReachedThreshold={0}
        /> :
          items.length !== 0 && (
            <FlatList
              data={items}
              renderItem={({ item, index }) => (
                <GridSearch renderItems={item} more={index} />
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
                  {totalData === totalLimit && (
                    <Text style={{ fontFamily: "light", fontSize: 14 }}>
                      No hay mas negocios por mostrar
                    </Text>
                  )}
                </View>
              )}
              onEndReached={() => {
                if (totalData > totalLimit) setMoreItems(moreItems + 1);
              }}
              onEndReachedThreshold={0}
            />
          )
        )}
      </View>
    );
  } else {
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <ActivityIndicator size="large" color="#fb8500" />
      </View>
    );
  }
};

export default Search;
