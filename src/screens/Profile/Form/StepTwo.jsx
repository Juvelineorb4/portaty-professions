import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import styles from "@/utils/styles/StepTwo.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { es } from "@/utils/constants/lenguage";
import * as Cellular from "expo-cellular";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { activeModalScreen, areaSelect, userAuthenticated } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { API } from "aws-amplify";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import CustomActivities from "@/components/CustomActivities";
import CustomArea from "@/components/CustomArea";
import StepClear from "./StepClear";

const StepTwo = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const { control, handleSubmit } = useForm();
  const animation = useRef(null);
  const [areasList, setAreasList] = useState([]);
  const { business } = route.params;
  const [active, setActive] = useRecoilState(activeModalScreen);
  const area = useRecoilValue(areaSelect);
  console.log(business);

  const MultipleData = async () => {
    const activities = await API.graphql({
      query: customProfile.listAreas,
    });
    setAreasList(activities.data.listAreas.items);
    console.log(activities.data.listAreas.items);
  };

  useEffect(() => {
    MultipleData();
  }, []);
  return (
    <View style={[global.bgWhite, styles.container]}>
      <Modal animationType="none" transparent={active} visible={active}>
        <View style={[styles.modalMain]}>
          <ScrollView style={{ flex: 1 }}>
            <View style={[styles.modalContent]}>
              <View style={[styles.modalTop]}>
                <StepClear navig={() => navigation.navigate("Unprofile")} />
                <View style={{ marginBottom: 20, marginTop: -15 }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: "medium",
                        fontSize: 32,
                        marginTop: 30,
                      }}
                    >
                      Ahora, {business.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: 20,
                        marginBottom: 5,
                      }}
                    >
                      Cuéntanos ¿a qué se dedica tu negocio?
                    </Text>
                    <LottieView
                      autoPlay
                      ref={animation}
                      style={{
                        width: 150,
                        height: 150,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                      source={require("@/utils/animations/work.json")}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.modalMid]}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: 16,
                      }}
                    >
                      Tu sector:
                    </Text>
                    <Text
                      style={{
                        fontFamily: "medium",
                        fontSize: 14,
                      }}
                    >
                      {area?.area ? area?.area : "No has seleccionado aun"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 10,
                      justifyContent: "space-between",
                      marginVertical: 10
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: 16,
                      }}
                    >
                      Tu actividad :
                    </Text>
                    <Text
                      style={{
                        fontFamily: "medium",
                        fontSize: 14,
                      }}
                    >
                      {area?.activity
                        ? area?.activity
                        : "No has seleccionado aun"}
                    </Text>
                  </View>
                </View>
                {areasList.length !== 0 ? <CustomArea data={areasList} /> : ""}
              </View>
              <View style={[styles.modalBott]}>
                <Pressable
                  style={[
                    {
                      borderWidth: 1,
                      width: 120,
                      height: 60,
                      borderRadius: 8,
                      alignSelf: "flex-end",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingHorizontal: 10,
                    },
                  ]}
                  onPress={() =>
                    navigation.push("StepOne", { business: business })
                  }
                >
                  <Feather name="arrow-left-circle" size={30} color="black" />
                  <Text
                    style={[
                      { fontFamily: "bold", fontSize: 18, color: "#1f1f1f" },
                    ]}
                  >
                    Atras
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    global.bgYellow,
                    {
                      borderWidth: 1,
                      width: 120,
                      height: 60,
                      borderRadius: 8,
                      alignSelf: "flex-end",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingHorizontal: 10,
                    },
                  ]}
                  onPress={() =>
                    navigation.push("StepThree", {
                      business: business,
                    })
                  }
                >
                  <Text
                    style={[
                      { fontFamily: "bold", fontSize: 18, color: "#1f1f1f" },
                    ]}
                  >
                    2 / 5
                  </Text>
                  <Feather
                    name="arrow-right-circle"
                    size={30}
                    color="#1f1f1f"
                  />
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default StepTwo;
