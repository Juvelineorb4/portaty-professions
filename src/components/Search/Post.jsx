import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Fontisto } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import { userAuthenticated } from "@/atoms";

const Post = ({ data, image, styled }) => {
  const navigation = useNavigation();
  const [save, setSave] = useState("");
  const onCreateFavorite = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const favorites = await API.graphql({
        query: customFavorites.createFavorites,
        variables: {
          input: {
            businessID: data.item.id,
            userID: attributes["custom:userTableID"],
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
    setSave("");
  };

  const fetchFavorite = () => {
    setSave(data.favorite)
  };

  useLayoutEffect(() => {
    fetchFavorite();
  }, []);
  return (
    <TouchableOpacity
      style={[
        styled,
        {
          position: "relative",
        },
      ]}
      onPress={() =>
        navigation.navigate("SearchPost", {
          data: {
            item: data.item,
            image: image,
          },
        })
      }
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          borderRadius: 2,
        }}
        source={{ uri: image }}
      />
      {save ? (
        <TouchableOpacity
          onPress={() => {
            onDeleteFavorite();
          }}
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
          }}
        >
          <Fontisto name="heart" size={23} color="#e31b23" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            onCreateFavorite();
          }}
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
          }}
        >
          <Fontisto name="heart-alt" size={23} color="#ffffff" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Post;
