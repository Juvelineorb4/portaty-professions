import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridSearch.module.css";
import { useNavigation } from "@react-navigation/native";

const LeftGrid = ({ business }) => {
  const navigation = useNavigation();
  //   const data = [
  //     {
  //       id: 1,
  //       image: business[0].image,
  //       link: `Post`,
  //       item: business[0],
  //     },
  //     {
  //       id: 2,
  //       image: business[1].image,
  //       link: `Post`,
  //       item: business[1],
  //     },
  //     {
  //       id: 3,
  //       image: business[2].image,
  //       link: `Post`,
  //       item: business[2],
  //     },
  //     {
  //       id: 4,
  //       image: business[3].image,
  //       link: `Post`,
  //       item: business[3],
  //     },
  //     {
  //       id: 5,
  //       image: business[4].image,
  //       link: `Post`,
  //       item: business[4],
  //     },
  //   ];
  return (
    <View style={{ paddingHorizontal: 10, flexDirection: 'row'}}>
        <View style={styles.bigContainer}>
        <TouchableOpacity
          style={styles.bigColumn}
          //   onPress={() =>
          //     navigation.navigate('SearchPost', {
          //       data: data[0].item,
          //     })
          //   }
        >
          {/* <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              // marginLeft: 5,
              borderRadius: 2,
            }}
            source={{ uri: data[0].image }}
          /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.leftGridContainer}>
        <TouchableOpacity
          style={styles.column}
          //   onPress={() =>
          //     navigation.navigate('SearchPost', {
          //       data: data[1].item,
          //     })
          //   }
        >
          {/* <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              // marginLeft: 5,
              borderRadius: 2,
            }}
            source={{ uri: data[1].image }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
          //   onPress={() =>
          //     navigation.navigate('SearchPost', {
          //       data: data[2].item,
          //     })
          //   }
        >
          {/* <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              // marginLeft: 5,
              borderRadius: 2,
            }}
            source={{ uri: data[2].image }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
          //   onPress={() =>
          //     navigation.navigate('SearchPost', {
          //       data: data[3].item,
          //     })
          //   }
        >
          {/* <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              // marginLeft: 5,
              borderRadius: 2,
            }}
            source={{ uri: data[3].image }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
          //   onPress={() =>
          //     navigation.navigate('SearchPost', {
          //       data: data[4].item,
          //     })
          //   }
        >
          {/* <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              // marginLeft: 5,
              borderRadius: 2,
            }}
            source={{ uri: data[4].image }}
          /> */}
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default LeftGrid;
