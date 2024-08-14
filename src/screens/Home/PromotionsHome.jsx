import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Promotions from "@/components/Home/Promotions";
import { userAuthenticated, mapUser } from "@/atoms";
import { useRecoilValue } from "recoil";
import { API } from "aws-amplify";
import styles from "@/utils/styles/Promotions.js";
import CustomButton from "@/components/CustomButton";
import * as queries from "@/graphql/CustomQueries/Favorites";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PromotionsHome = ({ login, promotion, promotionID }) => {
  const navigation = useNavigation();
  const global = require("@/utils/styles/global.js");
  const userAuth = useRecoilValue(userAuthenticated);
  const userLocation = useRecoilValue(mapUser);
  const [stories, setStories] = useState([]);
  const [business, setBusiness] = useState(false);
  const [businessId, setBusinessId] = useState(null);
  const fetchBusiness = async () => {
    try {
      const result = await API.graphql({
        query: queries.getUserBusiness,
        variables: {
          id: userAuth?.attributes["custom:userTableID"],
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      if (result.data.getUsers.business.items.length !== 0) {
        setBusinessId({
          id: result.data.getUsers.business.items[0]?.id,
        });
        setBusiness(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPromotions = async () => {
    const api = "api-portaty";
    const path = "/listPromotions";
    const params = {
      headers: {},
      queryStringParameters: {
        location: JSON.stringify({
          lat: userLocation?.latitude,
          lon: userLocation?.longitude,
        }),
      },
    };
    try {
      const response = await API.get(api, path, params);
      const updateStories = () => {
        const result = response?.data?.map((item, index) => {
          const list = item?.data?.images
            ?.map((image) => JSON.parse(image))
            .sort((a, b) => a.key - b.key);
          const stories = item?.stories?.map((story, index) => {
            if (story?.text) {
              return {
                ...story,
                renderFooter: () => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 250,
                      alignSelf: "center",
                      bottom: 75,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 150,
                        alignSelf: "center",
                        backgroundColor: "#1f1f1f7D",
                        bottom: 15,
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "medium",
                          color: "white",
                          fontSize: 16,
                          textAlign: "center",
                        }}
                      >
                        {story?.text}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        global.mainBgColor,
                        {
                          padding: 10,
                          borderRadius: 5,
                        },
                      ]}
                      onPress={() => {
                        console.log("Story");
                        navigation.navigate("Search_Tab", {
                          screen: "SearchPost",
                          params: {
                            data: {
                              item: item?.data,
                              images: list,
                            },
                          },
                        });
                        console.log("Story 2");
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "bold",
                          color: "#1f1f1f",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        Visitar negocio
                      </Text>
                    </TouchableOpacity>
                  </View>
                ),
              };
            }
          });
          return {
            ...item,
            stories,
          };
        });
        return setStories(result);
      };
      updateStories();
    } catch (error) {
      console.log("ERROR AL CONSULTAR PROMOCIONES: ", error.response.data);
    }
  };
  useEffect(() => {
    if (userAuth) {
      fetchBusiness();
      fetchPromotions();
    }
  }, [userAuth]);

  if (userAuth)
    return (
      <View style={[global.bgWhite, { flex: 1, padding: 20, marginTop: -20 }]}>
        <Text
          style={{
            fontFamily: "lightItalic",
            fontSize: 20,
            paddingBottom: 10,
          }}
        >
          Destacados
        </Text>
        <View style={[styles.line, global.bgMidGray]} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {business && (
            <TouchableOpacity
              style={{
                width: 65,
                height: 65,
                borderColor: "#ffb703",
                borderWidth: 2,
                borderRadius: 50,
                marginBottom: 33,
                marginRight: 7,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fafafa",
              }}
              onPress={() => promotion(businessId)}
            >
              <AntDesign name="plus" size={36} color="#ffb703" />
            </TouchableOpacity>
          )}
          <Promotions
            data={stories}
            showPromotion={promotionID ? promotionID : ""}
          />
        </View>
      </View>
    );

  if (!userAuth)
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 80,
          },
          global.bgWhite,
        ]}
      >
        <Text
          style={{ fontSize: 16, fontFamily: "light", textAlign: "center" }}
        >
          Ingresa a tu cuenta para ver todas las promociones
        </Text>
        <CustomButton
          text={`Iniciar sesion`}
          handlePress={() => {
            login();
          }}
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );
};

export default PromotionsHome;