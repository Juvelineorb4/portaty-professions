import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const ItemProfile = ({ data, identityID, styled }) => {
  const navigation = useNavigation();
  if (identityID)
  console.log("DATA ITEM: ", data.images)
    return (
      <TouchableOpacity
        style={styled.column}
        onPress={() =>
          navigation.navigate("Page", {
            data: {
              item: data,
              image: JSON.parse(data.images[0]).url,
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
                width: 100,
                height: 100,
                resizeMode: "cover",
                borderRadius: 2,
              }}
              source={{ uri: data?.thumbnail }}
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
              <Ionicons name="trash-outline" size={12} color="black" />
              <Text
                style={{ fontSize: 12, fontFamily: "light", marginLeft: 1 }}
              >
                Eliminar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="eye-outline" size={12} color="black" />
              <Text
                style={{ fontSize: 12, fontFamily: "light", marginLeft: 1 }}
              >
                Ver
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              // flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 20,
            }}
          >
            <View>
              <Text style={{ fontSize: 13, fontFamily: "light" }}>
                Razon Social
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "thin" }}>
                {data.name}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 13, fontFamily: "light" }}>
                Actividad Laboral
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "thin" }}>
                {data.activity}
              </Text>
            </View>
          </View>
          <View style={{ height: 30 }}></View>
        </View>
      </TouchableOpacity>
    );
};

export default ItemProfile;
