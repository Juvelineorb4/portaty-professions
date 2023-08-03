import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/assets/styles/GridProfile.module.css";
import { useRouter } from "expo-router";

const GridProfile = () => {
  const router = useRouter();
  const data = [
    {
      id: 1,
      text: "Chris C.A.",
      image: require("@/assets/images/negocio.jpg"),
      link: `/profile/mypost`,
    },
    { id: 2, text: "Elemento 2" },
    { id: 3, text: "Elemento 3" },
    { id: 4, text: "Elemento 4" },
    { id: 5, text: "Elemento 5" },
    { id: 6, text: "Elemento 6" },
    { id: 7, text: "Elemento 7" },
    { id: 8, text: "Elemento 8" },
    { id: 9, text: "Elemento 9" },
  ];
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.column}
          onPress={() =>
            router.push({
              pathname: item.link,
              params: {
                data: item,
              },
            })
          }
        >
          {item.image ? "" : <Text>{item.text}</Text>}
          {item.image && (
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                // marginLeft: 5,
                borderRadius: 2,
              }}
              source={item.image}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GridProfile;
