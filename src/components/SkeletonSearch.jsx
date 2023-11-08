import { View, ScrollView, Text } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";
const SkeletonExample = () => {
  const global = require("@/utils/styles/global.js");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingBottom: 50,
        paddingTop: 10,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <View style={{ marginRight: 5 }}>
          <Skeleton width={180} height={150} style={{ marginBottom: 5 }} />
          <Skeleton width={180} height={150} />
        </View>
        <Skeleton width={180} height={305} />
      </View>
      <View style={{ flexDirection: "row-reverse" }}>
        <View style={{ marginLeft: 5 }}>
          <Skeleton width={180} height={150} style={{ marginBottom: 5 }} />
          <Skeleton width={180} height={150} />
        </View>
        <Skeleton width={180} height={305} />
      </View>
    </View>
  );
};

export default SkeletonExample;
