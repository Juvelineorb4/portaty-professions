import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridSearch.module.css";
import { useNavigation } from "@react-navigation/native";

const BigLeftGrid = ({ data, value }) => {
  const navigation = useNavigation();
  const number = value * 2
  return (
    <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
      <View style={styles.bigLeftContainer}>
        {data[0] && <TouchableOpacity
          style={styles.bigLeftColumn}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: {
                  item: data[0],
                  image: `https://picsum.photos/id/${number + 1}/200/300`
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
            source={{ uri: `https://picsum.photos/id/${number + 1}/200/300` }}
          />
        </TouchableOpacity>}
      </View>
      <View style={styles.leftContainer}>
        {data[1] && <TouchableOpacity
          style={styles.tinyLeftColumn}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: {
                  item: data[1],
                  image: `https://picsum.photos/id/${number + 2}/200/300`
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
            source={{ uri: `https://picsum.photos/id/${number + 2}/200/300` }}
          />
        </TouchableOpacity>}
        {data[2] && <TouchableOpacity
          style={styles.tinyLeftColumn}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: {
                  item: data[2],
                  image: `https://picsum.photos/id/${number + 3}/200/300`
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
            source={{ uri: `https://picsum.photos/id/${number + 3}/200/300` }}
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

export default BigLeftGrid;
