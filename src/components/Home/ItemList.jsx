import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Ionicons } from "@expo/vector-icons";
const ItemList = ({ data, number, styled }) => {
  const navigation = useNavigation();
  const [save, setSave] = useState("");
  const onDeleteFavorite = async () => {
    const favorites = await API.graphql({
      query: customFavorites.deleteFavorites,
      variables: {
        input: {
          id: data.id,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(favorites);
    setSave("");
  };
  const fetchFavorite = () => {
    setSave(data.id);
  };
  useLayoutEffect(() => {
    fetchFavorite();
  }, []);
  if (save)
    return (
    <TouchableOpacity
      style={styled.column}
      onPress={() =>
        navigation.navigate("FavoritePage", {
          data: {
            item: data,
            image: `https://picsum.photos/id/${100 + number}/200/300`,
          },
        })
      }
    >
      <View
        style={{
          justifyContent: "space-between",
          marginLeft: 10,
        }}
      >
        <Image
          style={{
            width: 120,
            height: 100,
            resizeMode: "cover",
            borderRadius: 2,
          }}
          source={{ uri: `https://picsum.photos/id/${100 + number}/200/300` }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="lock-open-outline" size={12} color="black" />
            <Text style={{ fontSize: 12, fontFamily: "light", marginLeft: 1 }}>Anclar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={onDeleteFavorite}
          >
            <Ionicons name="trash-outline" size={12} color="black" />
            <Text style={{ fontSize: 12, fontFamily: "light", marginLeft: 1 }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingTop: 5,
            paddingBottom: 15,
          }}
        >
          <View>
            <Text style={{ fontSize: 13, fontFamily: "light" }}>
              Razon Social
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "thin" }}>
              {data.business.name}
            </Text>
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 13, fontFamily: "light" }}>
              Actividad Laboral
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "thin" }}>
              {data.business.activity}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingTop: 5,
            paddingBottom: 15,
          }}
        >
          <View>
            <Text style={{ fontSize: 13, fontFamily: "light" }}>Tags</Text>

            {data.business.tags.map((item, index) => (
              <Text
                key={index}
                style={{ fontSize: 11, fontFamily: "thin", paddingVertical: 2 }}
              >
                {item}
              </Text>
            ))}
          </View>
          <Image
            style={{
              width: 45,
              height: 45,
              resizeMode: "cover",
              borderRadius: 2,
              // marginLeft: 45,
              // marginTop: 5,
              transform: [{ rotate: "180deg" }],
            }}
            source={require("@/utils/images/arrow_back.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemList;
