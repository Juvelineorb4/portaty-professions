import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "@/utils/styles/Shedule.module.css";
import ModalSheduleType from "@/components/ModalSheduleType";
import ModalShedule from "@/components/ModalShedule";

const Shedule = () => {
  const global = require("@/utils/styles/global.js");
  const [visible, setVisible] = useState(false);
  const [visibleShedule, setVisibleShedule] = useState(false);
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
            fontSize: 18,
          }}
        >
          Tipo de atencion
        </Text>
        <View style={[styles.line, global.bgMidGray]} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "regular",
              fontSize: 12,
            }}
          >
            No has elegido ninguna opcion
          </Text>
          <TouchableOpacity
            style={[
              {
                borderColor: "#1f1f1f",
                borderWidth: 1,
                padding: 15,
                borderRadius: 8,
              },
              global.mainBgColor,
            ]}
            onPress={() => setVisible(!visible)}
          >
            <Text
              style={{
                fontFamily: "medium",
              }}
            >
              Elegir tipo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "medium",
            textAlign: "center",
            marginVertical: 20,
            fontSize: 18,
          }}
        >
          Horario
        </Text>
        <View style={[styles.line, global.bgMidGray]} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={[
              {
                borderColor: "#1f1f1f",
                borderWidth: 1,
                padding: 15,
                borderRadius: 8,
              },
              global.mainBgColor,
            ]}
            onPress={() => setVisibleShedule(!visibleShedule)}
          >
            <Text
              style={{
                fontFamily: "medium",
              }}
            >
              Agregar un horario
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.line, global.bgMidGray]} /> */}
      </View>
      <ModalSheduleType open={visible} close={() => setVisible(!visible)} />
      <ModalShedule
        open={visibleShedule}
        close={() => setVisibleShedule(!visibleShedule)}
      />
    </View>
  );
};

export default Shedule;