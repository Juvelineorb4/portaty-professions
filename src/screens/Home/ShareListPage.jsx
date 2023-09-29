import { View, Text } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import SharePage from "./SharePage";

const ShareListPage = ({ route }) => {
  const { data, user } = route.params;
  const global = require("@/utils/styles/global.js");
  return (
    <View style={[{ flex: 1, paddingHorizontal: 10, paddingTop: 40 }, global.bgWhite]}>
      {data.map((post, index) => (
        <SharePage key={index} data={post} identityID={user.identityID} styled={{column: styles.columnList}} />
      ))}
    </View>
  );
};

export default ShareListPage;
