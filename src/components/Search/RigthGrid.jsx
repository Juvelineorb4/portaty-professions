import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridSearch.module.css";
import { useNavigation } from "@react-navigation/native";

const RightGrid = ({ data, value }) => {
  const navigation = useNavigation();
  const number = value * 2
  return (
    <View style={{ paddingHorizontal: 10, flexDirection: 'row'}}>
      <View style={styles.rightGridContainer}>
        <TouchableOpacity
          style={styles.column}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: data[0],
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
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: data[1],
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
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: data[2],
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
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: data[3],
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
            source={{ uri: `https://picsum.photos/id/${number + 4}/200/300` }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bigContainer}>
        <TouchableOpacity
          style={styles.bigColumn}
            onPress={() =>
              navigation.navigate('SearchPost', {
                data: data[4]
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
            source={{ uri: `https://picsum.photos/id/${number + 5}/200/300` }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RightGrid;
