import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/GridProfile.module.css";
import { useNavigation } from "@react-navigation/native";
import LeftGrid from "./LeftGrid";
import BigRightGrid from "./BigRightGrid";
import BigLeftGrid from "./BigLeftGrid";
import RightGrid from "./RigthGrid";

const GridSearch = ({renderItems, more}) => {

  useLayoutEffect(() => {
  }, [])
  if (renderItems.length !== 0) return (
    <View style={{flex: 1}}>
      <BigLeftGrid data={renderItems.slice(0, 2)} value={more + 15}/>
      {renderItems.length >= 4 && <RightGrid data={renderItems.slice(3, renderItems.length - 1 < 7 ? renderItems.length - 1 : 7)} value={more + 20}/>}
      {renderItems.length >= 9 &&<LeftGrid data={renderItems.slice(8, renderItems.length - 1 < 12 ? renderItems.length - 1 : 12)} value={more + 25} />}
      {renderItems.length >= 14 &&<BigRightGrid data={renderItems.slice(13, renderItems.length - 1 < 15 ? renderItems.length - 1 : 15)} value={more + 30}/>}
      {renderItems.length >= 17 &&<LeftGrid data={renderItems.slice(16, renderItems.length - 1 < 20 ? renderItems.length - 1 : 20)} value={more + 35} />}
      {renderItems.length >= 22 &&<RightGrid data={renderItems.slice(21, renderItems.length - 1 < 25 ? renderItems.length - 1 : 25)} value={more + 40}/>}

    </View>
  );
};

export default GridSearch;
