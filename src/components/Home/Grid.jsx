import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import { useNavigation } from "@react-navigation/native";

const Grid = ({}) => {
  const navigation = useNavigation()
  // const {image} = business
  const data = [
    {
      id: 1,
      text: ""
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