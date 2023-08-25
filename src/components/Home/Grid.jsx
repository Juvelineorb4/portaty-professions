import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import { useNavigation } from "@react-navigation/native";

const Grid = ({data}) => {
  const navigation = useNavigation()
  // const {image} = business
  
  return (
    <View style={styles.container}>
      {data.map((post, index) => (
        <TouchableOpacity
          key={index}
          style={styles.columnGrid}
          // onPress={() =>
          //   navigation.navigate(post.link, {
          //     data: post.item
          //   })
          // }
        >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                // marginLeft: 5,
                borderRadius: 2,
              }}
              source={{ uri: `https://picsum.photos/id/${100 + index}/200/300` }}
            />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Grid;