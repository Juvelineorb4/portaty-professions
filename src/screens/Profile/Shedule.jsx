import { Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "@/utils/styles/Shedule.module.css";
import ModalSheduleType from "@/components/ModalSheduleType";
import ModalShedule from "@/components/ModalShedule";
import { shedulePush, sheduleType } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Feather } from "@expo/vector-icons";

const Shedule = () => {
  const global = require("@/utils/styles/global.js");
  const [visible, setVisible] = useState(false);
  const [visibleShedule, setVisibleShedule] = useState(false);
  const [sheduleSelect, setSheduleSelect] = useState(null);

  const [sheduleGeneral, setSheduleGeneral] = useRecoilState(shedulePush);
  const typeSelect = useRecoilValue(sheduleType);
  const toggleDay = (index) => {
    let newSheduleGeneral = [...sheduleGeneral];
    newSheduleGeneral[index] = {
      ...newSheduleGeneral[index],
      active: !newSheduleGeneral[index].active,
    };
    setSheduleGeneral(newSheduleGeneral);
  };
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
              fontSize: 14,
              width: 170,
            }}
          >
            {typeSelect ? typeSelect : "No has elegido ninguna opcion"}
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
            flexDirection: "column",
            marginVertical: 20,
          }}
        >
          {sheduleGeneral.map((item, index) => (
            <View
              style={{
                height: 50,
                borderColor: "#1f1f1f",
                borderWidth: 1,
                alignItems: "center",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: item.active ? "#ffb703" : "#ffffff",
              }}
              key={index}
            >
              <Text
                style={{
                  fontFamily: "bold",
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 250,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 150,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "light",
                      }}
                    >
                      Desde
                    </Text>
                    <Text
                      style={{
                        fontFamily: "bold",
                      }}
                    >
                      {item.hourStart}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "light",
                      }}
                    >
                      Hasta
                    </Text>
                    <Text
                      style={{
                        fontFamily: "bold",
                      }}
                    >
                      {item.hourEnd}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setSheduleSelect(item);
                      setVisibleShedule(true);
                    }}
                  >
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Switch
                  trackColor={{
                    false: "#767577",
                    true: "#ffffff",
                  }}
                  thumbColor={item.active ? "#ffb703" : "#f4f3f4"}
                  onValueChange={() => {
                    console.log(item);
                    toggleDay(index);
                  }}
                  value={item.active}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
      <ModalSheduleType open={visible} close={() => setVisible(!visible)} />
      <ModalShedule
        open={visibleShedule}
        data={sheduleSelect}
        close={() => setVisibleShedule(!visibleShedule)}
      />
    </View>
  );
};

export default Shedule;
