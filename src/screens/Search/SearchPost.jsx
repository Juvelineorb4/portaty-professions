import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Share, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import * as customSearch from "@/graphql/CustomQueries/Search";
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
  Fontisto
} from "@expo/vector-icons";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";

const SearchPost = ({ route }) => {
  const [post, setPost] = useState([])
  const [save, setSave] = useState('')
  const global = require("@/utils/styles/global.js");
  const {
    data: { item, image },
  } = route.params;
  const onCreateFavorite = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const favorites = await API.graphql({
        query: customFavorites.createFavorites,
        variables: {
          input: {
            businessID: post.id,
            userID: attributes["custom:userTableID"],
            position: 0
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(favorites.data.createFavorites);
      setSave(favorites.data.createFavorites.id);
    } catch (error) {
      console.log(error);
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
    console.log(favorites);
    setSave('')
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
      setPost(business.data.getBusiness);
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
            userID: {eq: attributes["custom:userTableID"]},
        },
      });
      if (favorite.data.favoritesByBusinessID.items.length !== 0 ) setSave(favorite.data.favoritesByBusinessID.items[0].id);
    } catch (error) {
      console.log(error);
    }
  };
  const onShare = async () => {
    try {
      await Share.share({
        message:
          `Han compartido contigo un negocio, da click para mirarlo exp://192.168.250.1:19000/--/share/business?id=${item.id}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  const openCall = () =>{
    const url=`tel://${post.phone}`
    Linking.openURL(url)
  }
  useEffect(() => {
    fetchFavorite()
    fetchData()
  }, [])
  
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
          <View
            style={{
              width: 330,
              height: 250,
              borderRadius: 5,
              borderColor: "#efeded",
              borderWidth: 1,
              overflow: "hidden",
              padding: 10,
              marginBottom: 20,
              marginTop: 20
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
              source={{ uri: image }}
            />
          </View>
          {/* <View>
          <Fontisto name="heart" size={23} color="#e31b23" />
          <Text>Agregado a favoritos</Text>

          </View> */}
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 26, fontFamily: "thin" }}>{post.favorites?.items.length}</Text>
            <Text style={{ fontSize: 22, fontFamily: "thin" }}>Favoritos</Text>
          </View>
          <TouchableOpacity
            style={[save === '' ? global.mainBgColor : global.bgWhiteSmoke, { padding: 10, borderRadius: 8 }]}
            onPress={() => {
              if(save === '') {
                onCreateFavorite()
              } else {
                onDeleteFavorite()
              }
            }}
          >
            <Text style={[{ fontSize: 14, fontFamily: "thin" }, save === '' ? global.white : global.black]}>
              {save === '' ? 'Agregar a favoritos' : 'Eliminar de favoritos'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.line, global.bgWhiteSmoke]} />
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
                },
                global.mainBgColor,
              ]}
            >
              <Feather name="phone-call" size={17} color="white" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "light", fontSize: 16 }}>Llamar</Text>
              <Text style={{ fontFamily: "thin", fontSize: 12, width: 150 }}>
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
                {post.name}
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
                {post.activity}
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
                  { fontFamily: "thinItalic", fontSize: 15},
                  global.midGray,
                ]}
              >
                Telefono
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "lightItalic" }]}>
                {post.phone}
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
                  { fontFamily: "thinItalic", fontSize: 15},
                  global.midGray,
                ]}
              >
                WhatsApp
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 13, fontFamily: "lightItalic" }]}>
                {post.whatsapp}
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
                {post.email}
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
      </ScrollView>
    </View>
  );
};

export default SearchPost;
