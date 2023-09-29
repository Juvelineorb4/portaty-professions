import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/CustomQueries/Favorites";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Fontisto } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import { userAuthenticated } from "@/atoms";
import styles from "@/utils/styles/Post.module.css";
import * as customSearch from "@/graphql/CustomQueries/Search";

const Post = ({ data, image, styled }) => {
  const global = require("@/utils/styles/global.js");
  const navigation = useNavigation();
  const [post, setPost] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const fetchData = async () => {
    try {
      const business = await API.graphql({
        query: customSearch.getBusinessFavorites,
        variables: {
            id: data.id,
        },
        authMode: "AWS_IAM",
      });
      setPost(business.data.getBusiness);
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    fetchData()
  }, []);
  return (
    <TouchableOpacity
      style={[
        styled,
        {
          position: "relative",
        },
      ]}
      onPress={() => setModalVisible(!modalVisible)}
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
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalTop}>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: "contain",
                  }}
                  source={require("@/utils/images/arrow_back.png")}
                />
              </Pressable>
              <Text style={styles.modalText}>{`Vista previa del negocio`}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  width: 260,
                  height: 260,
                  resizeMode: "cover",
                  borderRadius: 5,
                }}
                source={{ uri: image }}
              />
              <View style={{ paddingVertical: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontFamily: "light", fontSize: 18 }}>
                    Distancia de ti:
                  </Text>
                  <Text style={{ fontFamily: "regular", fontSize: 18 }}>
                    {data.distance.toFixed(2)}km
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontFamily: "light", fontSize: 18 }}>
                    Favoritos:
                  </Text>
                  <Text style={{ fontFamily: "regular", fontSize: 18 }}>{post.favorites?.items.length}</Text>
                </View>
              </View>
            </View>
            <View style={{}}>
              <TouchableOpacity
                style={[
                  global.mainBgColor,
                  {
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 49,
                    marginTop: 10,
                  },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("SearchPost", {
                    data: {
                      item: data,
                      image: image,
                    },
                  });
                }}
              >
                <Text
                  style={[global.white, { fontFamily: "medium", fontSize: 14 }]}
                >
                  {`Ver`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default Post;
