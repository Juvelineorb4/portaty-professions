import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "@/assets/styles/Header.module.css";

const LeftHeader = ({handle}) => {
  return (
    <View style={styles.left}>
        <TouchableOpacity onPress={handle} style={styles.back}>
          <Image
            style={{
              width: 45,
              height: 45,
              resizeMode: "contain",
            }}
            source={require("@/assets/images/arrow_back.png")}
          />
        </TouchableOpacity>
    </View>
  );
};

export default LeftHeader;
