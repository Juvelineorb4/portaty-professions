import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import styles from "@/utils/styles/StepTwo.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { es } from "@/utils/constants/lenguage";
import { AntDesign } from "@expo/vector-icons";
import * as Cellular from "expo-cellular";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { userAuthenticated } from "@/atoms";
import { useRecoilValue } from "recoil";
import { API } from "aws-amplify";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import CustomActivities from "@/components/CustomActivities";

const StepTwo = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const { control, handleSubmit } = useForm();
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const animation = useRef(null);
  const userAuth = useRecoilValue(userAuthenticated);
  const [activitiesList, setActivitiesList] = useState([]);

  const { business } = route.params;
  console.log(business);
  async function getCountryCode(array) {
    const countryCode = await Cellular.getIsoCountryCodeAsync();
    console.log(countryCode.toUpperCase());
    array.map((item, index) => {
      if (item.cca2 === countryCode.toUpperCase()) setCountry(item);
    });
  }

  const filteredCountries = countries.filter((item) =>
    item?.name?.common.toLowerCase().includes(searchCountry.toLowerCase())
  );
 const MultipleData = async () => {
    const activities = await API.graphql({
      query: customProfile.listActivities,
    });
    setActivitiesList(activities.data.listActivities.items);
  };

  useEffect(() => {
    MultipleData()
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2`)
      .then((response) => {
        return response.json();
      })
      .then((item) => {
        setCountries(item);
        getCountryCode(item);
      });
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
                  {/* <Text style={{ fontFamily: "regular", fontSize: 16 }}>
                    Esta informacion la usaremos para que la gente logre
                    encontrarte.
                  </Text> */}
                </View>
              </View>
              <View style={[styles.modalMid]}>
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
                    required: es.businessForm.register.company.rules,
                  }}
                />
                
                {/* <CustomInput
                  control={control}
                  name={`activity`}
                  placeholder={`Venta de productos de animales`}
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
                /> */}
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
                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.labelInput}>Telefono (*)</Text>

                    <TouchableOpacity
                      style={[
                        styles.inputContainerBot,
                        {
                          height: 50,
                          width: 100,
                          marginRight: 10,
                          borderColor: "#404040",
                          borderWidth: 1,
                        },
                      ]}
                      onPress={() => setVisibleCountries(!visibleCountries)}
                    >
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 30,
                          marginLeft: 10,
                          marginRight: 2,
                          resizeMode: "contain",
                        }}
                        source={{
                          uri: country
                            ? country?.flags?.png
                            : countries[0]?.flags?.png,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: "medium",
                          fontSize: 14,
                          color: "#000",
                          marginRight: 5,
                        }}
                      >
                        {country?.idd?.root}
                        {country?.idd?.suffixes.map((item) => item)}
                      </Text>
                      <AntDesign name="caretdown" size={15} color="gray" />
                    </TouchableOpacity>
                    <Modal
                      animationType="none"
                      transparent={true}
                      visible={visibleCountries}
                      onRequestClose={() => {
                        setVisibleCountries(!visibleCountries);
                      }}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <View style={styles.modalTop}>
                            <Pressable
                              onPress={() => {
                                setVisibleCountries(!visibleCountries);
                              }}
                            >
                              <Image
                                style={{
                                  margin: 5,
                                  width: 25,
                                  height: 25,
                                  resizeMode: "contain",
                                }}
                                source={require("@/utils/images/arrow_back.png")}
                              />
                            </Pressable>
                          </View>
                          <View style={{ flex: 1 }}>
                            <TextInput
                              value={searchCountry}
                              onChangeText={(e) => setSearchCountry(e)}
                              placeholder={`Busca tu pais`}
                              defaultValue={searchCountry}
                              style={{
                                margin: 5,
                                borderWidth: 0.4,
                                borderColor: "#eee",
                                padding: 5,
                                fontFamily: "light",
                                fontSize: 12,
                                borderRadius: 5,
                              }}
                            />
                            <View style={[{ flex: 1 }]}>
                              <FlatList
                                data={
                                  searchCountry ? filteredCountries : countries
                                }
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={[
                                      {
                                        height: 40,
                                        width: 210,
                                        flexDirection: "row",
                                        borderWidth: 0.5,
                                        borderColor: "#eee",
                                        alignItems: "center",
                                        marginHorizontal: 5,
                                      },
                                    ]}
                                    onPress={() => {
                                      setCountry(item);
                                      setVisibleCountries(!visibleCountries);
                                    }}
                                  >
                                    <Image
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        marginHorizontal: 10,
                                        resizeMode: "contain",
                                      }}
                                      source={{ uri: item?.flags?.png }}
                                    />
                                    <Text
                                      style={{
                                        fontFamily: "light",
                                        fontSize: 11,
                                        color: "#000",
                                        width: 100,
                                      }}
                                    >
                                      {item?.idd?.root}
                                      {item?.idd?.suffixes.map(
                                        (item) => item
                                      )}{" "}
                                      {item?.name?.common}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index}
                                showsVerticalScrollIndicator={false}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  <CustomInput
                    control={control}
                    name={`phone`}
                    placeholder={`Coloca el numero de telefono`}
                    styled={{
                      text: styles.textInputP,
                      label: [styles.labelInput],
                      error: styles.errorInput,
                      input: [styles.inputContainerP],
                      placeholder: styles.placeholder,
                    }}
                    text={` `}
                    rules={{
                      required: es.businessForm.register.email.rules,
                    }}
                  />
                </View> */}
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
                  onPress={() => navigation.push("StepThree")}
                >
                  <Text
                    style={[
                      { fontFamily: "bold", fontSize: 18, color: "#1f1f1f" },
                    ]}
                  >
                    2 / 4
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
