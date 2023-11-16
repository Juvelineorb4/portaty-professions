import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Ionicons } from "@expo/vector-icons";
const ItemList = ({ data, number, styled }) => {
  const navigation = useNavigation();
  const [save, setSave] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(data.business.image);
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
              image: data.business.image,
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
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 2,
              }}
              source={{ uri: data.business.thumbnail }}
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
              <Text
                style={{ fontSize: 12, fontFamily: "light", marginLeft: 1 }}
              >
                Anclar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={onDeleteFavorite}
            >
              <Ionicons name="trash-outline" size={12} color="black" />
              <Text
                style={{ fontSize: 12, fontFamily: "light", marginLeft: 1 }}
              >
                Eliminar
              </Text>
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
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginRight: 10,
              position: "relative",
              top: 10,
            }}
          >
            <Ionicons name="eye-outline" size={12} color="black" />
            <Text style={{ fontSize: 12, fontFamily: "light", marginLeft: 1 }}>
              Ver
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
};

export default ItemList;
