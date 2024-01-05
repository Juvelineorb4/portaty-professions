import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import styles from "@/utils/styles/StepTwo.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { es } from "@/utils/constants/lenguage";
import * as Cellular from "expo-cellular";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { userAuthenticated } from "@/atoms";
import { useRecoilValue } from "recoil";
import { API } from "aws-amplify";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import CustomActivities from "@/components/CustomActivities";
import CustomArea from "@/components/CustomArea";

const StepTwo = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const { control, handleSubmit } = useForm();
  const animation = useRef(null);
  const [activitiesList, setActivitiesList] = useState([]);
  const { business } = route.params;
  console.log(business);

 const MultipleData = async () => {
    const activities = await API.graphql({
      query: customProfile.listActivities,
    });
    setActivitiesList(activities.data.listActivities.items);
  };

  useEffect(() => {
    MultipleData()
  }, []);
  return (
    <View style={[global.bgWhite, styles.container]}>
      <Modal animationType="none" transparent={true} visible={true}>
        <View style={[styles.modalMain]}>
          <ScrollView style={{ flex: 1 }}>
            <View style={[styles.modalContent]}>
              <View style={[styles.modalTop]}>
                <Pressable
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
                </Pressable>
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
              {activitiesList.length !== 0 ? (
                  <CustomArea data={activitiesList} />
                ) : (
                  <CustomInput
                    control={control}
                    name={`area`}
                    placeholder={`Selecciona tu area laboral`}
                    styled={{
                      text: styles.textInput,
                      label: [styles.labelInput],
                      error: styles.errorInput,
                      input: [styles.inputContainer],
                      placeholder: styles.placeholder,
                    }}
                    text={`Area (*)`}
                    rules={{
                      required: es.businessForm.register.email.rules,
                    }}
                  />
                )}
                {activitiesList.length !== 0 ? (
                  <CustomActivities data={activitiesList} />
                ) : (
                  <CustomInput
                    control={control}
                    name={`activity`}
                    placeholder={`Selecciona tu actividad laboral`}
                    styled={{
                      text: styles.textInput,
                      label: [styles.labelInput],
                      error: styles.errorInput,
                      input: [styles.inputContainer],
                      placeholder: styles.placeholder,
                    }}
                    text={`Actividad (*)`}
                    rules={{
                      required: es.businessForm.register.email.rules,
                    }}
                  />
                )}
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
                  onPress={() => navigation.push("StepThree", {
                    business: business
                  })}
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
