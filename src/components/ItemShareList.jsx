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


  const ItemShareList = ({ data, styled }) => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
      console.log(data)
    }, []);
    if (data)
      return (
        <TouchableOpacity
          style={styled.column}
          onPress={() =>
            navigation.navigate("SharePage", {
              data: {
                item: data,
                image: `https://picsum.photos/id/1/200/300`,
              },
            })
          }
        >
          <View
            style={{
              justifyContent: "space-between",
              marginLeft: 10,
              // alignItems: 'center',
              // justifyContent: 'center'
            }}
          >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderRadius: 2,
                }}
                source={{ uri: `https://picsum.photos/id/1/200/300` }}
              />
           
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <TouchableOpacity  style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
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
                marginLeft: 20
              }}
            >
              <View>
                <Text style={{ fontSize: 13, fontFamily: "light" }}>
                  Razon Social
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "thin" }}>
                  {data.business.name}
                </Text>
              </View>
              <View style={{}}>
                <Text style={{ fontSize: 13, fontFamily: "light" }}>
                  Actividad Laboral
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "thin" }}>
                  {data.business.activity}
                </Text>
              </View>
            </View>
            <View style={{height: 30}}>
  
            </View>
          </View>
        </TouchableOpacity>
      );
  };
  
  export default ItemShareList;
  