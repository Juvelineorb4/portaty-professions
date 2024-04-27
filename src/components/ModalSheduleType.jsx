import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "@/utils/styles/ModalShedule.module.css";
import { shedule } from "@/utils/constants/shedule";
import { useRecoilState } from "recoil";
import { sheduleType } from "@/atoms";

const ModalSheduleType = ({ close, open }) => {
  const global = require("@/utils/styles/global.js");
  const [typeSelect, setTypeSelect] = useRecoilState(sheduleType);
  const [type, setType] = useState("");

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={open}
      onRequestClose={close}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Elige un tipo de atencion para tu horario comercial
              </Text>
              <View style={{ flex: 1 }}>
                {shedule.types.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderColor: "#1f1f1f",
                      borderWidth: 1,
                      borderRadius: 4,
                      padding: 12,
                      marginBottom: 7,
                      backgroundColor: type === item ? "#ffb703" : "#ffffff",
                    }}
                    onPress={() => setType(item)}
                  >
                    <Text
                      style={{
                        fontFamily: "light",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Pressable
                onPress={() => {
                  setTypeSelect(type);
                  close();
                }}
                style={[
                  global.bgYellow,
                  {
                    height: 30,
                    flex: 0.15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                    // alignItems: "center",
                    // alignSelf: "flex-end",
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                  },
                ]}
              >
                <Text style={[global.black, { fontFamily: "bold" }]}>
                  Aceptar
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalSheduleType;