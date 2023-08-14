import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/GridProfile.module.css";
import { useNavigation } from "@react-navigation/native";
import LeftGrid from "./LeftGrid";
import BigRightGrid from "./BigRightGrid";
import BigLeftGrid from "./BigLeftGrid";
import RightGrid from "./RigthGrid";

const GridSearch = () => {
  return (
    <View style={{flex: 1, marginBottom: 80}}>
      <BigLeftGrid />
      <RightGrid />
      <LeftGrid />
      <BigRightGrid />
    </View>
  );
};

export default GridSearch;
