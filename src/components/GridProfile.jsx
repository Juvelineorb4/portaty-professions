import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridProfile.module.css";

const GridProfile = ({business, navigation}) => {
  const {item, image} = business
  const data = [
    {
      id: 1,
      text: item.name,
      image: image,
      link: `Post`,
      data: item
    },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 6, text: "" },
    { id: 7, text: "" },
    { id: 8, text: "" },
    { id: 9, text: "" },
  ];
  return (
    <View style={styles.container}>
      {data.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.column}
          onPress={() =>
            navigation.navigate(post.link, {
              data: data
            })
          }
        >
          {post.image ? "" : <Text>{post.text}</Text>}
          {post.image && (
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                // marginLeft: 5,
                borderRadius: 2,
              }}
              source={{uri: post.image}}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GridProfile;
