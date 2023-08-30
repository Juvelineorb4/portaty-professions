import { View, Text } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import ItemProfile from "@/components/ItemProfile";

const List = ({ route }) => {
  const { data } = route.params;
  const global = require("@/utils/styles/global.js");
  return (
    <View style={[{ flex: 1, paddingHorizontal: 10, paddingTop: 40 }, global.bgWhite]}>
      {data.map((post, index) => (
        <ItemProfile key={index} data={post} number={index} styled={{column: styles.columnList}} />
      ))}
    </View>
  );
};

export default List;
