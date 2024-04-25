import React from "react";
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

const ModalSheduleType = ({ close, open }) => {
  const global = require("@/utils/styles/global.js");
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
              <View style={{ flex: 1 }}></View>
              <Pressable
                onPress={close}
                style={[
                  global.bgYellow,
                  {
                    height: 30,
                    flex: 0.3,
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