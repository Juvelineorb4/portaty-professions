import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import styles from "@/utils/styles/Interactions.js";
import ModalInteractions from "./ModalInteractions";
import { useRecoilValue } from "recoil";
import { userAuthenticated } from "@/atoms";
const CustomInteractions = ({ route }) => {
  const global = require("@/utils/styles/global.js");
  const comments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [active, setActive] = useState(false);
  const { business, list } = route.params;
  const userAuth = useRecoilValue(userAuthenticated);
  return (
    <ScrollView
      style={[
        {
          padding: 20,
          flex: 1,
        },
        global.bgWhite,
      ]}
    >
      <Text
        style={{
          fontFamily: "mediumItalic",
          fontSize: 14,
          marginTop: 20,
          marginBottom: 5,
        }}
      >
        Hay {list.length} reseñas en total
      </Text>
      <ScrollView
        style={{
          flex: 1,
          height: 475,
          //   marginTop: 30,
          borderRadius: 8,
          borderColor: "#1f1f1f",
          borderWidth: 0.5,
        }}
      >
        <View
          style={
            {
              // paddingVertical: 20
            }
          }
        >
          {list.map((item, index) => (
            <View
              style={{
                margin: 10,
                backgroundColor: "#efeded59",
                padding: 15,
                borderRadius: 8,
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 13,
                    marginRight: 3,
                  }}
                >
                  {item.stars} de 5
                </Text>
                <Ionicons name="star" size={12} color="#ffb703" />
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: 12,
                    marginLeft: 5,
                  }}
                >
                  {item.user.name} {item.user.lastName}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 13,
                }}
              >
                {item.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {userAuth && (
        <CustomButton
          text={`Deja tu valoracion y comentario`}
          handlePress={() => setActive(true)}
          textStyles={[styles.textButton, global.black]}
          buttonStyles={[styles.button, global.bgYellow]}
        />
      )}

      <ModalInteractions
        close={() => setActive(false)}
        open={active}
        businessID={business.businessID ? business.businessID : business.id}
      />
    </ScrollView>
  );
};

export default CustomInteractions;
