import { Image, Modal, Pressable, Text, View } from "react-native";
import React from "react";
import styles from "@/utils/styles/ModalAlert.module.css";

const ModalAlert = ({ text, icon, close, open }) => {
  const global = require("@/utils/styles/global.js");
  return (
    <Modal animationType="none" transparent={true} visible={open}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTop}>
            {/* <Pressable
                onPress={close}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: "contain",
                  }}
                  source={require("@/utils/images/arrow_back.png")}
                />
              </Pressable> */}
            {/* <Text style={styles.modalText}>{`Vista previa del negocio`}</Text> */}
          </View>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                width: 75,
                height: 75,
                resizeMode: "cover",
                alignSelf: 'center'
              }}
              source={require("@/utils/images/successful.png")}
            />
            <View style={{ paddingVertical: 15, flex: 1 }}>
              <Text style={{ fontFamily: "light", fontSize: 16 }}>{text}</Text>
            </View>
          </View>
          <Pressable
            onPress={close}
            style={[
              global.mainBgColor,
              {
                padding: 10,
                borderRadius: 6,
                width: 80,
                alignItems: "center",
                alignSelf: "flex-end",
              },
            ]}
          >
            <Text style={[global.white, { fontFamily: "medium" }]}>
              Aceptar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
