import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { areaSelect } from "@/atoms";
import { useRecoilState } from "recoil";
import { useState } from "react";

const Area = ({ item }) => {
  const global = require("@/utils/styles/global.js");
  const [active, setActive] = useState(false);
  const [selectArea, setSelectArea] = useRecoilState(areaSelect);
  const onHandleCheckActive = () => {
      if (selectArea.id === item.id) {
        setActive(true)
    } else {
        setActive(false)
    }
  };
  useEffect(() => {
    onHandleCheckActive()
  }, [selectArea]);

  return (
    <TouchableOpacity
      style={[
        {
          height: 50,
          width: 80,
          borderWidth: 1,
          borderColor: "#1f1f1f",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        },
        active && global.bgYellow,
      ]}
      onPress={() => {
        if (active === false) {
            setSelectArea(item);
          setActive(true);
        }
      }}
    >
      <Text
        style={[
          { fontFamily: active ? "bold" : "medium", fontSize: 12, textTransform: 'capitalize' },
          global.black,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Area;
