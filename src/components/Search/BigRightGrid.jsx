import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridSearch.js";
import Post from "./Post";

const BigRightGrid = ({ data, input }) => {
  return (
    <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
      <View style={styles.rightContainer}>
        {data[0] && <Post input={input} data={data[0]} image={data[0].thumbnail} styled={styles.tinyRightColumn}/>}
        {data[1] && <Post input={input} data={data[1]} image={data[1].thumbnail} styled={styles.tinyRightColumn}/>}
      </View>
      <View style={styles.bigRightContainer}>
        {data[2] && <Post input={input} data={data[2]} image={data[2].thumbnail} styled={styles.bigRightColumn}/>}
      </View>
    </View>
  );
};

export default BigRightGrid;
