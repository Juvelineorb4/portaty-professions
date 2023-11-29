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
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
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

const Page = ({ route, navigation }) => {
  const {
    data: { item, image },
  } = route.params;
  const [selectedImages, setSelectedImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageView, setImageView] = useState(null);
  const [storageImages, setStorageImages] = useState([]);
  const [arrayImages, setArrayImages] = useState(item?.images);
  const [visible, setVisible] = useState(false);
  const global = require("@/utils/styles/global.js");

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

  const selectImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      if (result.assets.length > 4) {
        setVisible(true);
      } else {
        setSelectedImages(result.assets.map((i) => i.uri));
        uploadImages(result.assets);
      }
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
  const uploadImages = async (images) => {
    images.forEach(async (image, index) => {
      const blob = await urlToBlob(image.uri);
      try {
        const { key } = await Storage.put(
          `business/${item.id}/incoming/image_${image.assetId}.jpg`,
          blob,
          {
            level: "protected",
            contentType: "image/jpeg",
            metadata: {
              businessid: item.id,
              imagetype: "extras",
              key: index + 1,
            },
          }
        );
        console.log(key);
        navigation.navigate("Unprofile");
      } catch (error) {
        console.log("aqui", error);
      }
    });
  };

  const AllImages = async () => {
    console.log(arrayImages);
    try {
      const list = arrayImages
        .map((image) => JSON.parse(image))
        .sort((a, b) => a.key - b.key);
      // console.log(list)
      setStorageImages(list);
    } catch (error) {
      console.log(error);
    }
  };

  const changeImage = async (image) => {
    console.log(image.key);
    let pathId = image.url.split("image_")[1].split(".")[0];

    console.log(pathId);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log("Antes", result.assets[0].uri);

    if (!result.canceled) {
      const blob = await urlToBlob(result.assets[0].uri);
      try {
        const { key } = await Storage.put(
          `business/${item.id}/incoming/image_${pathId}.jpg`,
          blob,
          {
            level: "protected",
            contentType: "image/jpeg",
            metadata: {
              businessid: item.id,
              imagetype: "extras",
              key: image?.key,
            },
          }
        );
        console.log(key);

        let newArray = arrayImages;
        newArray = newArray.map(JSON.parse);
        let index = newArray.findIndex((obj) => obj.key === image.key);
        if (index !== -1) {
          newArray.splice(index, 1);
        }
        newArray = newArray.map(JSON.stringify);

        const update = await API.graphql({
          query: mutation.updateBusiness,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              id: item.id,
              images: newArray,
            },
          },
        });
        console.log(update.data.updateBusiness.images);
        setOpen(!open);
        setImageView(null);
        navigation.navigate("Unprofile");
      } catch (error) {
        console.log("aqui", error);
      }
    }
  };

  const deleteImage = async (image) => {
    let path = image.url.substring(image.url.indexOf("business"));

    try {
      const result = await Storage.remove(path, {
        level: "protected",
      });

      let newArray = arrayImages;
      newArray = newArray.map(JSON.parse);
      let index = newArray.findIndex((obj) => obj.key === image.key);
      if (index !== -1) {
        newArray.splice(index, 1);
      }
      newArray = newArray.map(JSON.stringify);

      const update = await API.graphql({
        query: mutation.updateBusiness,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            id: item.id,
            images: newArray,
          },
        },
      });
      console.log(update);
      setOpen(!open);
      setImageView(null);
    } catch (error) {
      console.log(error);
    }

    // Convertir los objetos de nuevo a cadenas JSON
  };
  useEffect(() => {
    AllImages();
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
    >
      <ScrollView style={{ flex: 1, marginTop: 30 }}>
        <View
          style={[
            {
              flex: 1,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {storageImages.length !== 0 && (
            <FlatList
              horizontal
              data={storageImages}
              renderItem={({ item, index }) => (
                <View
                  style={{ flex: 1, width: 300, height: 250, marginRight: 5 }}
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
                    <Text style={[{ fontFamily: "medium" }, global.white]}>
                      Ver foto
                    </Text>
                    <MaterialCommunityIcons
                      name="image-search-outline"
                      size={24}
                      color="white"
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
          )}
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
        </View>
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
          onPress={() => {
            navigation.navigate("ViewQR", {
              id: `https://www.portaty.com/share/business?id=${item.id}`,
              name: item.name,
            });
          }}
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
              <Text style={{ fontFamily: "light", fontSize: 16 }}>Ver QR</Text>
              <Text style={{ fontFamily: "thin", fontSize: 12, width: 150 }}>
                Compartelo en formato QR para pegarlo en donde quieras
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
                <View style={styles.modalContent}>
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
                        height: "70%",
                        resizeMode: "cover",
                        borderRadius: 5,
                      }}
                      source={{ uri: imageView?.url }}
                    />
                    <View style={{ flex: 1, paddingVertical: 15 }}>
                      {imageView?.key === "0" && (
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
                          onPress={() => changeImage(imageView)}
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
                        {imageView?.key !== "0" && (
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
    </View>
  );
};

export default Page;
