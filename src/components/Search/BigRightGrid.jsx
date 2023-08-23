import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridSearch.module.css";
import { useNavigation } from "@react-navigation/native";

const BigRightGrid = ({ data, value }) => {
  const navigation = useNavigation();
  const number = value * 2

  return (
    <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
      <View style={styles.rightContainer}>
        {data[0] && <TouchableOpacity
          style={styles.tinyRightColumn}
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
        {data[1] && <TouchableOpacity
          style={styles.tinyRightColumn}
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
      </View>
      <View style={styles.bigRightContainer}>
        {data[2] && <TouchableOpacity
          style={styles.bigRightColumn}
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

export default BigRightGrid;
