import { Text, View } from "react-native";
import React from "react";

const Shedule = () => {
  const global = require("@/utils/styles/global.js");
  return (
    <View
      style={[
        {
          flex: 1,
          padding: 20,
        },
        global.bgWhite,
      ]}
    >
      <View>
        <Text
          style={{
            fontFamily: "medium",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Tipo de atencion
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "medium",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Horario
        </Text>
      </View>
    </View>
  );
};

export default Shedule;
