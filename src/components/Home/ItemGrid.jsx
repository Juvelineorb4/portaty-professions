import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Ionicons } from '@expo/vector-icons'; 
const ItemGrid = ({ data, number, styled }) => {
  const [save, setSave] = useState("");
  const [active, setActive] = useState(false);
  const navigation = useNavigation();
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
    console.log(favorites)
    setSave("");
  };
  const fetchFavorite = () => {
    setSave(data.id);
  };
  const openOptions = () => {
    setActive(!active);
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
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            // marginLeft: 5,
            borderRadius: 2,
          }}
          source={{ uri: `https://picsum.photos/id/${100 + number}/200/300` }}
        />
        <TouchableOpacity style={styled.options} onPress={openOptions}>
        <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
          {active && (
            <View style={styled.modal}>
              <Text style={styled.text}>Anclar</Text>
              <TouchableOpacity onPress={onDeleteFavorite}>
                <Text style={styled.text}>Eliminar</Text>
                </TouchableOpacity> 
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
};

export default ItemGrid;
