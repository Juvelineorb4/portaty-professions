import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridSearch.module.css";
import Post from "./Post";

const LeftGrid = ({ data }) => {
  return (
    <View style={{ paddingHorizontal: 10, flexDirection: 'row'}}>
        <View style={styles.bigContainer}>
        {data[0] && <Post data={data[0]} image={data[0].thumbnail} styled={styles.bigColumn}/>}
      </View>
      <View style={styles.leftGridContainer}>
      {data[1] && <Post data={data[1]} image={data[1].thumbnail} styled={styles.column}/>}
        {data[2] && <Post data={data[2]} image={data[2].thumbnail} styled={styles.column}/>}
        {data[3] && <Post data={data[3]} image={data[3].thumbnail} styled={styles.column}/>}
        {data[4] && <Post data={data[4]} image={data[4].thumbnail} styled={styles.column}/>}
      </View>
      
    </View>
  );
};

export default LeftGrid;
