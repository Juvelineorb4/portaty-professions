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
} from "react-native";
import React, { useEffect, useState } from "react";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import { useNavigation } from "@react-navigation/native";

const ItemNew = ({ data, page }) => {
  const navigation = useNavigation();
  const [post, setPost] = useState([]);
  const [time, setTime] = useState(null);

  const fetchData = async () => {
    try {
      const business = await API.graphql({
        query: queries.getPostBusiness,
        variables: {
          id: data.businessid,
        },
        authMode: "AWS_IAM",
      });
      setPost(business?.data?.getBusiness);
    } catch (error) {
      console.log(error);
    }
  };
  const getTime = () => {
    let fechaProporcionada = new Date(data.date);
    let fechaActual = new Date();
    let diferencia = fechaActual - fechaProporcionada;

    let minutos = Math.floor(diferencia / 1000 / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    if (minutos < 60) {
      return setTime({ date: minutos, formate: "minuto" });
    } else if (horas < 24) {
      return setTime({ date: horas, formate: "hora" });
    } else if (dias <= 6) {
      return setTime({ date: dias, formate: "dia" });
    } else {
      let fechaFormateada =
        fechaProporcionada.getUTCFullYear() +
        "-" +
        (fechaProporcionada.getUTCMonth() + 1) +
        "-" +
        fechaProporcionada.getUTCDate();
      return setTime({ date: fechaFormateada, formate: "fecha" });
    }
  };

  useEffect(() => {
    fetchData();
    getTime();
    console.log(page[0])
  }, []);

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#9d9d9d",
        borderWidth: 0.5,
        borderRadius: 8,
      }}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("FavoritePage", {
          data: {
            item: page[0],
            image: JSON.parse(page[0].business.images[0]).url,
          },
        })
      }
    >
        <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
      
      <Image
        style={{
          width: 20,
          height: 20,
          resizeMode: "contain",
          borderRadius: 50,
        }}
        source={{
          uri: post?.thumbnail,
        }}
      />
      <Text
        style={{
          fontFamily: "light",
          fontSize: 13,
          marginLeft: 5,
          color: '#444'
        }}
      >
        {post?.name} publico una nueva foto{" "}
      </Text>
    </View>
      
      <Image
        style={{
          width: "100%",
          height: 285,
          resizeMode: "cover",
          borderRadius: 5,
        }}
        source={{
          uri: data.url,
        }}
      />
      <Text
          style={{
            fontFamily: "lightItalic",
            fontSize: 11,
            marginTop: 3,
            alignSelf: 'flex-end',
          }}
        >
          Publicado{' '}
          {time?.formate !== "fecha" ? `hace` : "el"} {time?.date}{" "}
          {time?.formate !== "fecha" && time?.formate}
          {time?.formate !== "fecha" && time?.date >= 2 ? `s` : ``}
        </Text>
    </TouchableOpacity>
  );
};

export default ItemNew;
