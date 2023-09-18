import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import ItemGrid from "./ItemGrid";

const Grid = ({ data }) => {
  console.log(data);
  data.sort((a, b) => b.position - a.position);

  // Renderizamos el array
  data.map((obj) => {
    console.log(obj.position);
  });
  return (
    <View style={styles.container}>
      {data.map((post, index) => (
        <ItemGrid
          key={index}
          data={post}
          number={index}
          styled={{
            column: styles.columnGrid,
            options: styles.options,
            modal: styles.modal,
            text: styles.text,
          }}
        />
      ))}
    </View>
  );
};

export default Grid;
