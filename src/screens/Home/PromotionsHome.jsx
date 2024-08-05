import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Promotions from "@/components/Home/Promotions";
import { userAuthenticated } from "@/atoms";
import { useRecoilValue } from "recoil";
import { API } from "aws-amplify";
import styles from "@/utils/styles/Promotions.js";
import CustomButton from "@/components/CustomButton";
import * as queries from "@/graphql/CustomQueries/Favorites";
import { AntDesign } from "@expo/vector-icons";

const PromotionsHome = ({ login, promotion, promotionID }) => {
  console.log("PROMOTION: ", promotionID);
  const global = require("@/utils/styles/global.js");
  const userAuth = useRecoilValue(userAuthenticated);
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
    };
    try {
      const response = await API.get(api, path, params);
      const updateStories = () => {
        const result = response?.data?.map((item, index) => {
          const stories = item?.stories?.map((story, index) => {
            if (story?.text) {
              return {
                ...story,
                renderFooter: () => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "medium",
                        color: "white",
                        bottom: 75,
                        fontSize: 16,
                      }}
                    >
                      {story?.text}
                    </Text>
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
