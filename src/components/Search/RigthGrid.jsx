import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridSearch.js";
import { useNavigation } from "@react-navigation/native";
import Post from "./Post";

const RightGrid = ({ data, input }) => {
  return (
    <View style={{ paddingHorizontal: 10, flexDirection: 'row'}}>
      <View style={styles.rightGridContainer}>
      {data[0] && <Post input={input} data={data[0]} image={data[0].thumbnail} styled={styles.column}/>}
        {data[1] && <Post input={input} data={data[1]} image={data[1].thumbnail} styled={styles.column}/>}
        {data[2] && <Post input={input} data={data[2]} image={data[2].thumbnail} styled={styles.column}/>}
        {data[3] && <Post input={input} data={data[3]} image={data[3].thumbnail} styled={styles.column}/>}
      </View>
      <View style={styles.bigContainer}>
      {data[4] && <Post input={input} data={data[4]} image={data[4].thumbnail} styled={styles.bigColumn}/>}
      </View>
    </View>
  );
};

export default RightGrid;
