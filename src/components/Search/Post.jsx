import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API } from "aws-amplify";
import styles from "@/utils/styles/Post.module.css";
import * as customSearch from "@/graphql/CustomQueries/Search";

const Post = ({ data, image, styled }) => {
  const global = require("@/utils/styles/global.js");
  const navigation = useNavigation();
  const [post, setPost] = useState([]);
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

  const roundNumber = (num) => {
    numero = parseFloat(num);
    // Usar toFixed para mostrar dos decimales
    return numero.toFixed(1);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);
  return (
    <TouchableOpacity
      style={[
        styled,
        {
          position: "relative",
        },
      ]}
      onPress={() => {
        setModalVisible(!modalVisible);
        // navigation.navigate("SearchPost", {
        //   data: {
        //     item: data.id,
        //     image: image,
        //   },
        // });
      }}
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
                  <Text style={{ fontFamily: "regular", fontSize: 18 }}>
                    {post.favorites?.items.length}
                  </Text>
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
      <Text
        style={{ position: "absolute", color: "white", left: 5, bottom: 5 }}
      >
        Dist: {roundNumber(data.distance)}Km
      </Text>
    </TouchableOpacity>
  );
};

export default Post;
