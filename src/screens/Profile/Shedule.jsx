import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/Shedule.module.css";
import ModalSheduleType from "@/components/ModalSheduleType";
import ModalShedule from "@/components/ModalShedule";
import { profileState, shedulePush, sheduleType } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Feather } from "@expo/vector-icons";
import * as mutations from "@/graphql/CustomMutations/Profile";
import { Auth, API, Storage } from "aws-amplify";
import ModalAlert from "@/components/ModalAlert";

const Shedule = ({ route, navigation }) => {
  const global = require("@/utils/styles/global.js");
  const [visible, setVisible] = useState(false);
  const [visibleShedule, setVisibleShedule] = useState(false);
  const [active, setActive] = useState(false);
  const [sheduleSelect, setSheduleSelect] = useState(null);
  const { data, schedule, scheduleType } = route.params;
  const [sheduleGeneral, setSheduleGeneral] = useRecoilState(shedulePush);
  const [typeSelect, setTypeSelect] = useRecoilState(sheduleType);
  const [stateProfile, setStateProfile] = useRecoilState(profileState);

  const toggleDay = (index) => {
    let newSheduleGeneral = [...sheduleGeneral];
    newSheduleGeneral[index] = {
      ...newSheduleGeneral[index],
      active: !newSheduleGeneral[index].active,
    };
    setSheduleGeneral(newSheduleGeneral);
  };

  const updateShedule = async () => {
    let params = {
      type: typeSelect,
      shedule: sheduleGeneral,
    };
    console.log(JSON.stringify(params));
    try {
      const result = await API.graphql({
        query: mutations.updateBusinessShedule,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            id: data?.id,
            schedule: JSON.stringify(params),
          },
        },
      });
      console.log(result);
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {

    if (schedule !== null) setSheduleGeneral(schedule);
    if (scheduleType !== null) setTypeSelect(scheduleType);
  }, []);

  return (
    <ScrollView
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
            marginTop: 20,
            marginBottom: -10,
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
      <View
        style={{
          marginBottom: 100,
        }}
      >
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
                  width: 215,
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
          <TouchableOpacity
            style={[
              {
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#1f1f1f",
                borderWidth: 1,
                borderRadius: 6,
              },
              global.mainBgColor,
            ]}
            onPress={() => updateShedule()}
          >
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 16,
              }}
            >
              Guardar horario
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalSheduleType open={visible} close={() => setVisible(!visible)} />
      <ModalShedule
        open={visibleShedule}
        data={sheduleSelect}
        close={() => setVisibleShedule(!visibleShedule)}
      />
      <ModalAlert
        text={"Horario guardado correctamente"}
        close={() => {
          setActive(false);
          setStateProfile(!stateProfile);
          navigation.navigate("Unprofile");
        }}
        open={active}
        icon={require("@/utils/images/successful.png")}
      />
    </ScrollView>
  );
};

export default Shedule;