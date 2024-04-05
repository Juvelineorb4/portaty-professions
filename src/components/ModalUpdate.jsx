import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import React from "react";

const ModalUpdate = ({ isVisible, onConfirm, version, updateDate }) => {
  const storeImage =
    Platform.OS === "ios"
      ? require("@/utils/images/appstore.png")
      : require("@/utils/images/playstore.png");
  return (
    <Modal visible={isVisible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 250 }}
        >
          <Text
            style={{
              fontFamily: "medium",
              fontSize: 16,
            }}
          >
            Hay una nueva actualización disponible de Portaty
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 30,
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                marginLeft: 0,
                resizeMode: "contain",
              }}
              source={storeImage}
            />
            <View
              style={{
                marginLeft: 30,
              }}
            >
              <Text style={{ fontFamily: "medium" }}>Versión: {version}</Text>
              <Text style={{ fontFamily: "medium" }}>Fecha: {updateDate}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={onConfirm}
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
              Actualizar ahora
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdate;
