import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import styles from "@/utils/styles/Header.module.css";

const HomeHeader = () => {
  const global = require("@/utils/styles/global.js");
  return (
    <View style={[styles.home, global.bgWhite]}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={[{ fontFamily: "name", fontSize: 26 }, global.mainColor]}>
          Portaty
        </Text>
        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
          }}
          source={require("@/utils/images/profile_default.png")}
        />
      </View>

      <TouchableOpacity
        style={[styles.content, global.bgWhiteSoft]}
        activeOpacity={1}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            resizeMode: "cover",
          }}
          source={require("@/utils/images/search.png")}
        />
        <TextInput placeholder={"Buscar"} style={styles.input} />
      </TouchableOpacity>
      <View style={[styles.line, global.mainBgColor]} />
    </View>
  );
};

export default HomeHeader;
