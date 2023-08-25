import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import { useNavigation } from "@react-navigation/native";

const List = ({data}) => {
  const navigation = useNavigation();
  // const {image} = business
  
  return (
    <View style={styles.container}>
      {data.map((post, index) => (
        <TouchableOpacity
          key={index}
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
