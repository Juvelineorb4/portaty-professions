import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Platform,
  Linking,
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  Switch,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/utils/styles/Unprofile.js";
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
  Entypo,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { Auth, API, Storage } from "aws-amplify";
import * as subscriptions from "@/graphql/CustomSubscriptions/Profile";
import * as mutations from "@/graphql/CustomMutations/Profile";
import * as queries from "@/graphql/CustomQueries/Profile";
import * as queriesFavorites from "@/graphql/CustomQueries/Favorites";

import MapView, { Marker } from "react-native-maps";
import SkeletonPage from "@/components/SkeletonPage";
import * as ImagePicker from "expo-image-picker";
import ModalAlert from "@/components/ModalAlert";
import { updateProfile } from "@/atoms";
import { useRecoilState } from "recoil";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import { useCallback } from "react";
import { TextInput } from "react-native";
// pdf
import { StorageAccessFramework } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
// hooks
import useOpenFile from "@/hooks/useOpenFile";
import CustomButton from "@/components/CustomButton";
import ZoomableImage from "@/components/ZoomableImage";

const Page = ({ route, navigation }) => {
  const mapRef = useRef(null);
  const {
    data: { item, image, weeks, schedule, scheduleType },
  } = route.params;
  const { downloadAndOpenFile } = useOpenFile();
  const [selectedImages, setSelectedImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [dimensionsImages, setDimensionsImages] = useState(0);
  const [imageView, setImageView] = useState(null);
  const [imageChange, setImageChange] = useState(null);
  const [storageImages, setStorageImages] = useState([]);
  const [arrayImages, setArrayImages] = useState(item?.images);
  const [visible, setVisible] = useState(false);
  const [descriptionImage, setDescriptionImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingExtras, setLoadingExtras] = useState(5);
  const global = require("@/utils/styles/global.js");
  const [statusProfile, setStatusProfile] = useRecoilState(updateProfile);
  const [activeMainImage, setActiveMainImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favoritesQY, setFavoritesQY] = useState(0);
  const [enableFavorites, setEnableFavorites] = useState(false);
  const [listRatings, setListRatings] = useState([]);
  const [ratingsDetails, setRatingsDetails] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // coordinates
  const [coordinate, setCoordinate] = useState({
    latitude: item.coordinates.lat,
    longitude: item.coordinates.lon,
  });
  const actividad = JSON.parse(item.activity);

  const [editParams, setEditParams] = useState({
    name: item.name,
    activity: {
      main: actividad.main,
      sub: actividad.sub,
    },
    phone: item.phone,
    ws: item.whatsapp,
    email: item.email,
    web: item.page,
    instagram: item.instagram,
    facebook: item.facebook,
    description: item.description,
  });
  const onFavorites = async () => {
    setEnableFavorites(true);
    try {
      const business = await API.graphql({
        query: customProfile.getBusinessFavorites,
        variables: {
          id: item.id,
        },
        authMode: "AWS_IAM",
      });
      setFavoritesQY(business.data.getBusiness.favorites.items.length);
      setEnableFavorites(false);
    } catch (error) {
      console.log(error);
      setEnableFavorites(false);
    }
  };
  const onSaveChange = async () => {
    setIsLoading(true);
    const activityChange = JSON.stringify(editParams?.activity);
    try {
      const result = await API.graphql({
        query: mutations.updateBusinessPage,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            id: item.id,
            name: editParams?.name,
            email: editParams?.email,
            phone: editParams?.phone,
            whatsapp: editParams?.ws,
            instagram: editParams?.instagram,
            facebook: editParams?.facebook,
            page: editParams?.web,
            activity: activityChange,
            description: editParams?.description,
          },
        },
      });
    } catch (error) {
      const { message } = new Error(error);
      console.log("ERROR AL ACTUALIZAR NEGOCIO: ", message);
    }
    setIsLoading(false);
    setEditActive(!editActive);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getPdf = async () => {
    const { identityId } = await Auth.currentUserCredentials();
    const api = "api-professions-gateway";
    const path = "/documentqr";
    const params = {
      headers: {},
      queryStringParameters: {
        path: `https://www.portaty.com/share/business?id=${item.id}`,
        businessid: item.id,
        identityid: identityId,
      },
    };
    try {
      // creo el pdf url
      const result = await API.get(api, path, params);
      // la ruta de guardado
      await Linking.openURL(result?.url);
    } catch (error) {
      console.log("Error en pdf: ", error.message);
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

  const getFileData = async (contentUri) => {
    const fileData = await FileSystem.readAsStringAsync(contentUri);
    return fileData;
  };

  const onSharePdf = async (contentUri) => {
    const canOpen = await Linking.canOpenURL(contentUri);

    if (!canOpen) {
      alert(`No se encontró ninguna aplicación para abrir el PDF`);
      return;
    }

    await Linking.openURL(contentUri);
  };

  const selectImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsMultipleSelection: true,
      // aspect: [6, 4],
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImageView(result.assets[0]);
      setOpen(!open);
      // uploadImages(result.assets[0].base64);
    } else {
      console.log("Cancelado");
    }
  };
  function urlToBlob(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  }

  const Randomizer = () => {
    let numero = "";
    for (let i = 0; i < 10; i++) {
      numero += Math.floor(Math.random() * 10);
    }
    return numero;
  };

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.changed[0].isViewable)
      setDimensionsImages(viewableItems.changed[0].item.key);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 20 });

  const uploadImages = async (imageB64, description) => {
    setOpen(!open);
    setLoading(true);
    const { identityId } = await Auth.currentUserCredentials();
    const apiName = "api-professions-gateway";
    const path = "/thumbnailgenerator";
    const myInit = {
      body: {
        identityid: identityId,
        businessid: item.id,
        action: "create",
        type: "extras",
        key: storageImages.length,
        description: description,
        image: imageB64,
      },
      headers: {},
    };

    const result = await API.post(apiName, path, myInit);
    imagesArray();
    setDescriptionImage("");

    setLoading(false);
  };

  const AllImages = async () => {
    try {
      const list = arrayImages
        ?.map((image) => JSON.parse(image))
        .sort((a, b) => a.key - b.key);
      setStorageImages(list);
    } catch (error) {
      console.log(error);
    }
  };

  const changeTemporalImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [6, 4],
      quality: 0.8,
      base64: true,
    });
    if (!result.canceled) {
      setActiveMainImage(true);
      setImageChange(result.assets[0]);
    } else {
      console.log("Cancelado");
    }
  };
  const changeImage = async (image, description, change) => {
    const { identityId } = await Auth.currentUserCredentials();
    const apiName = "api-professions-gateway";
    const path = "/thumbnailgenerator";
    setOpen(!open);
    setLoadingExtras(image.key);
    const myInit = {
      body: {
        identityid: identityId,
        businessid: item.id,
        action: "update",
        type: image.key === 0 ? "profile" : "extras",
        key: image?.key,
        description: description ? description : "",
        image: change ? change.base64 : "",
      },
      headers: {},
    };

    try {
      const resultAPI = await API.post(apiName, path, myInit);
      setDescriptionImage("");
      imagesArray();
      setOpen(!open);
      setLoadingExtras(5);
      setImageChange(null);
      setActiveMainImage(false);
    } catch (error) {
      console.log("ERROR EN API: ", error.message);
    }
  };

  const deleteImage = async (image) => {
    let imagePath = image.url.substring(image.url.indexOf("protected"));
    const { identityId } = await Auth.currentUserCredentials();
    const apiName = "api-professions-gateway";
    const path = "/thumbnailgenerator";

    const myInit = {
      body: {
        action: "delete",
        path: imagePath,
        businessid: item.id,
        key: image.key,
      },
      headers: {},
    };
    try {
      const resultAPI = await API.post(apiName, path, myInit);
      imagesArray();
      setDescriptionImage("");
      setOpen(!open);
      setImageView(null);
    } catch (error) {
      console.log(error);
    }
  };

  const imagesArray = async () => {
    const result = await API.graphql({
      query: customProfile.getImages,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: item?.id,
      },
    });
    const list = result?.data?.getBusiness?.images
      .map((image) => JSON.parse(image))
      .sort((a, b) => a.key - b.key);
    setStorageImages(list);
  };

  useEffect(() => {
    onFavorites();
    AllImages();
    imagesArray();

    const updateSub = API.graphql({
      query: subscriptions.onUpdateBusiness,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        filter: {
          id: { eq: item.id },
        },
      },
    }).subscribe({
      next: ({ provider, value: { data } }) => {
        if (data?.onUpdateBusiness?.images) {
          const list = data?.onUpdateBusiness?.images
            .map((image) => JSON.parse(image))
            .sort((a, b) => a.key - b.key);
          setStorageImages(list);
          setArrayImages(data.onUpdateBusiness.images);
        } else {
          API.graphql({
            authMode: "AMAZON_COGNITO_USER_POOLS",
            query: queries.getBusinessCoordinate,
            variables: {
              id: item.id,
            },
          }).then((r) => {
            const coor = r.data.getBusiness.coordinates;
            setCoordinate({
              latitude: coor.lat,
              longitude: coor.lon,
            });
            mapRef.current.animateToRegion(
              {
                ...{ latitude: coor.lat, longitude: coor.lon },
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              500
            );
          });
        }
      },
      error: (error) => console.warn(error),
    });
    return () => {
      updateSub.unsubscribe();
    };
  }, []);

  const onChangeLocation = (lat, lon) => {
    navigation.navigate("MapView", {
      businessid: item.id,
      coordinates: { latitude: lat, longitude: lon },
    });
  };

  const fetchRatings = async ({ data }) => {
    let business = item;
    try {
      const fetchAllRatings = async (nextToken, result = []) => {
        const response = await API.graphql({
          query: queriesFavorites.businessCommentsByBusinessID,
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
    } catch (error) {
      console.log("ERROR A BUSCAR RATINGS: ", error.response.data);
    }
  };

  const uploadCatalogPDF = async () => {
    console.log("QUERIEDNO SUBIRF");
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "application/pdf",
      });

      if (result?.assets !== null && result?.canceled !== true) {
        console.log(result);
        const response = await fetch(result?.assets[0]?.uri);
        const blob = await response.blob();
        const pdf = await Storage.put(
          `business/${item?.id}/catalog.pdf`,
          blob,
          {
            contentType: "application/pdf",
            level: "protected",
            metadata: {
              businessid: item?.id,
            },
          }
        );
        console.log(pdf);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCatalogPDF = async () => {
    try {
      const url = item?.catalogpdf;
      Linking.openURL(url);
    } catch (error) {
      console.log("Error en catalogo: ", error);
    }
  };

  /* Teclado */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (!item || storageImages?.length === 0) return <SkeletonPage />;
  return (
    <View
      style={[
        {
          flex: 1,
        },
        global.bgWhite,
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
          {storageImages.length !== 1 &&
            dimensionsImages + 1 > 1 &&
            dimensionsImages <= 3 && (
              <View
                style={[
                  global.mainBgColor,
                  {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    zIndex: 10,
                    left: 0,
                    top: "50%",
                    opacity: 0.85,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Entypo name="triangle-left" size={24} color="#1f1f1f" />
              </View>
            )}
          {storageImages.length !== 1 &&
            dimensionsImages >= 0 &&
            dimensionsImages < storageImages.length - 1 && (
              <View
                style={[
                  global.mainBgColor,
                  {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    zIndex: 10,
                    top: "50%",
                    right: 0,
                    opacity: 0.85,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Entypo name="triangle-right" size={24} color="#1f1f1f" />
              </View>
            )}
          {storageImages.length !== 0 && (
            <FlatList
              horizontal
              data={storageImages}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flex: 1,
                    width: 320,
                    height: 250,
                    // position: "relative",
                    // zIndex: 3
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

                  {item.key === loadingExtras && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000",
                        opacity: 0.5,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <ActivityIndicator color={`#1f1f1f`} size={`large`} />
                    </View>
                  )}
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
                        { fontFamily: "medium", fontSize: 17 },
                        global.black,
                      ]}
                    >
                      {item.key + 1}/{storageImages.length}
                    </Text>
                    <MaterialCommunityIcons
                      name="image-search-outline"
                      size={20}
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
          )}
        </View>
        {storageImages.length < 5 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={[
                {
                  height: 50,
                  width: 250,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 8,
                  opacity: 0.95,
                  borderWidth: 0.7,
                  borderColor: "#1f1f1f",
                  marginBottom: 5,
                },
                global.bgYellow,
              ]}
              onPress={selectImages}
            >
              <Text
                style={[{ fontFamily: "bold", fontSize: 13 }, global.black]}
              >
                Agregar mas fotos
              </Text>
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={24}
                color="#1f1f1f"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
            <Text style={{ fontFamily: "regular" }}>
              Solo puedes tener 5 fotos como maximo
            </Text>
          </View>
        )}
        <View
          style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontFamily: "medium" }}>
            {enableFavorites ? (
              <ActivityIndicator color={`#1f1f1f`} />
            ) : (
              favoritesQY
            )}
          </Text>
          <Text style={{ fontSize: 20, fontFamily: "light" }}>Favoritos</Text>
        </View>
        <View>
          <View style={[styles.line, global.bgMidGray]} />
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontFamily: "regular" }}>
              Tu horario comercial
            </Text>
            {schedule === null ? (
              <TouchableOpacity
                style={[
                  {
                    borderColor: "#1f1f1f",
                    borderRadius: 8,
                    borderWidth: 0.7,
                    padding: 20,
                    marginTop: 10,
                  },
                  global.mainBgColor,
                ]}
                onPress={() => {
                  navigation.navigate("Shedule", {
                    data: item,
                    schedule: schedule,
                    scheduleType: scheduleType,
                  });
                }}
              >
                <Text
                  style={[
                    { fontSize: 14, fontFamily: "bold", textAlign: "center" },
                    global.black,
                  ]}
                >
                  Registra un horario
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flex: 1,
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 14,
                    marginTop: 5,
                    lineHeight: 25,
                    textAlign: "center",
                  }}
                >
                  {scheduleType}
                </Text>
                <Text
                  style={{
                    fontFamily: "light",
                    fontSize: 15,
                    lineHeight: 25,
                    textAlign: "center",
                  }}
                >
                  {weeks}
                </Text>
                <TouchableOpacity
                  style={[
                    {
                      borderColor: "#1f1f1f",
                      borderRadius: 8,
                      borderWidth: 0.7,
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 120,
                      height: 50,
                      alignSelf: "center",
                    },
                    global.mainBgColor,
                  ]}
                  onPress={() => {
                    navigation.navigate("Shedule", {
                      data: item,
                      schedule: schedule,
                      scheduleType: scheduleType,
                    });
                  }}
                >
                  <Text
                    style={[
                      { fontSize: 13, fontFamily: "bold", textAlign: "center" },
                      global.black,
                    ]}
                  >
                    Editar horario
                  </Text>
                </TouchableOpacity>
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
              navigation.navigate("InteractionsPage", {
                business: item,
                list: listRatings,
                author: true,
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
              onOpenMap(coordinate.latitude, coordinate.longitude, item.name)
            }
          >
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                overflow: "hidden",
                marginTop: 5,
                borderColor: "#1f1f1f",
                borderWidth: 0.7,
              }}
            >
              <MapView
                ref={mapRef}
                style={{
                  width: "100%",
                  height: 220,
                }}
                initialRegion={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                scrollEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  title={item.name}
                />
              </MapView>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              onChangeLocation(coordinate.latitude, coordinate.longitude)
            }
            style={[
              global.bgYellow,
              {
                width: 90,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#1f1f1f",
                borderWidth: 0.7,
                borderRadius: 6,
                position: "absolute",
                bottom: "7.5%",
                right: "5.5%",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "bold",
                textAlign: "center",
              }}
            >
              Editar ubicacion
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            padding: 20,
            marginTop: -15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                Compartir
              </Text>
              <Text style={{ fontFamily: "regular", fontSize: 12, width: 150 }}>
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
          onPress={() =>
            getPdf().then(async (fileUri) => {
              if (fileUri) {
                const localFileUri = await getFileData(fileUri);
                onSharePdf(localFileUri);
              }
            })
          }
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
              <AntDesign name="qrcode" size={24} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                Descargar QR
              </Text>
              <Text style={{ fontFamily: "regular", fontSize: 12, width: 150 }}>
                Pegalo en donde tu quieras
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
            marginTop: -25,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Analytics", {
              data: item,
            })
          }
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
              <AntDesign name="barschart" size={24} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                Estadisticas
              </Text>
              <Text style={{ fontFamily: "regular", fontSize: 12, width: 150 }}>
                Mira las estadisticas de tu negocio
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

        {/* Promociones */}
        <TouchableOpacity
          style={{
            padding: 20,
            marginTop: -25,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Promotions", {
              data: item,
            })
          }
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
              <AntDesign name="tago" size={24} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                Promociones
              </Text>
              <Text style={{ fontFamily: "regular", fontSize: 12, width: 150 }}>
                Gestiona todas tus promociones
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
        <View>
          <TouchableOpacity
            style={[
              {
                borderColor: "#1f1f1f",
                borderRadius: 8,
                borderWidth: 0.7,
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
                width: 120,
                height: 50,
                alignSelf: "center",
              },
              global.mainBgColor,
            ]}
            onPress={uploadCatalogPDF}
          >
            <Text
              style={[
                { fontSize: 13, fontFamily: "bold", textAlign: "center" },
                global.black,
              ]}
            >
              {item?.catalogpdf === "" || !item?.catalogpdf
                ? "Subir un catalogo"
                : "Cambiar el catalogo"}
            </Text>
          </TouchableOpacity>
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
                      style={{
                        fontFamily: "regular",
                        fontSize: 12,
                        width: 150,
                      }}
                    >
                      Mira la lista de productos y servicios de tu negocio
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
        </View>

        {/* <TouchableOpacity onPress={uploadCatalogPDF}>
          <View>
            <Text>CARGAR PDF</Text>
          </View>
        </TouchableOpacity> */}
        <View style={{ marginBottom: 80 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "regular",
                alignSelf: "flex-end",
              }}
            >
              Datos
            </Text>
            <View
              style={[
                global.bgYellow,
                {
                  borderRadius: 8,
                  borderWidth: 0.7,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 12,
                },
              ]}
            >
              <Text style={{ fontSize: 14, fontFamily: "bold" }}>Editar</Text>
              <Switch
                trackColor={{
                  false: "#767577",
                  true: "#1f1f1f",
                }}
                thumbColor={editActive ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setEditActive(!editActive)}
                value={editActive}
              />
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
              {/* <Foundation name="torso-business" size={22} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Nombre del negocio
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                onChangeText={(e) => setEditParams({ ...editParams, name: e })}
                value={editParams?.name}
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                // defaultValue={item.name}
                editable={editActive ? true : false}
              />
              {/* <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.name}
              </Text> */}
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
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Area
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                value={editParams?.activity?.main}
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    // textTransform: "capitalize",
                  },
                  global.bgWhiteSoft,
                ]}
                // defaultValue={item.name}
                editable={false}
              />
              {/* <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.activity}
              </Text> */}
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
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Actividad
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                value={editParams?.activity?.sub}
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    // textTransform: "capitalize",
                  },
                  global.bgWhiteSoft,
                ]}
                // defaultValue={item.name}
                editable={false}
              />
              {/* <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.activity}
              </Text> */}
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
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Descripcion
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                onChangeText={(e) =>
                  setEditParams((prevState) => ({
                    ...prevState,
                    description: e,
                  }))
                }
                value={editParams?.description}
                style={[
                  {
                    width: 200,
                    height: 100,
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                // defaultValue={item.name}
                multiline={true}
                editable={editActive ? true : false}
              />
              {/* <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.activity}
              </Text> */}
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
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Telefono
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                onChangeText={(e) =>
                  setEditParams((prevState) => ({
                    ...prevState,
                    phone: e,
                  }))
                }
                value={editParams?.phone}
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    textTransform: "capitalize",
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                defaultValue={
                  editParams?.phone === null
                    ? "Agregar telefono"
                    : editParams?.phone
                }
                editable={editActive ? true : false}
              />
              {/* <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.phone}
              </Text> */}
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
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                WhatsApp
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                onChangeText={(e) =>
                  setEditParams((prevState) => ({
                    ...prevState,
                    ws: e,
                  }))
                }
                value={
                  editParams?.ws === "" ? "Agregar WhatsApp" : editParams?.ws
                }
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    textTransform: "capitalize",
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                defaultValue={
                  editParams?.ws === "" ? "Agregar WhatsApp" : editParams?.ws
                }
                editable={editActive ? true : false}
              />
              {/* <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.whatsapp}
              </Text> */}
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
              {/* <MaterialCommunityIcons
                name="email-open-multiple-outline"
                size={20}
                color="#1f1f1f"
              /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Correo
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                onChangeText={(e) =>
                  setEditParams((prevState) => ({
                    ...prevState,
                    email: e,
                  }))
                }
                value={editParams?.email}
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    textTransform: "capitalize",
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                editable={editActive ? true : false}
              />
              {/* <Text style={[{ fontSize: 13, fontFamily: "regular" }]}>
                {item.email}
              </Text> */}
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          {/* <View
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
                  { fontFamily: "lightItalic", fontSize: 15 },
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
              <TextInput
                onChangeText={(e) =>
                  setEditParams((prevState) => ({
                    ...prevState,
                    web: e,
                  }))
                }
                value={
                  editParams?.web === null ? "Agregar Web" : editParams?.web
                }
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    textTransform: "capitalize",
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                editable={editActive ? true : false}
                defaultValue={
                  editParams?.web === null ? "Agregar Web" : editParams?.web
                }
              />
              <AntDesign name="link" size={16} color="#1f1f1f" />
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} /> */}
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
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Instagram
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                onChangeText={(e) =>
                  setEditParams((prevState) => ({
                    ...prevState,
                    instagram: e,
                  }))
                }
                value={
                  editParams?.instagram === null
                    ? "Agregar Instagram"
                    : editParams?.instagram
                }
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    textTransform: "capitalize",
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                editable={editActive ? true : false}
                defaultValue={
                  editParams?.instagram === null
                    ? "Agregar Instagram"
                    : editParams?.instagram
                }
              />
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
              {/* <FontAwesome name="facebook-square" size={24} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "lightItalic", fontSize: 15 },
                  global.black,
                ]}
              >
                Facebook
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                onChangeText={(e) =>
                  setEditParams((prevState) => ({
                    ...prevState,
                    facebook: e,
                  }))
                }
                value={
                  editParams?.facebook === ""
                    ? "Agregar Facebook"
                    : editParams?.facebook
                }
                style={[
                  {
                    fontSize: 13,
                    fontFamily: "regular",
                    padding: 10,
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    textTransform: "capitalize",
                  },
                  editActive ? global.bgWhite : global.bgWhiteSoft,
                ]}
                editable={editActive ? true : false}
                defaultValue={
                  editParams?.facebook === ""
                    ? "Agregar Facebook"
                    : editParams?.facebook
                }
              />
            </View>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          {editActive && (
            <CustomButton
              text={
                isLoading ? <ActivityIndicator color={`#1f1f1f`} /> : "Guardar"
              }
              handlePress={onSaveChange}
              textStyles={[
                global.black,
                { fontFamily: "bold", marginLeft: 25 },
              ]}
              buttonStyles={[
                {
                  width: 200,
                  height: 50,
                  borderRadius: 6,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#1f1f1f",
                  borderWidth: 0.7,
                  alignSelf: "center",
                  marginTop: 15,
                },
                global.bgYellow,
                ,
              ]}
            />
          )}
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Modal
            animationType="none"
            transparent={true}
            visible={open}
            onRequestClose={() => {
              setOpen(!open);
              setImageView(null);
              setDescriptionImage("");
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setOpen(!open);
                setImageView(null);
                setDescriptionImage("");
              }}
            >
              <ScrollView
                style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.5)" }}
              >
                <View
                  // style={
                  //   keyboardVisible
                  //     ? styles.modalContainerKeyboard
                  //     : styles.modalContainer
                  // }
                  style={styles.modalContainer}
                >
                  <TouchableWithoutFeedback>
                    <View
                      style={[
                        // keyboardVisible
                        //   ? styles.modalContentKeyboard
                        //   : styles.modalContent,
                        styles.modalContent,
                        {
                          // height: keyboardVisible ? "100%" : "100%",
                          height: "100%",
                        },
                      ]}
                    >
                      <View style={styles.modalTop}>
                        <Pressable
                          onPress={() => {
                            setOpen(!open);
                            setImageView(null);
                            setDescriptionImage("");
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
                            height: 260,
                          }}
                        >
                          <ZoomableImage
                            // keyboard={keyboardVisible}
                            uri={
                              imageChange
                                ? imageChange.uri
                                : imageView?.url
                                ? imageView?.url
                                : imageView?.uri
                            }
                          />

                          <MaterialCommunityIcons
                            name="image-edit-outline"
                            size={24}
                            color="#1f1f1f"
                            style={{
                              position: "absolute",
                              backgroundColor: "#ffb703",
                              borderRadius: 4,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                              // right: keyboardVisible ? 15 : 0,
                              right: 0,
                              opacity: 0.85,
                              borderWidth: 0.7,
                              borderColor: "#1f1f1f",
                            }}
                            onPress={changeTemporalImage}
                          />
                        </View>

                        {imageView?.url && (
                          <View style={{ flex: 1, paddingVertical: 15 }}>
                            {imageView?.key === 0 && (
                              <Text
                                style={{
                                  fontFamily: "light",
                                  fontSize: 12,
                                  textAlign: "center",
                                }}
                              >
                                Tu imagen principal solo la puedes cambiar
                              </Text>
                            )}
                            <View
                              style={{
                                flexDirection: "row",
                                borderColor: "#444",
                                borderWidth: 0.4,
                                paddingHorizontal: 10,
                                borderRadius: 8,
                                marginTop: 10,
                                height: 70,
                              }}
                            >
                              <TextInput
                                defaultValue={imageView?.description}
                                onChangeText={(e) => {
                                  setActiveMainImage(true);
                                  setDescriptionImage(e);
                                }}
                                placeholder={
                                  "Coloca una descripcion para tu imagen"
                                }
                                placeholderTextColor={"#333"}
                                style={{
                                  // flex: 1,
                                  // width: 100,
                                  height: 100,
                                  fontFamily: "light",
                                  fontSize: 12,
                                  alignItems: "flex-start",
                                }}
                                multiline={true}
                                numberOfLines={5}
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                columnGap: 5,
                              }}
                            >
                              <TouchableOpacity
                                style={[
                                  activeMainImage
                                    ? global.bgYellow
                                    : global.bgWhite,
                                  {
                                    borderRadius: 8,
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 49,
                                    marginTop: 10,
                                    flexDirection: "row",
                                    borderWidth: 0.7,
                                    borderColor: "#1f1f1f",
                                  },
                                ]}
                                onPress={() =>
                                  changeImage(
                                    imageView,
                                    descriptionImage,
                                    imageChange
                                  )
                                }
                                disabled={!activeMainImage}
                              >
                                <Text
                                  style={[
                                    global.black,
                                    {
                                      fontFamily: "medium",
                                      fontSize: 14,
                                      marginRight: 3,
                                    },
                                  ]}
                                >
                                  {activeMainImage
                                    ? `Guardar cambios`
                                    : `Sin cambios`}
                                </Text>
                              </TouchableOpacity>
                              {imageView?.key !== 0 && (
                                <TouchableOpacity
                                  style={[
                                    {
                                      flex: 1,
                                      borderRadius: 8,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: 49,
                                      marginTop: 10,
                                      backgroundColor: "#c81d11",
                                      flexDirection: "row",
                                    },
                                  ]}
                                  onPress={() => deleteImage(imageView)}
                                >
                                  <Text
                                    style={[
                                      global.white,
                                      { fontFamily: "medium", fontSize: 14 },
                                    ]}
                                  >
                                    {`Eliminar`}
                                  </Text>
                                  <MaterialCommunityIcons
                                    name="delete-outline"
                                    size={24}
                                    color="white"
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        )}
                        {imageView?.base64 && (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              columnGap: 5,
                            }}
                          >
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
                                value={descriptionImage}
                                onChangeText={(e) => setDescriptionImage(e)}
                                // onBlur={onBlur}
                                placeholder={
                                  "Coloca una descripcion para tu imagen"
                                }
                                placeholderTextColor={"#333"}
                                style={{
                                  flex: 1,
                                  // width: 100,
                                  fontFamily: "light",
                                  fontSize: 12,
                                  alignItems: "flex-start",
                                }}
                                multiline={true}
                                numberOfLines={5}
                              />
                            </View>
                            <TouchableOpacity
                              style={[
                                global.bgYellow,
                                {
                                  borderRadius: 8,
                                  // flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: 70,
                                  marginTop: 10,
                                  flexDirection: "row",
                                  borderWidth: 0.7,
                                  borderColor: "#1f1f1f",
                                },
                              ]}
                              onPress={() =>
                                uploadImages(
                                  imageView?.base64,
                                  descriptionImage
                                )
                              }
                            >
                              <Text
                                style={[
                                  global.black,
                                  {
                                    fontFamily: "medium",
                                    fontSize: 14,
                                    marginRight: 3,
                                    paddingHorizontal: 15,
                                  },
                                ]}
                              >
                                {`Agregar`}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </Modal>
        </KeyboardAvoidingView>

        <ModalAlert
          text={`Error al guardar imagenes. Por favor, selecciona un máximo de 4 imágenes`}
          close={() => setVisible(false)}
          icon={require("@/utils/images/alert.png")}
          open={visible}
        />
      </ScrollView>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            opacity: 0.5,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator color={`#1f1f1f`} size={`large`} />
        </View>
      )}
    </View>
  );
};

export default Page;
