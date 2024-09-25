import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  Platform,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import styles from "@/utils/styles/FavoritePage.js";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Foundation,
  EvilIcons,
  Feather,
  Entypo,
  MaterialIcons,
  Octicons,
  Ionicons,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import * as customSearch from "@/graphql/CustomQueries/Search";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ModalAlert from "@/components/ModalAlert";
import Swiper from "react-native-swiper";
import SkeletonExample from "@/components/SkeletonExample";
import { useRecoilState } from "recoil";
import { updateListFavorites } from "@/atoms";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { useRef } from "react";
import ModalReport from "@/components/ModalReport";
import { registerEvent } from "@/functions/Analytics";
// recoil
import { useRecoilValue } from "recoil";
import { userAuthenticated, mapUser } from "@/atoms/index";
// storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ZoomableImage from "@/components/ZoomableImage";
const FavoritePage = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const userAuth = useRecoilValue(userAuthenticated);
  const userLocation = useRecoilValue(mapUser);
  const timerRef = useRef();
  const [post, setPost] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [listUpdate, setListUpdate] = useRecoilState(updateListFavorites);
  const [imageView, setImageView] = useState(null);
  const [dimensionsImages, setDimensionsImages] = useState(0);
  const [open, setOpen] = useState(false);
  const [weekSchedule, setWeekSchedule] = useState("");
  const [listRatings, setListRatings] = useState(null);
  const [ratingsDetails, setRatingsDetails] = useState(null);
  const [countryCity, setCountryCity] = useState(null);

  const {
    data: { item, image },
  } = route.params;
  let schedule = JSON.parse(item.business?.schedule);
  const filterSchedule = (array, type) => {
    if (array === null || type === null) return;
    // return;
    let scheduleG = [];
    let activeDays = array.filter((day) => day.active);

    for (let i = 0; i < activeDays.length; i++) {
      if (
        i === 0 ||
        activeDays[i].hourStart !== activeDays[i - 1].hourStart ||
        activeDays[i].hourEnd !== activeDays[i - 1].hourEnd
      ) {
        scheduleG.push({
          days: [activeDays[i].name],
          hourStart: activeDays[i].hourStart,
          hourEnd: activeDays[i].hourEnd,
        });
      } else {
        scheduleG[scheduleG.length - 1].days.push(activeDays[i].name);
      }
    }

    let pContent = scheduleG
      .map((group) => {
        let days = group.days;
        if (days.length > 2) {
          let consecutive = true;
          for (let i = 1; i < days.length; i++) {
            if (
              array.findIndex((day) => day.name === days[i]) !==
              array.findIndex((day) => day.name === days[i - 1]) + 1
            ) {
              consecutive = false;
              break;
            }
          }
          if (consecutive) {
            days = [days[0], "a", days[days.length - 1]];
          } else {
            days = days.join(" - ");
          }
        } else if (days.length === 2) {
          days = [days[0], "y", days[1]];
        }
        return `${Array.isArray(days) ? days.join(" ") : days}: ${
          group.hourStart
        } - ${group.hourEnd}`;
      })
      .join(" / ");

    setWeekSchedule(pContent);
  };
  const actividad = JSON.parse(item.business.activity);
  const list = item?.business?.images
    .map((image) => JSON.parse(image))
    .sort((a, b) => a.key - b.key);

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.changed[0].isViewable)
      setDimensionsImages(viewableItems.changed[0].item.key);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 20 });

  const getPdf = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    const api = "api-professions-gateway";
    const path = "/documentqr";
    const params = {
      headers: {},
      queryStringParameters: {
        path: `https://www.portaty.com/share/business?id=${item.businessID}`,
      },
    };

    try {
      const response = await API.get(api, path, params);
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        "qr.pdf",
        "application/pdf"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, response["pdf_base64"], {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => {});
    } catch (error) {
      console.log("Error en pdf: ", error.message);
    }
  };
  const fetchData = async () => {
    try {
      const business = await API.graphql({
        query: customSearch.getBusinessFavorites,
        variables: {
          id: item.businessID,
        },
        authMode: "AWS_IAM",
      });
      setListUpdate(false);
      setPost(business.data.getBusiness);
    } catch (error) {
      console.log("eres tu", error);
    }
  };

  const fetchRatings = async ({ data }) => {
    let business = item;
    try {
      const fetchAllRatings = async (nextToken, result = []) => {
        const response = await API.graphql({
          query: queries.businessCommentsByBusinessID,
          authMode: "AWS_IAM",
          variables: {
            businessID: business?.businessID,
            nextToken,
          },
        });

        const items = response.data.businessCommentsByBusinessID.items;
        result.push(...items);

        if (response.data.businessCommentsByBusinessID.nextToken) {
          return fetchAllRatings(
            response.data.businessCommentsByBusinessID.nextToken,
            result
          );
        }

        return result;
      };

      const allRatings = await fetchAllRatings();
      setListRatings(allRatings);
    } catch (error) {
      console.log("eres tu", error);
    }
  };
  const fetchRatings2 = async () => {
    let business = item;
    try {
      const api = "api-portaty";
      const path = "/business/ratings";
      const params = {
        headers: {},
        queryStringParameters: {
          businessID: business.businessID,
        },
      };

      const response = await API.get(api, path, params);
      setRatingsDetails(response.data);
    } catch (error) {}
  };
  const onDeleteFavorite = async () => {
    Alert.alert(
      "Eliminar de favoritos",
      "¿Estás seguro de que quieres continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            const favorites = await API.graphql({
              query: customFavorites.deleteFavorites,
              variables: {
                input: {
                  id: item.id,
                },
              },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            const { country, city } = countryCity;
            registerEvent("user_remove_business", {
              userid: userAuth?.attributes["custom:userTableID"],
              businessid: item.businessID,
              birthdate: userAuth?.attributes?.birthdate,
              gender: userAuth?.attributes["custom:gender"],
              country,
              city,
            });
            setListUpdate(!listUpdate);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onOpenMap = (lat, lng, name) => {
    let url = "";
    if (Platform.OS === "android") {
      url = `geo:${lat},${lng}?q=${lat},${lng}(${name})`;
    } else {
      url = `maps://app?saddr=${lat},${lng}&daddr=${lat},${lng}&q=${lat},${lng}(${name})`;
    }
    Linking.openURL(url);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Han compartido contigo un negocio, da click para mirarlo https://www.portaty.com/share/business?id=${item.businessID}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };
  const openCall = () => {
    const url = `tel://${item.business.phone}`;
    Linking.openURL(url);
  };

  const getCatalogPDF = async () => {
    try {
      const url = item?.catalogpdf;
      Linking.openURL(url);
    } catch (error) {
      console.log("Error en catalogo: ", error);
    }
  };
  const registerViewBusiness = async (userID = null, businessID) => {
    // Obtener el identificador único del dispositivo
    try {
      // Obtener información de la última visualización guardada en AsyncStorage
      const lastViewString = await AsyncStorage.getItem(
        `lastView_${businessID}`
      );
      const lastViewInfo = JSON.parse(lastViewString);

      // Si hay una última visualización registrada y ocurrió hace menos de 24 horas, no registra la nueva visualización
      if (
        lastViewInfo &&
        new Date() - new Date(lastViewInfo.timestamp) < 24 * 60 * 60 * 1000 &&
        lastViewInfo.businessID === businessID
      ) {
        return;
      }

      // Registrar la visualización en analytics
      const { country, city } = countryCity;
      let params = {
        country,
        city,
        businessid: businessID,
      };

      if (userID) {
        params = {
          userid: userID,
          birthdate: userAuth?.attributes?.birthdate,
          gender: userAuth?.attributes["custom:gender"],
          ...params,
        };
      }

      registerEvent(
        userID ? "user_viewed_business" : "guest_viewed_business",
        params
      );
      // Almacenar la información de la última visualización en AsyncStorage
      const currentViewInfo = {
        businessID: businessID,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem(
        `lastView_${businessID}`,
        JSON.stringify(currentViewInfo)
      );
    } catch (error) {
      console.log("Error al registrar analitica: ", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
    fetchRatings(item);
    fetchRatings2();
    if (schedule !== null) filterSchedule(schedule?.shedule, schedule?.type);
  }, [listUpdate]);
  useEffect(() => {
    const registerCountryCity = async () => {
      const addressArr = await Location.reverseGeocodeAsync(userLocation);
      setCountryCity(addressArr[0]);
    };
    if (userLocation) registerCountryCity();
  }, [userLocation]);

  useEffect(() => {
    if (countryCity) {
      timerRef.current = setTimeout(() => {
        registerViewBusiness(
          userAuth ? userAuth?.attributes["custom:userTableID"] : null,
          item.businessID
        );
      }, 3000);
    }
    return () => clearTimeout(timerRef.current);
  }, [countryCity]);
  if (!item || !listRatings || listUpdate) return <SkeletonExample />;
  return (
    <View
      style={[
        {
          flex: 1,
        },
        global.bgWhite,
      ]}
    >
      <ScrollView style={{ flex: 1, marginTop: 30 }}>
        <View
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              width: 320,
              height: 250,
              position: "relative",
            },
          ]}
        >
          {list.length !== 1 &&
            dimensionsImages + 1 > 1 &&
            dimensionsImages <= 3 && (
              <View
                style={[
                  global.bgYellow,
                  {
                    width: 25,
                    height: 25,
                    position: "absolute",
                    zIndex: 10,
                    left: 0,
                    top: "50%",
                    opacity: 0.85,
                    borderRadius: 5,
                  },
                ]}
              >
                <Entypo name="triangle-left" size={24} color="#1f1f1f" />
              </View>
            )}
          {list.length !== 1 &&
            dimensionsImages >= 0 &&
            dimensionsImages < list.length - 1 && (
              <View
                style={[
                  global.bgYellow,
                  {
                    width: 25,
                    height: 25,
                    position: "absolute",
                    zIndex: 10,
                    top: "50%",
                    right: 0,
                    opacity: 0.85,
                    borderRadius: 5,
                  },
                ]}
              >
                <Entypo name="triangle-right" size={24} color="#1f1f1f" />
              </View>
            )}
          <FlatList
            horizontal
            data={list}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  width: 320,
                  height: 250,
                }}
              >
                <Pressable
                  onPress={() => {
                    setOpen(!open);
                    setImageView(item);
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                      borderRadius: 5,
                      backgroundColor: "#fff",
                      borderWidth: 0.7,
                      borderColor: "#1f1f1f",
                    }}
                    source={{ uri: item.url }}
                  />
                </Pressable>

                <TouchableOpacity
                  style={[
                    {
                      flexDirection: "row",
                      padding: 8,
                      borderRadius: 5,
                      opacity: 0.7,
                      alignItems: "center",
                      marginBottom: 5,
                      position: "absolute",
                      right: 0,
                      borderWidth: 0.8,
                      borderColor: "#1f1f1f",
                    },
                    global.bgYellow,
                  ]}
                  onPress={() => {
                    setOpen(!open);
                    setImageView(item);
                  }}
                >
                  <Text
                    style={[
                      { fontFamily: "medium", fontSize: 17 },
                      global.black,
                    ]}
                  >
                    {item.key + 1}/{list.length}
                  </Text>
                  <MaterialCommunityIcons
                    name="image-search-outline"
                    size={18}
                    color="#1f1f1f"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 16,
                  marginRight: 3,
                }}
              >
                {ratingsDetails?.average}
              </Text>
              <Ionicons name="star" size={16} color="#ffb703" />
            </View>

            <Text
              style={{
                fontFamily: "lightItalic",
                fontSize: 12,
              }}
            >
              {ratingsDetails?.ratings_message}
            </Text>
          </View>
          {/* Pa despues */}
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 25,
            }}
          >
            <MaterialCommunityIcons name="medal" size={20} color="#ffb703" />
            <Text
              style={{
                fontFamily: "lightItalic",
                fontSize: 12,
              }}
            >
              Nº 14 en Turismo
            </Text>
          </View> */}
        </View>

        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            paddingHorizontal: 100,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontFamily: "medium" }}>
              {post.favorites?.items.length}
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "light" }}>Favoritos</Text>
          </View>
          <TouchableOpacity onPress={onDeleteFavorite}>
            <Image
              style={{
                width: 45,
                height: 45,
                resizeMode: "cover",
                borderWidth: 0.8,
                borderColor: "#1f1f1f",
                borderRadius: 50,
              }}
              source={require("@/utils/images/sifavorites.png")}
            />
            {/* <MaterialIcons name="favorite" size={45} color="red" /> */}
          </TouchableOpacity>
        </View>
        {/* Reporte */}
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 20,
            paddingBottom: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setVisible(true)}
        >
          <MaterialIcons name="report" size={16} color="black" />
          <Text
            style={[
              global.black,
              {
                fontFamily: "bold",
                fontSize: 10,
                // marginLeft: 2,
                // marginBottom: 3
              },
            ]}
          >
            Reportar negocio
          </Text>
        </TouchableOpacity>
        {/* Hasta aqui */}

        <View style={[styles.line, global.bgMidGray]} />

        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "regular" }}>
            Horario comercial
          </Text>
          {schedule !== null ? (
            <View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  marginTop: 5,
                  lineHeight: 25,
                  textAlign: "center",
                }}
              >
                {schedule.type}
              </Text>
              <Text
                style={{
                  fontFamily: "light",
                  fontSize: 15,
                  lineHeight: 25,
                  textAlign: "center",
                }}
              >
                {weekSchedule}
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 18,
                  marginTop: 8,
                  textAlign: "center",
                  marginBottom: -10,
                }}
              >
                {`No definido`}
              </Text>
            </View>
          )}
        </View>

        {/* Interactions */}
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
          onPress={() => {
            navigation.navigate("InteractionsFavorites", {
              business: item,
              list: listRatings,
            });
          }}
        >
          <View
            style={{
              borderWidth: 0.6,
              borderColor: "#1f1f1f",
              height: listRatings.length !== 0 ? 130 : 60,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: 13,
                }}
              >
                Este negocio tiene {listRatings.length} reseña(s)
              </Text>
            </View>
            {listRatings.length !== 0 && (
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#efeded",
                  padding: 5,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 13,
                      marginRight: 3,
                    }}
                  >
                    {listRatings[0]?.stars} de 5
                  </Text>
                  <Ionicons name="star" size={12} color="#ffb703" />
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: 12,
                      marginLeft: 5,
                    }}
                  >
                    {listRatings[0]?.user?.name}{" "}
                    {listRatings[0]?.user?.lastName}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 13,
                  }}
                >
                  {listRatings[0]?.description}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "mediumItalic",
                  fontSize: 12,
                  marginRight: 3,
                }}
              >
                {listRatings.length !== 0
                  ? "Ver todas las reseñas"
                  : "Publicar una reseña"}
              </Text>
              <AntDesign name="arrowright" size={13} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() =>
            onOpenMap(
              item.business.coordinates.lat,
              item.business.coordinates.lon,
              item.business.name
            )
          }
        >
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 40,
              borderWidth: 0.7,
              borderColor: "#1f1f1f",
            }}
          >
            <MapView
              style={{
                width: "100%",
                height: 220,
              }}
              scrollEnabled={false}
              initialRegion={{
                latitude: item.business.coordinates.lat,
                longitude: item.business.coordinates.lon,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: item.business.coordinates.lat,
                  longitude: item.business.coordinates.lon,
                }}
                title={item.business.name}
              />
            </MapView>
          </View>
        </TouchableOpacity>

        {/*  */}
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -53,
          }}
          onPress={onShare}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[
                {
                  width: 58,
                  height: 58,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 0.7,
                  borderColor: "#1f1f1f",
                },
                global.bgYellow,
              ]}
            >
              <EvilIcons name="share-google" size={33} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                Compartir
              </Text>
              <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                Compartelo con tus amigos y familiares
              </Text>
            </View>
          </View>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
            source={require("@/utils/images/arrow_right.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -27,
          }}
          onPress={openCall}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[
                {
                  width: 58,
                  height: 58,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 0.7,
                  borderColor: "#1f1f1f",
                },
                global.bgYellow,
              ]}
            >
              <Feather name="phone-call" size={20} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>Llamar</Text>
              <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                Contacta al negocio directamente
              </Text>
            </View>
          </View>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
            source={require("@/utils/images/arrow_right.png")}
          />
        </TouchableOpacity>

        {/* Catalogo */}
        {item?.catalogpdf !== "" ||
          (item?.catalogpdf && (
            <TouchableOpacity
              style={{
                padding: 20,
                marginTop: -25,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={getCatalogPDF}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[
                    {
                      width: 58,
                      height: 58,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "#1f1f1f",
                      borderWidth: 0.7,
                    },
                    global.bgYellow,
                  ]}
                >
                  <Octicons name="checklist" size={21} color="#1f1f1f" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                    Catalogo
                  </Text>
                  <Text
                    style={{ fontFamily: "regular", fontSize: 12, width: 150 }}
                  >
                    Mira la lista de productos y servicios del negocio
                  </Text>
                </View>
              </View>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "cover",
                }}
                source={require("@/utils/images/arrow_right.png")}
              />
            </TouchableOpacity>
          ))}

        <View style={{ marginBottom: 80 }}>
          <Text style={{ fontSize: 22, fontFamily: "regular", padding: 10 }}>
            Datos
          </Text>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Foundation name="torso-business" size={22} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Nombre
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.business.name}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FontAwesome5 name="store" size={16} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Area
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    // textTransform: "capitalize",
                  },
                ]}
              >
                {actividad.main}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FontAwesome5 name="store" size={16} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Actividad
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    // textTransform: "capitalize",
                  },
                ]}
              >
                {actividad.sub}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FontAwesome5 name="store" size={16} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Descripcion
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={[
                  {
                    width: 200,
                    fontSize: 13,
                    fontFamily: "regular",
                    textAlign: "right",
                  },
                ]}
              >
                {item.business.description}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FontAwesome name="phone" size={20} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Telefono
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.business.phone}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FontAwesome name="whatsapp" size={22} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                WhatsApp
              </Text>
            </View>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                let isWhatsAppLink =
                  item?.business?.phone.startsWith("https://wa.me/") ||
                  item?.business?.phone.startsWith(
                    "https://api.whatsapp.com/send?text="
                  );
                if (isWhatsAppLink) {
                  const url = `${item?.business?.phone}`;
                  Linking.openURL(url);
                } else {
                  const phoneRegex = item?.business?.phone.replace("+", "");
                  const url = `https://wa.me/${phoneRegex}`;
                  Linking.openURL(url);
                }
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    marginRight: 5,
                    color: "blue",
                  },
                ]}
              >
                {"Ir al WhatsApp"}
              </Text>
              <Feather name="external-link" size={16} color="blue" />
            </Pressable>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <MaterialCommunityIcons
                name="email-open-multiple-outline"
                size={20}
                color="#1f1f1f"
              /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Correo
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.business.email}
              </Text>
            </View>
          </View>
          {/* <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="web" size={24} color="#1f1f1f" />
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Web
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  { fontSize: 13, fontFamily: "regular", marginRight: 5 },
                ]}
              >
                Link
              </Text>
              <AntDesign name="link" size={16} color="#1f1f1f" />
            </View>
          </View> */}
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FontAwesome name="instagram" size={24} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Instagram
              </Text>
            </View>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                if (
                  item.business?.instagram === "" ||
                  item.business?.instagram === null
                )
                  return;
                const url = `https://www.instagram.com/${item.business?.instagram}`;
                Linking.openURL(url);
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    marginRight: 5,
                    color:
                      item.business?.instagram === "" ||
                      item.business?.instagram === null
                        ? "#1f1f1f"
                        : "blue",
                  },
                ]}
              >
                {item.business?.instagram === "" ||
                item.business?.instagram === null
                  ? "No"
                  : item.business?.instagram}
              </Text>
              {item.business?.instagram === "" ||
              item.business?.instagram === null ? (
                ""
              ) : (
                <Feather name="external-link" size={16} color="#1f1f1f" />
              )}
            </Pressable>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FontAwesome name="facebook-square" size={24} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 13 },
                  global.black,
                ]}
              >
                Facebook
              </Text>
            </View>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                if (
                  item.business?.facebook === "" ||
                  item.business?.facebook === null
                )
                  return;
                const url = `https://www.facebook.com/${item.business?.facebook}`;
                Linking.openURL(url);
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    marginRight: 5,
                    color:
                      item.business?.facebook === "" ||
                      item.business?.facebook === null
                        ? "#1f1f1f"
                        : "blue",
                  },
                ]}
              >
                {item.business?.facebook === "" ||
                item.business?.facebook === null
                  ? "No"
                  : item.business?.facebook}
              </Text>
              {item.business?.facebook === "" ||
              item.business?.facebook === null ? (
                ""
              ) : (
                <Feather name="external-link" size={16} color="blue" />
              )}
            </Pressable>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={open}
          onRequestClose={() => {
            setOpen(!open);
            setImageView(null);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setOpen(!open);
              setImageView(null);
            }}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                  <View style={[styles.modalContent]}>
                    <View style={styles.modalTop}>
                      <Pressable
                        onPress={() => {
                          setOpen(!open);
                          setImageView(null);
                        }}
                      >
                        <Image
                          style={{
                            width: 35,
                            height: 35,
                            resizeMode: "contain",
                          }}
                          source={require("@/utils/images/arrow_back.png")}
                        />
                      </Pressable>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          backgroundColor: "#fff",
                          height: 450,
                        }}
                      >
                        <ZoomableImage
                          uri={imageView?.url ? imageView?.url : imageView?.uri}
                          imageHeigth={450}
                        />
                      </View>
                      {imageView?.url && (
                        <View style={{ flex: 1, paddingVertical: 15 }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              borderColor: "#1f1f1f",
                              borderWidth: 0.7,
                              paddingHorizontal: 10,
                              borderRadius: 8,
                              marginTop: 10,
                            }}
                          >
                            {imageView?.key === 0 ? (
                              <TextInput
                                value={
                                  imageView?.description !== ""
                                    ? imageView?.description
                                    : item.business.description
                                }
                                editable={false}
                                style={{
                                  flex: 1,
                                  // width: 100,
                                  fontFamily: "regular",
                                  fontSize: 14,
                                  alignItems: "flex-start",
                                  color: "#000",
                                }}
                                multiline={true}
                                numberOfLines={5}
                              />
                            ) : (
                              <TextInput
                                value={imageView?.description}
                                editable={false}
                                style={{
                                  flex: 1,
                                  // width: 100,
                                  fontFamily: "regular",
                                  fontSize: 14,
                                  alignItems: "flex-start",
                                  color: "#000",
                                }}
                                multiline={true}
                                numberOfLines={5}
                              />
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </GestureHandlerRootView>
          </TouchableWithoutFeedback>
        </Modal>
        {/* <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{ marginBottom: 100 }}
        >
          <Text>Modal</Text>
        </TouchableOpacity> */}
        <ModalReport
          businessID={item.businessID}
          close={() => setVisible(false)}
          open={visible}
        />
      </ScrollView>
    </View>
  );
};

export default FavoritePage;
