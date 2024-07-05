import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    TouchableWithoutFeedback,
    Linking
  } from "react-native";
  import React from "react";

  const ModalPermission = ({ permission, close, open }) => {
    return (
      <Modal visible={open} onRequestClose={close} transparent>
        <TouchableWithoutFeedback onPress={close}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: 250,
              }}
            >
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 16,
                }}
              >
                Permisos requeridos
              </Text>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 30,
                }}
              >
                <Text style={{ fontFamily: "regular", fontSize: 13 }}>
                  Necesitamos que nos otorgues los siguientes permisos:{" "}
                </Text>
                <Text style={{ fontFamily: "medium", marginVertical: 15 }}>
                  {" "}
                  {permission}
                </Text>

                <Text style={{ fontFamily: "regular", fontSize: 13 }}>
                  Habilitalos en tu configuracion
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => Linking.openSettings()}
                style={{
                  backgroundColor: "#ffb703",
                  padding: 15,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#1f1f1f",
                  borderWidth: 1,
                }}
              >
                <Text style={{ color: "black", fontFamily: "bold" }}>
                  Ir a configuracion
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  export default ModalPermission;