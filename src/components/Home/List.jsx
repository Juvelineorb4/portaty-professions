import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import ItemList from "./ItemList";

const List = ({ data }) => {
  console.log(data[0].business.tags)
    let arrayCon = data[0].business.tags.filter(cadena => cadena.includes('[') && cadena.includes(']'));
    let arraySin = data[0].business.tags.filter(cadena => !cadena.includes('[') && !cadena.includes(']'));
    console.log(arraySin)
    console.log(arrayCon[0].replace('[', '').replace(']', ''))
  
  return (
    <View style={styles.container}>
      {data.map((post, index) => (
        <ItemList key={index} data={post} number={index} styled={{column: styles.columnList}} />
      ))}
    </View>
  );
};

export default List;
