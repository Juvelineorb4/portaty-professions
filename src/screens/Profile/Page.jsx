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
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import CustomSelect from "@/components/CustomSelect";
import styles from "@/utils/styles/Unprofile.module.css";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Foundation,
  EvilIcons,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as mutation from "@/graphql/CustomMutations/Profile";
import * as subscriptions from "@/graphql/CustomSubscriptions/Profile";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import MapView, { Marker } from "react-native-maps";
import SkeletonPage from "@/components/SkeletonPage";
import * as ImagePicker from "expo-image-picker";
import ModalAlert from "@/components/ModalAlert";
import { updateProfile } from "@/atoms";
import { useRecoilState } from "recoil";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { StorageAccessFramework } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useCallback } from "react";
import { TextInput } from "react-native";
// import { FlatListSlider } from "react-native-flatlist-slider";
// import Preview from "@/components/Preview";

const Page = ({ route, navigation }) => {
  const {
    data: { item, image },
  } = route.params;
  const [selectedImages, setSelectedImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [dimensionsImages, setDimensionsImages] = useState(0);
  const [imageView, setImageView] = useState(null);
  const [storageImages, setStorageImages] = useState([]);
  const [arrayImages, setArrayImages] = useState(item?.images);
  const [visible, setVisible] = useState(false);
  const [descriptionImage, setDescriptionImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingExtras, setLoadingExtras] = useState(5);
  const global = require("@/utils/styles/global.js");
  const [statusProfile, setStatusProfile] = useRecoilState(updateProfile);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
    let fileUri = "";
    try {
      const response = await API.get(api, path, params);
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        "qr.pdf",
        "application/pdf"
      )
        .then(async (uri) => {
          fileUri = uri;
          await FileSystem.writeAsStringAsync(uri, response["pdf_base64"], {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log("Error en pdf: ", error.message);
    }
    return fileUri;
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

  const onSharePdf = async (contentUri) => {
    const options = {
      mimeType: "application/pdf",
      dialogTitle: "Portaty",
    };
    try {
      const localUri = FileSystem.documentDirectory + "qr.pdf";
      await FileSystem.copyAsync({
        from: contentUri,
        to: localUri,
      });

      Sharing.shareAsync(localUri, options);
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsMultipleSelection: true,
      aspect: [6, 4],
      allowsEditing: true,
      quality: 0.1,
      base64: true,
    });

    if (!result.canceled) {
      setImageView(result.assets[0]);
      setOpen(!open);
      // uploadImages(result.assets[0].base64);
    } else {
      console.log("cancelaste");
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
    const apiName = "api-professions-gateway"; // replace this with your api name.
    const path = "/thumbnailgenerator"; //replace this with the path you have configured on your API
    const myInit = {
      body: {
        identityid: identityId,
        businessid: item.id,
        action: "create",
        type: "extras",
        key: storageImages.length,
        description: description,
        image: imageB64,
      }, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };

    const result = await API.post(apiName, path, myInit);
    imagesArray();
    setDescriptionImage("");

    setLoading(false);
  };

  const AllImages = async () => {
    try {
      const list = arrayImages
        .map((image) => JSON.parse(image))
        .sort((a, b) => a.key - b.key);
      setStorageImages(list);
    } catch (error) {
      console.log(error);
    }
  };

  const changeImage = async (image, description) => {
    const { identityId } = await Auth.currentUserCredentials();
    const apiName = "api-professions-gateway"; // replace this with your api name.
    const path = "/thumbnailgenerator"; //replace this with the path you have configured on your API
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 0.1,
      base64: true,
    });
    if (!result.canceled) {
      setOpen(!open);
      setLoadingExtras(image.key);
      const imageB64 = result.assets[0].base64;
      const myInit = {
        body: {
          identityid: identityId,
          businessid: item.id,
          action: "update",
          type: image.key === 0 ? "profile" : "extras",
          key: image?.key,
          description: description,
          image: imageB64,
        }, // replace this with attributes you need
        headers: {}, // OPTIONAL
      };

      try {
        const resultAPI = await API.post(apiName, path, myInit);
        console.log(resultAPI);
        setDescriptionImage("");
        imagesArray();
        setOpen(!open);
        setLoadingExtras(5);
      } catch (error) {
        console.log("ERROR EN API: ", error);
      }
    } else {
      console.log("cancelaste");
    }
  };

  const deleteImage = async (image) => {
    let imagePath = image.url.substring(image.url.indexOf("protected"));
    const { identityId } = await Auth.currentUserCredentials();
    const apiName = "api-professions-gateway"; // replace this with your api name.
    const path = "/thumbnailgenerator"; //replace this with the path you have configured on your API

    const myInit = {
      body: {
        action: "delete",
        path: imagePath,
        businessid: item.id,
        key: image.key,
      }, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };
    try {
      const resultAPI = await API.post(apiName, path, myInit);
      console.log(resultAPI);
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
    console.log(list);
    setStorageImages(list);
  };

  useEffect(() => {
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
        console.log("EL SUBS", data);
        const list = data?.onUpdateBusiness?.images
          .map((image) => JSON.parse(image))
          .sort((a, b) => a.key - b.key);
        setStorageImages(list);
        setArrayImages(data.onUpdateBusiness.images);
      },
      error: (error) => console.warn(error),
    });
    return () => {
      updateSub.unsubscribe();
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
          {storageImages.length !== 1 &&
            dimensionsImages >= 0 &&
            dimensionsImages < storageImages.length - 1 && (
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
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                      borderRadius: 5,
                      backgroundColor: "#fff",
                    }}
                    source={{ uri: item.url }}
                  />

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
                      <ActivityIndicator color={`#fff`} size={`large`} />
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
                      },
                      global.mainBgColor,
                    ]}
                    onPress={() => {
                      setOpen(!open);
                      setImageView(item);
                    }}
                  >
                    <Text
                      style={[
                        { fontFamily: "medium", fontSize: 17 },
                        global.white,
                      ]}
                    >
                      {item.key + 1}/{storageImages.length}
                    </Text>
                    <MaterialCommunityIcons
                      name="image-search-outline"
                      size={20}
                      color="white"
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
                  flexDirection: "row",
                  padding: 8,
                  borderRadius: 5,
                  opacity: 0.95,
                  alignItems: "center",
                  marginBottom: 5,
                },
                global.mainBgColor,
              ]}
              onPress={selectImages}
            >
              <Text style={[{ fontFamily: "medium" }, global.white]}>
                Agregar mas fotos
              </Text>
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={23}
                color="white"
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
            <Text style={{ fontFamily: "light" }}>
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
          <Text style={{ fontSize: 26, fontFamily: "thin" }}>
            {item.favorites?.items?.length}
          </Text>
          <Text style={{ fontSize: 22, fontFamily: "thin" }}>Favoritos</Text>
        </View>
        <View style={[styles.line, global.bgWhiteSmoke]} />
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() =>
            onOpenMap(item.coordinates.lat, item.coordinates.lon, item.name)
          }
        >
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 40,
            }}
          >
            <MapView
              style={{
                width: "100%",
                height: 220,
              }}
              initialRegion={{
                latitude: item.coordinates.lat,
                longitude: item.coordinates.lon,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              scrollEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: item.coordinates.lat,
                  longitude: item.coordinates.lon,
                }}
                title={item.name}
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
                },
                global.mainBgColor,
              ]}
            >
              <EvilIcons name="share-google" size={25} color="white" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "light", fontSize: 16 }}>
                Compartir
              </Text>
              <Text style={{ fontFamily: "thin", fontSize: 12, width: 150 }}>
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
            getPdf().then((fileUri) => {
              onSharePdf(fileUri);
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
                },
                global.mainBgColor,
              ]}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={25}
                color="white"
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "light", fontSize: 16 }}>
                Descargar QR
              </Text>
              <Text style={{ fontFamily: "thin", fontSize: 12, width: 150 }}>
                Descarga tu QR para pegarlo en donde quieras
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
          <Text style={{ fontSize: 22, fontFamily: "thinItalic", padding: 10 }}>
            Datos
          </Text>
          <View style={[styles.line, global.bgWhiteSmoke]} />
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
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                Razon social
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "lightItalic" }]}>
                {item.name}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
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
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                Actividad laboral
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "lightItalic" }]}>
                {item.activity}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
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
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                Telefono
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "lightItalic" }]}>
                {item.phone}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
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
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                WhatsApp
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "lightItalic" }]}>
                {item.whatsapp}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
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
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                Correo
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "lightItalic" }]}>
                {item.email}
              </Text>
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <MaterialCommunityIcons name="web" size={24} color="#1f1f1f" /> */}
              <Text
                style={[
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                Web
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  { fontSize: 13, fontFamily: "lightItalic", marginRight: 5 },
                ]}
              >
                Link
              </Text>
              <AntDesign name="link" size={16} color="#1f1f1f" />
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
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
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                Instagram
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  { fontSize: 13, fontFamily: "lightItalic", marginRight: 5 },
                ]}
              >
                Link
              </Text>
              <AntDesign name="link" size={16} color="#1f1f1f" />
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
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
                  { fontFamily: "thinItalic", fontSize: 15 },
                  global.midGray,
                ]}
              >
                Facebook
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  { fontSize: 13, fontFamily: "lightItalic", marginRight: 5 },
                ]}
              >
                Link
              </Text>
              <AntDesign name="link" size={16} color="#1f1f1f" />
            </View>
          </View>
          <View style={[styles.line, global.bgWhiteSmoke]} />
        </View>
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
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View
                  style={[
                    styles.modalContent,
                    {
                      height: imageView?.url ? 520 : 450,
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
                    <Image
                      style={{
                        width: "100%",
                        height: "60%",
                        resizeMode: "cover",
                        borderRadius: 5,
                      }}
                      source={{
                        uri: imageView?.url ? imageView?.url : imageView?.uri,
                      }}
                    />

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
                            flex: 1,
                            flexDirection: "row",
                            borderColor: "#444",
                            borderWidth: 0.4,
                            paddingHorizontal: 10,
                            borderRadius: 8,
                            marginTop: 10,
                          }}
                        >
                          <TextInput
                            value={
                              imageView?.key === 0
                                ? item.description
                                : imageView?.description
                            }
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
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            columnGap: 5,
                          }}
                        >
                          <TouchableOpacity
                            style={[
                              global.bgYellow,
                              {
                                borderRadius: 8,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: 49,
                                marginTop: 10,
                                flexDirection: "row",
                              },
                            ]}
                            onPress={() =>
                              changeImage(imageView, descriptionImage)
                            }
                          >
                            <Text
                              style={[
                                global.white,
                                {
                                  fontFamily: "medium",
                                  fontSize: 14,
                                  marginRight: 3,
                                },
                              ]}
                            >
                              {`Cambiar`}
                            </Text>
                            <MaterialCommunityIcons
                              name="image-edit-outline"
                              size={24}
                              color="white"
                            />
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
                            borderColor: "#444",
                            borderWidth: 0.4,
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
                            },
                          ]}
                          onPress={() =>
                            uploadImages(imageView?.base64, descriptionImage)
                          }
                        >
                          <Text
                            style={[
                              global.white,
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
          </TouchableWithoutFeedback>
        </Modal>
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
          <ActivityIndicator color={`#fff`} size={`large`} />
        </View>
      )}
    </View>
  );
};

export default Page;
