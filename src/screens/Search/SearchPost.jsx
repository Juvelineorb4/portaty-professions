import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
  Linking,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as customSearch from "@/graphql/CustomQueries/Search";
import styles from "@/utils/styles/SearchPost.js";
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
  Feather,
  Entypo,
  MaterialIcons,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { Auth, API, Analytics } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import MapView, { Marker } from "react-native-maps";
import SkeletonExample from "@/components/SkeletonExample";
import { useRecoilState, useRecoilValue } from "recoil";
import { updateListFavorites, userAuthenticated, mapUser } from "@/atoms/index";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { registerEvent } from "@/functions/Analytics";
import ModalReport from "@/components/ModalReport";

const SearchPost = ({ route, navigation }) => {
  const timerRef = useRef();
  const userAuth = useRecoilValue(userAuthenticated);
  const userLocation = useRecoilValue(mapUser);
  const [post, setPost] = useState(null);
  const [save, setSave] = useState("");
  const [open, setOpen] = useState(false);
  const [numberFavorite, setNumberFavorite] = useState(0);
  const [dimensionsImages, setDimensionsImages] = useState(0);
  const [showAgg, setShowAgg] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleReport, setVisibleReport] = useState(false);
  const [imageView, setImageView] = useState(null);
  const [listUpdate, setListUpdate] = useRecoilState(updateListFavorites);
  const [countryCity, setCountryCity] = useState(null);
  const global = require("@/utils/styles/global.js");
  const [weekSchedule, setWeekSchedule] = useState("");
  const [typeSchedule, setTypeSchedule] = useState("");
  const [listRatings, setListRatings] = useState(null);
  const [ratingsDetails, setRatingsDetails] = useState(null);

  const {
    data: { item, images },
  } = route.params;

  const actividad = JSON.parse(item.activity);
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
        path: `https://www.portaty.com/share/business?id=${item.id}`,
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

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.changed[0].isViewable)
      setDimensionsImages(viewableItems.changed[0].item.key);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 20 });

  const onCreateFavorite = async () => {
    try {
      const favorites = await API.graphql({
        query: customFavorites.createFavorites,
        variables: {
          input: {
            businessID: post?.id,
            userID: userAuth?.attributes["custom:userTableID"],
            position: 0,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      setSave(favorites?.data?.createFavorites?.id);
      setNumberFavorite(post?.favorites?.items?.length + 1);
      // registramos el evento

      const { country, city } = countryCity;

      registerEvent("user_add_business", {
        userid: userAuth?.attributes["custom:userTableID"],
        businessid: post?.id,
        birthdate: userAuth?.attributes?.birthdate,
        gender: userAuth?.attributes["custom:gender"],
        country,
        city,
      });
    } catch (error) {
      console.log("ERRO AL CARGAR UN FAVORITO: ", error);
    }
  };

  const onDeleteFavorite = async () => {
    const favorites = await API.graphql({
      query: customFavorites.deleteFavorites,
      variables: {
        input: {
          id: save,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    const { country, city } = countryCity;
    registerEvent("user_remove_business", {
      userid: userAuth?.attributes["custom:userTableID"],
      businessid: save,
      birthdate: userAuth?.attributes?.birthdate,
      gender: userAuth?.attributes["custom:gender"],
      country,
      city,
    });
    setSave("");
    setNumberFavorite(0);
  };

  const fetchData = async () => {
    try {
      const business = await API.graphql({
        query: customSearch.getBusiness,
        variables: {
          id: item.id,
        },
        authMode: "AWS_IAM",
      });
      if (
        userAuth?.attributes["custom:userTableID"] ===
        business?.data?.getBusiness?.userID
      ) {
        setShowAgg(false);
      } else {
        setShowAgg(true);
      }

      let schedule = JSON.parse(business?.data?.getBusiness.schedule);
      if (business?.data?.getBusiness.schedule) {
        filterSchedule(schedule?.shedule, schedule?.type);
      }
      setListUpdate(false);
      return setPost(business?.data?.getBusiness);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFavorite = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const favorite = await API.graphql({
        query: queries.favoritesByBusinessID,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          businessID: item.id,
          userID: { eq: attributes["custom:userTableID"] },
        },
      });
      if (favorite?.data?.favoritesByBusinessID?.items?.length !== 0)
        setSave(favorite?.data?.favoritesByBusinessID?.items[0]?.id);
    } catch (error) {
      console.log(error);
    }
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
        message: `Han compartido contigo un negocio, da click para mirarlo https://www.portaty.com/share/business?id=${item.id}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  const openCall = () => {
    const url = `tel://${post?.phone}`;
    Linking.openURL(url);
  };

  const registerViewBusiness = async (userID, businessID) => {
    try {
      // Obtener informacuon de la ultima visualizacion del usuario guardada en Async Storage
      const lastViewString = await AsyncStorage.getItem(`lastView_${userID}`);
      const lastViewInfo = JSON.parse(lastViewString);

      // Si hay una última visualización registrada y ocurrió hace menos de 24 horas, no registra la nueva visualización
      if (
        lastViewInfo &&
        new Date() - new Date(lastViewInfo.timestamp) < 24 * 60 * 60 * 1000 &&
        lastViewInfo.businessID === businessID
      ) {
        return;
      }

      // De no haber visualizacion Registrarla en analytics

      const { country, city } = countryCity;
      const params = {
        userid: userID,
        birthdate: userAuth?.attributes?.birthdate,
        gender: userAuth?.attributes["custom:gender"],
        country,
        city,
        businessid: businessID,
      };
      registerEvent("user_viewed_business", params);
      // Almacena la información de la última visualización en AsyncStorage
      const currentViewInfo = {
        businessID: businessID,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem(
        `lastView_${userID}`,
        JSON.stringify(currentViewInfo)
      );
    } catch (error) {
      console.log("Error al registrar analitica: ", error);
    }
  };

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
    setTypeSchedule(type);
  };

  const fetchRatings = async () => {
    let business = item;
    console.log(business.id);
    try {
      const fetchAllRatings = async (nextToken, result = []) => {
        const response = await API.graphql({
          query: queries.businessCommentsByBusinessID,
          authMode: "AWS_IAM",
          variables: {
            businessID: business?.id,
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

      console.log("Resenas", allRatings);
      setListRatings(allRatings);
    } catch (error) {
      console.log("eres tu", error);
    }
  };
  const getCatalogPDF = async () => {
    try {
      const url = post?.catalogpdf;
      console.log(post);
      Linking.openURL(url);
    } catch (error) {
      console.log("Error en catalogo: ", error);
    }
  };
  const fetchRatings2 = async () => {
    try {
      const api = "api-portaty";
      const path = "/business/ratings";
      const params = {
        headers: {},
        queryStringParameters: {
          businessID: item?.id,
        },
      };

      const response = await API.get(api, path, params);
      setRatingsDetails(response.data);
    } catch (error) {
      console.error("Error rating: ", error.response.data);
    }
  };
  // para la carga default
  useEffect(() => {
    if (!save) fetchFavorite();
    fetchData();
    fetchRatings();
    fetchRatings2();
  }, [listUpdate]);
  // para obetener el pais y ciudad
  useEffect(() => {
    const registerCountryCity = async () => {
      const addressArr = await Location.reverseGeocodeAsync(userLocation);
      setCountryCity(addressArr[0]);
    };
    if (userLocation) registerCountryCity();
  }, [userLocation]);
  // para cuando este pais y ciudad registrar en el evento de vista
  useEffect(() => {
    // Inicia el temporizador cuando el componente se monta y countryCity y userAuth existen
    if (countryCity && userAuth) {
      timerRef.current = setTimeout(() => {
        registerViewBusiness(
          userAuth?.attributes["custom:userTableID"],
          item.id
        );
      }, 3000);
    }
    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timerRef.current);
  }, [countryCity, userAuth]);

  if (!post || !listRatings || listUpdate) return <SkeletonExample />;
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
          {images.length !== 1 &&
            dimensionsImages + 1 > 1 &&
            dimensionsImages <= 3 && (
              <View
                style={[
                  global.mainBgColor,
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
                <Entypo name="triangle-left" size={24} color="white" />
              </View>
            )}
          {images.length !== 1 &&
            dimensionsImages >= 0 &&
            dimensionsImages < images.length - 1 && (
              <View
                style={[
                  global.mainBgColor,
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
                <Entypo name="triangle-right" size={24} color="white" />
              </View>
            )}
          <FlatList
            horizontal
            data={images}
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
                      borderColor: "#1f1f1f",
                      borderWidth: 0.7,
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
                      borderColor: "#1f1f1f",
                      borderWidth: 0.7,
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
                      { fontFamily: "medium", fontSize: 15 },
                      global.black,
                    ]}
                  >
                    {item.key + 1}/{images.length}
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
          {/* Aun no es lo del */}
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
        {showAgg && (
          <View>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: userAuth ? "space-between" : 'center',
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
                  {numberFavorite
                    ? numberFavorite
                    : post?.favorites?.items?.length}
                </Text>
                <Text style={{ fontSize: 20, fontFamily: "light" }}>
                  Favoritos
                </Text>
              </View>
              {userAuth && (
                <TouchableOpacity
                  onPress={() => {
                    if (save === "") {
                      onCreateFavorite();
                    } else {
                      onDeleteFavorite();
                    }
                  }}
                >
                  {save === "" ? (
                    <Image
                      style={{
                        width: 45,
                        height: 45,
                        resizeMode: "cover",
                      }}
                      source={require("@/utils/images/nofavorites.png")}
                    />
                  ) : (
                    <Image
                      style={{
                        width: 45,
                        height: 45,
                        resizeMode: "cover",
                      }}
                      source={require("@/utils/images/sifavorites.png")}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {/* Reporte */}
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 20,
            paddingBottom: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setVisibleReport(true)}
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
        <View
          style={[
            styles.line,
            global.bgMidGray,
            {
              top: 10,
              left: 0,
              width: 500,
              marginBottom: 20,
            },
          ]}
        />

        <View
          style={{
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "regular" }}>
            Horario comercial
          </Text>
          {post.schedule !== null ? (
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
                {typeSchedule}
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
            navigation.navigate("InteractionsSearch", {
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
              post?.coordinates?.lat,
              post?.coordinates?.lon,
              post?.name
            )
          }
        >
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 40,
              borderColor: "#1f1f1f",
              borderWidth: 0.7,
            }}
          >
            <MapView
              style={{
                width: "100%",
                height: 220,
              }}
              initialRegion={{
                latitude: post?.coordinates?.lat,
                longitude: post?.coordinates?.lon,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              scrollEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: post?.coordinates?.lat,
                  longitude: post?.coordinates?.lon,
                }}
                title={post?.name}
              />
            </MapView>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -50,
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
                  borderColor: "#1f1f1f",
                  borderWidth: 0.7,
                },
                global.bgYellow,
              ]}
            >
              <EvilIcons name="share-google" size={32} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 16 }}>
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
            marginTop: -25,
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
                  borderColor: "#1f1f1f",
                  borderWidth: 0.7,
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
        {post?.catalogpdf !== "" ||
          (post?.catalogpdf && (
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
          <View
            style={[
              styles.line,
              global.bgMidGray,
              {
                width: 500,
                left: 0,
              },
            ]}
          />
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
                {post?.name}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.line,
              global.bgMidGray,
              {
                width: 500,
                left: 0,
              },
            ]}
          />
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
                {actividad?.main}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.line,
              global.bgMidGray,
              {
                width: 500,
                left: 0,
              },
            ]}
          />
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
                {actividad?.sub}
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
                {post?.description}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.line,
              global.bgMidGray,
              {
                width: 500,
                left: 0,
              },
            ]}
          />
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
                {post?.phone}
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
                  post?.phone.startsWith("https://wa.me/") ||
                  post?.phone.startsWith(
                    "https://api.whatsapp.com/send?text="
                  );
                if (isWhatsAppLink) {
                  const url = `${post?.phone}`;
                  Linking.openURL(url);
                } else {
                  const phoneRegex =  post?.phone.replace("+", "");
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
                {post?.email}
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
                if (post?.instagram === "" || post?.instagram === null) return;
                const url = `https://www.instagram.com/${post?.instagram}`;
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
                      post?.instagram === "" || post?.instagram === null
                        ? "#1f1f1f"
                        : "blue",
                  },
                ]}
              >
                {post?.instagram === "" || post?.instagram === null
                  ? "No"
                  : post?.instagram}
              </Text>
              {post?.instagram === "" || post?.instagram === null ? (
                ""
              ) : (
                <Feather name="external-link" size={16} color="blue" />
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
                if (post?.facebook === "" || post?.facebook === null) return;
                const url = `https://www.facebook.com/${post?.facebook}`;
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
                      post?.facebook === "" || post?.facebook === null
                        ? "#1f1f1f"
                        : "blue",
                  },
                ]}
              >
                {post?.facebook === "" || post?.facebook === null
                  ? "No"
                  : post?.facebook}
              </Text>
              {post?.facebook === "" || post?.facebook === null ? (
                ""
              ) : (
                <Feather name="external-link" size={16} color="blue" />
              )}
            </Pressable>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
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
                      <Image
                        style={{
                          width: "100%",
                          height: "60%",
                          resizeMode: "contain",
                          borderRadius: 5,
                          borderWidth: 0.7,
                          borderColor: "#1f1f1f",
                        }}
                        source={{
                          uri: imageView?.url ? imageView?.url : imageView?.uri,
                        }}
                      />
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
                                    : post?.description
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
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <ModalReport
          businessID={item.id}
          close={() => setVisibleReport(false)}
          open={visibleReport}
        />
      </ScrollView>
    </View>
  );
};

export default SearchPost;
