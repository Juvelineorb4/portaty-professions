import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import styles from "@/utils/styles/StepComplete.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import LottieView from "lottie-react-native";
import { activeModalScreen, stepCompleteParams } from "@/atoms";
import { useRecoilState } from "recoil";
import StepClear from "./StepClear";

const StepComplete = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useRecoilState(activeModalScreen);
  const [businessComplete, setBusinessComplete] = useRecoilState(stepCompleteParams);

  const animation = useRef(null);
  let dataB = route.params;
  useEffect(() => {}, []);
  return (
    <View style={[global.bgWhite, styles.container]}>
      {/* <Modal animationType="none" transparent={active} visible={active}> */}
        <View style={[styles.modalMain]}>
          <ScrollView style={{ flex: 1 }}>
            <View style={[styles.modalContent]}>
              <View style={[styles.modalTop]}>
                {/* <Pressable
                  onPress={() => {
                    navigation.navigate("Unprofile");
                  }}
                >
                  <Image
                    style={{
                      width: 55,
                      height: 55,
                      resizeMode: "contain",
                    }}
                    source={require("@/utils/images/arrow_back.png")}
                  />
                </Pressable> */}
                <View style={{ marginBottom: 20, marginTop: -15 }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: "regular",
                        fontSize: 26,
                        marginTop: 80,
                        marginBottom: 50,
                        textAlign: "center",
                      }}
                    >
                      ¡Tu negocio se registro exitosamente!
                    </Text>
                    <Image
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        alignSelf: "center",
                      }}
                      source={{ uri: businessComplete.image }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.modalMid]}>
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 26,
                    marginBottom: 5,
                    marginTop: 50,
                    textAlign: "center",
                  }}
                >
                  Bienvenido a Portaty
                </Text>
                {/* <LottieView
                      autoPlay
                      ref={animation}
                      style={{
                        width: 65,
                        height: 65,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignSelf: "center",
                        marginTop: 10,
                      }}
                      source={require("@/utils/animations/check.json")}
                    /> */}
              </View>
              <View style={[styles.modalBott]}>
                <StepClear
                  navig={() => navigation.navigate("Unprofile")}
                  complete={true}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      {/* </Modal> */}
    </View>
  );
};

export default StepComplete;
