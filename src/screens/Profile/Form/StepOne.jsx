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
import styles from "@/utils/styles/StepOne.module.css";
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

const StepOne = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const { control, handleSubmit } = useForm();
  const userAuth = useRecoilValue(userAuthenticated);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const animation = useRef(null);

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

  const StepParams = async (data) => {
    const { company, email, phone } = data;
    let params = {
      name: company,
      email: email,
      phone: phone,
    };
    navigation.push("StepTwo", {
      business: params,
    });
  };

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2`)
      .then((response) => {
        return response.json();
      })
      .then((item) => {
        setCountries(item);
        getCountryCode(item);
      });
  }, [route]);
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
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text
                      style={{
                        fontFamily: "medium",
                        fontSize: 36,
                        marginBottom: 2,
                      }}
                    >
                      Hola, {userAuth?.attributes?.name}
                    </Text>
                    <LottieView
                      autoPlay
                      ref={animation}
                      style={{
                        width: 75,
                        height: 75,
                        backgroundColor: "#fff",
                      }}
                      source={require("@/utils/animations/hello.json")}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: 20,
                      marginTop: 10,
                      marginBottom: 5,
                    }}
                  >
                    ¡Bienvenido al registro de negocios!
                  </Text>
                  <Text style={{ fontFamily: "regular", fontSize: 17 }}>
                    Empecemos primero por darnos tus datos basicos.
                  </Text>
                </View>
              </View>
              <View style={[styles.modalMid]}>
                <CustomInput
                  control={control}
                  name={`company`}
                  placeholder={`Portaty C.A.`}
                  styled={{
                    text: styles.textInput,
                    label: [styles.labelInput],
                    error: styles.errorInput,
                    input: [styles.inputContainer],
                    placeholder: styles.placeholder,
                  }}
                  text={`Nombre del negocio (*)`}
                  rules={{
                    required: es.businessForm.register.company.rules,
                    
                  }}
                />
                <CustomInput
                  control={control}
                  name={`email`}
                  placeholder={`soporte@portaty.com`}
                  styled={{
                    text: styles.textInput,
                    label: [styles.labelInput],
                    error: styles.errorInput,
                    input: [styles.inputContainer],
                    placeholder: styles.placeholder,
                  }}
                  text={`Correo electronico (*)`}
                  rules={{
                    required: es.businessForm.register.email.rules,
                  }}
                />
                <View
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
                      {/* <View> */}
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
                          // width: 100,
                        }}
                      >
                        {country?.idd?.root}
                        {country?.idd?.suffixes.map((item) => item)}
                      </Text>
                      <AntDesign name="caretdown" size={15} color="gray" />
                      {/* </View> */}
                      {/* <Text></Text> */}
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
                            {/* <Text style={{ fontFamily: "light", padding: 5 }}>
                    Elige un codigo de area
                  </Text> */}
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
                                      // styles.inputContainerBot,
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
                      error: styles.errorInputP,
                      input: [styles.inputContainerP],
                      placeholder: styles.placeholder,
                    }}
                    text={` `}
                    rules={{
                      required: es.businessForm.register.email.rules,
                    }}
                  />
                </View>
              </View>
              <View style={[styles.modalBott]}>
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
                  onPress={handleSubmit(StepParams)}
                >
                  <Text
                    style={[
                      { fontFamily: "bold", fontSize: 20, color: "#1f1f1f" },
                    ]}
                  >
                    1 / 4
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

export default StepOne;
