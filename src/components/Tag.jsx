import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { tagsList } from "@/atoms";
import { useRecoilState } from "recoil";
import { useState } from "react";

const Tag = ({ item }) => {
  const global = require("@/assets/styles/global.js");
  const [active, setActive] = useState(false);
  const [selectTagsList, setSelectTagsList] = useRecoilState(tagsList);
  console.log(active)
  return (
    <TouchableOpacity
      style={[
        {
          height: 50,
          width: 80,
          borderWidth: 0.5,
          borderColor: "#444",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        },
        active && global.mainBgColor,
      ]}
      onPress={() => {
        setActive(!active);
        if (active === false ) setSelectTagsList([...selectTagsList, item.name]);
      }}
    >
      <Text style={[{ fontFamily: active ? 'light' : "thin", fontSize: 12 }, active ? global.white : global.black]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default Tag;
