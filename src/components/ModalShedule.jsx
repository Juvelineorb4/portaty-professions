import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import styles from "@/utils/styles/ModalShedule.module.css";
import { shedule } from "@/utils/constants/shedule";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { shedulePush } from "@/atoms";

const ModalShedule = ({ close, open, data }) => {
  const global = require("@/utils/styles/global.js");
  const [hourStartVisible, setHourStartVisible] = useState(false);
  const [hourEndVisible, setHourEndVisible] = useState(false);
  const [hourEnd, setHourEnd] = useState("");
  const [hourStart, setHourStart] = useState("");
  console.log(data);
  const [sheduleGeneral, setSheduleGeneral] = useRecoilState(shedulePush);
  let sheduleFilter = sheduleGeneral.filter(
    (item) => item.index === data?.index
  );
  console.log("toy aqui", sheduleFilter);

  // const [sheduleGeneral, setSheduleGeneral] = useState({
  //   hourStart: data?.hourStart,
  //   hourEnd: data?.hourEnd,
  // });
  const toggleDay = (index) => {
    let newSheduleGeneral = [...sheduleGeneral];
    newSheduleGeneral[index] = {
      ...newSheduleGeneral[index],
      hourEnd: hourEnd,
      hourStart: hourStart,
    };
    setSheduleGeneral(newSheduleGeneral);
  };

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
                Editar horas
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    marginBottom: -50,
                  }}
                >
                  <Text style={{ textAlign: "center", fontFamily: "bold" }}>
                    Desde:{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingHorizontal: 10,
                      marginTop: 10,
                      position: "relative",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderColor: "#1f1f1f",
                        height: 40,
                        width: 100,
                        borderWidth: 1,
                        borderRadius: 4,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      onPress={() => setHourStartVisible(!hourStartVisible)}
                    >
                      <Text
                        style={{
                          fontFamily: "bold",
                        }}
                      >
                        {hourStart ? hourStart : sheduleFilter[0].hourStart}
                      </Text>
                      <AntDesign name="down" size={12} color="black" />
                    </TouchableOpacity>
                    {hourStartVisible && (
                      <View
                        style={{
                          position: "absolute",
                          backgroundColor: "#fff",
                          // height: 100,
                          width: 100,
                          padding: 5,
                          height: 200,
                          top: 40,
                          left: 10,
                          borderColor: "#1f1f1f",
                          borderWidth: 1,
                          borderRadius: 8,
                          zIndex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ScrollView>
                          {shedule.hours.map((item, index) => {
                            if (
                              item !== sheduleFilter[0].hourEnd &&
                              item !== sheduleFilter[0].hourStart
                            ) {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    setHourStart(item);
                                    setHourStartVisible(!hourStartVisible);
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily:
                                        sheduleFilter[0].hourStart === item
                                          ? "bold"
                                          : "regular",
                                      fontSize: 14,
                                      borderBottomColor: "#1f1f1f",
                                      paddingVertical: 10,
                                      color:
                                        sheduleFilter[0].hourStart === item
                                          ? "#ffb703"
                                          : "#1f1f1f",
                                      textAlign: "center",
                                    }}
                                  >
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }
                          })}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: -50,
                  }}
                >
                  <Text style={{ textAlign: "center", fontFamily: "bold" }}>
                    Hasta:{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingHorizontal: 10,
                      marginTop: 10,
                      position: "relative",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderColor: "#1f1f1f",
                        height: 40,
                        width: 100,
                        borderWidth: 1,
                        borderRadius: 4,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      onPress={() => setHourEndVisible(!hourEndVisible)}
                    >
                      <Text
                        style={{
                          fontFamily: "bold",
                        }}
                      >
                        {hourEnd ? hourEnd : sheduleFilter[0].hourEnd}
                      </Text>
                      <AntDesign name="down" size={12} color="black" />
                    </TouchableOpacity>
                    {hourEndVisible && (
                      <View
                        style={{
                          position: "absolute",
                          backgroundColor: "#fff",
                          // height: 100,
                          width: 100,
                          padding: 5,
                          height: 200,
                          top: 40,
                          left: 10,
                          borderColor: "#1f1f1f",
                          borderWidth: 1,
                          borderRadius: 8,
                          zIndex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ScrollView>
                          {shedule.hours.map((item, index) => {
                            if (
                              item !== sheduleFilter[0].hourEnd &&
                              item !== sheduleFilter[0].hourStart
                            ) {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    setHourEnd(item);
                                    setHourEndVisible(!hourEndVisible);
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily:
                                        sheduleFilter[0].hourEnd === item
                                          ? "bold"
                                          : "regular",
                                      fontSize: 14,
                                      borderBottomColor: "#1f1f1f",
                                      paddingVertical: 10,
                                      color:
                                        sheduleFilter[0].hourEnd === item
                                          ? "#ffb703"
                                          : "#1f1f1f",
                                      textAlign: "center",
                                    }}
                                  >
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }
                          })}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <Pressable
                onPress={() => {
                  toggleDay(sheduleFilter[0].index);
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

export default ModalShedule;
