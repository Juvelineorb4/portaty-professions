import { View, Text, Image } from "react-native";
import React from "react";

const Post = ({ route }) => {
  const { data } = route.params;
  console.log(data);
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          borderRadius: 50,
        }}
        source={{ uri: data.image }}
      />
      <Text>{data.text}</Text>
    </View>
  );
};

export default Post;
