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

const FavoritePage = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const [post, setPost] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [listUpdate, setListUpdate] = useRecoilState(updateListFavorites);
  const [imageView, setImageView] = useState(null);
  const [dimensionsImages, setDimensionsImages] = useState(0);
  const [open, setOpen] = useState(false);
  const [weekSchedule, setWeekSchedule] = useState("");
  const [starRating, setStarRating] = useState(null);

  const {
    data: { item, image },
  } = route.params;
  let schedule = JSON.parse(item.business?.schedule);
  const filterSchedule = (array, type) => {
    if (array === null || type === null) return;
    console.log("toy por aqui");
    console.log(array);
    console.log(type);
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

    console.log(pContent);

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
      setPost(business.data.getBusiness);
    } catch (error) {
      console.log("eres tu", error);
    }
  };

  const onDeleteFavorite = async () => {
    const favorites = await API.graphql({
      query: customFavorites.deleteFavorites,
      variables: {
        input: {
          id: item.id,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setListUpdate(!listUpdate);
    navigation.goBack();
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
      console.error("Error sharing:", error);
    }
  };
  const openCall = () => {
    const url = `tel://${item.business.phone}`;
    Linking.openURL(url);
  };

  useLayoutEffect(() => {
    fetchData();
    filterSchedule(schedule.shedule, schedule.type);
  }, [listUpdate]);

  if (!item) return <SkeletonExample />;
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
                      resizeMode: "cover",
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
                4.7
              </Text>
              <Ionicons name="star" size={16} color="#ffb703" />
            </View>

            <Text
              style={{
                fontFamily: "lightItalic",
                fontSize: 12,
              }}
            >
              100+ valoraciones
            </Text>
          </View>
          <View
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
          </View>
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
            navigation.navigate("InteractionsFavorites");
          }}
        >
          <View
            style={{
              borderWidth: 0.6,
              borderColor: "#1f1f1f",
              height: 130,
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
                Este negocio tiene 21 reseñas
              </Text>
            </View>
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
                  4 de 5
                </Text>
                <Ionicons name="star" size={12} color="#ffb703" />
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: 12,
                    marginLeft: 5,
                  }}
                >
                  Christopher Alvarez
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 13,
                }}
              >
                Un sitio agradable, y muy buena atencion al cliente
              </Text>
            </View>
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
                Ver todas las reseñas
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
        {/* <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -27,
          }}
          onPress={getPdf}
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
              <AntDesign name="qrcode" size={24} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                Descargar QR
              </Text>
              <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                Descarga el QR del negocio para pegarlo en donde quieras
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
        </TouchableOpacity> */}
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
                if (
                  item.business?.whatsapp === "" ||
                  item.business?.whatsapp === null
                )
                  return;
                const url = `https://${item.business?.whatsapp}`;
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
                      item.business?.whatsapp === "" ||
                      item.business?.whatsapp === null
                        ? "#1f1f1f"
                        : "blue",
                  },
                ]}
              >
                {item.business?.whatsapp === "" ||
                item.business?.whatsapp === null
                  ? "No"
                  : item.business?.whatsapp}
              </Text>
              {item.business?.whatsapp === "" ||
              item.business?.whatsapp === null ? (
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
                        resizeMode: "cover",
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
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
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
