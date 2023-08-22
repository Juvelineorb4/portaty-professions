import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import { useNavigation } from "@react-navigation/native";

const List = ({}) => {
  const navigation = useNavigation();
  // const {image} = business
  const data = [
    {
      id: 1,
      text: "",
    },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 6, text: "" },
    { id: 7, text: "" },
    { id: 8, text: "" },
    { id: 9, text: "" },
    { id: 10, text: "" },
    { id: 11, text: "" },
    { id: 12, text: "" },
    { id: 13, text: "" },
    { id: 14, text: "" },
    { id: 15, text: "" },
  ];
  return (
    <View style={styles.container}>
      {data.map((post, index) => (
        <TouchableOpacity
          key={post.id}
          style={styles.columnList}
          // onPress={() =>
          //   navigation.navigate(post.link, {
          //     data: post.item
          //   })
          // }
        >
          <Image
            style={{
              width: 90,
              height: 90,
              resizeMode: "cover",
              borderRadius: 2,
              marginLeft: 10,
            }}
            source={{ uri: `https://picsum.photos/id/${100 + index}/200/300` }}
          />

          <View style={{ marginLeft: 5, marginRight: 10 }}>
            <View>
              <Text style={{ fontSize: 13, fontFamily: "light" }}>Nombre</Text>
              <Text style={{ fontSize: 12, fontFamily: "thin" }}>
                Portaty C.A
              </Text>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 13, fontFamily: "light" }}>
                Actividad Laboral
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "thin" }}>
                Restaurante
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 13, fontFamily: "light" }}>Tags</Text>
              <Text style={{ fontSize: 12, fontFamily: "thin" }}>
                Restaurante, Bebida, Comida
              </Text>
            </View>
            <Image
            style={{
              width: 45,
              height: 45,
              resizeMode: "cover",
              borderRadius: 2,
              marginLeft: 45,
              marginTop: 5,
              transform: [{rotate: '180deg'}]
            }}
            source={require('@/utils/images/arrow_back.png')}
          />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default List;
