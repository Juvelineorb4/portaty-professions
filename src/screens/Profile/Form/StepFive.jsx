import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import styles from "@/utils/styles/StepFive.js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import CustomInput from "@/components/CustomInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import * as mutations from "@/graphql/CustomMutations/Profile";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeModalScreen,
  activitySelect,
  areaSelect,
  base64Business,
  blobBusiness,
  directionBusiness,
  directionBusinessOn,
  emptyLocation,
  imageBusiness,
  mapBusiness,
  optionBussines,
  selectLocation,
  userAuthenticated,
} from "@/atoms";
import { es } from "@/utils/constants/lenguage";
import ModalAlert from "@/components/ModalAlert";
import StepClear from "./StepClear";

const StepFive = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const dataB = route.params;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const userAuth = useRecoilValue(userAuthenticated);
  const direction = useRecoilValue(directionBusinessOn);
  const [map, setMap] = useRecoilState(mapBusiness);
  const [image, setImage] = useRecoilState(imageBusiness);
  const [blobImage, setBlobImage] = useRecoilState(blobBusiness);
  const [imageB64, setImageB64] = useRecoilState(base64Business);
  const [area, setArea] = useRecoilState(areaSelect);
  const [activity, setActivity] = useRecoilState(activitySelect);
  const [location, setLocation] = useRecoilState(selectLocation);
  const [locationEmpty, setLocationEmpty] = useRecoilState(emptyLocation);
  const [locationDirection, setLocationDirection] =
    useRecoilState(directionBusiness);
  const [active, setActive] = useRecoilState(activeModalScreen);
  const [selectOption, setSelectOption] = useRecoilState(optionBussines);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const BlankInputs = () => {
    setMap({});
    setImage(null);
    setBlobImage(null);
    setImageB64("");
    setArea({});
    setActivity({});
    setLocationDirection("");
    setLocationEmpty(true);
    setLocation(false);
    setSelectOption({
      name: "Servicio/s",
      icon: (
        <MaterialIcons name="home-repair-service" size={32} color="black" />
      ),
      id: 0,
    });
  };
  const Finished = () => {
    let params = {
      image: image,
      area: area.area,
      activity: area.activity,
      option: selectOption.name,
      locationDirection: locationDirection,
      name: dataB.business.name,
      email: dataB.business.email,
      phone: dataB.business.phone,
    };
    BlankInputs();
    navigation.navigate("StepComplete", {
      business: params,
    });
  };

  const StepRegister = async (data) => {
    const today = new Date().toISOString();
    setLoading(true);
    const { identityId } = await Auth.currentUserCredentials();
    const { description, whatsapp, instagram, facebook } = data;

    const listTags = [
      `${JSON.stringify({
        priority: 1,
        value: dataB.business.name,
        date: today,
      })}`,
      `${JSON.stringify({
        priority: 2,
        value: area.activity,
        date: today,
      })}`,
      `${JSON.stringify({
        priority: 2,
        value: area.area,
        date: today,
      })}`,
      `${JSON.stringify({
        priority: 2,
        value: selectOption.name,
        date: today,
      })}`,
      `${JSON.stringify({
        priority: 3,
        value: description,
        date: today,
      })}`,
      `${JSON.stringify({
        priority: 1,
        value: JSON.stringify(direction[0]),
        date: today,
      })}`,
    ];

    if (instagram) {
      listTags.push(
        JSON.stringify({
          priority: 1,
          value: instagram,
          date: today,
        })
      );
    }
    if (facebook) {
      listTags.push(
        JSON.stringify({
          priority: 1,
          value: facebook,
          date: today,
        })
      );
    }
    if (whatsapp) {
      listTags.push(
        JSON.stringify({
          priority: 2,
          value: whatsapp,
          date: today,
        })
      );
    }
    try {
      const input = {
        owner: userAuth?.attributes?.sub,
        userID: userAuth?.attributes["custom:userTableID"],
        name: dataB.business.name,
        email: dataB.business.email,
        phone: dataB.business.phone,
        description: description,
        whatsapp: whatsapp ? whatsapp : "",
        instagram: instagram ? instagram : "",
        facebook: facebook ? facebook : "",
        image: "",
        identityID: identityId,
        coordinates: {
          lat: map.latitude,
          lon: map.longitude,
        },
        activity: `${JSON.stringify({
          main: area.area,
          sub: area.activity,
        })}`,
        tags: listTags,
      };
      const params = {
        dataBusiness: input,
        image: imageB64,
      };
      const apiName = "api-portaty";
      const path = "/business/create";
      const myInit = {
        body: params,
        headers: {},
      };
      const result = await API.post(apiName, path, myInit);
      setLoading(false);
      Finished();
    } catch (error) {
      console.log(`Error al cargar negocio`, error?.message);
      switch (error?.message) {
        case "Request failed with status code 401":
          setError(`Usuario no Autorizado para cargar Negocio`);
          break;
        default:
          setError(`Error al cargar negocio`);
          break;
      }

      setVisible(true);
      setLoading(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <View style={[global.bgWhite, styles.container]}>
      <Modal animationType="none" transparent={active} visible={active}>
        <View style={[styles.modalMain]}>
          <ScrollView style={{ flex: 1 }}>
            <View style={[styles.modalContent]}>
              <View style={[styles.modalTop]}>
                <StepClear
                  navig={() => {
                    navigation.reset({
                      routes: [{ name: "Unprofile" }],
                    });
                  }}
                />
                {/* <Pressable
                  onPress={() => {
                    navigation.reset({
                      routes: [{ name: "Unprofile" }],
                    });
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
                        fontSize: 16,
                        marginBottom: 5,
                        marginTop: 20,
                        textAlign: "justify",
                      }}
                    >
                      Algunos de los siguientes datos son opcionales pero
                      ayudará a su negocio a mejorar las búsquedas con nuestros
                      usuarios.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.modalMid]}>
                <CustomInput
                  control={control}
                  name={`description`}
                  placeholder={`Escribe una descripcion de tu negocio. Hacerla lo mas detallada posible mejorara tu posicionamiento en la busqueda`}
                  styled={{
                    text: styles.textInputDescription,
                    label: [styles.labelInput],
                    error: styles.errorInputDescription,
                    input: [styles.inputContainerDescription],
                    placeholder: styles.placeholderDescription,
                  }}
                  lines={10}
                  area={true}
                  text={`Descripcion`}
                  rules={{
                    required: es.businessForm.register.company.rules,
                  }}
                  max={500}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomInput
                    control={control}
                    name={`whatsapp`}
                    placeholder={`Tu link de whatsapp`}
                    styled={{
                      text: styles.textInputBot,
                      label: [styles.labelInput],
                      error: styles.errorInput,
                      input: [styles.inputContainerBot],
                      placeholder: styles.placeholderBot,
                    }}
                    text={`WhatsApp`}
                  />
                  <CustomInput
                    control={control}
                    name={`instagram`}
                    placeholder={`@user`}
                    styled={{
                      text: styles.textInputBot,
                      label: [styles.labelInput],
                      error: styles.errorInput,
                      input: [styles.inputContainerBot],
                      placeholder: styles.placeholderBot,
                    }}
                    text={`Instagram`}
                  />
                </View>

                <CustomInput
                  control={control}
                  name={`facebook`}
                  placeholder={`www.facebook.com/user`}
                  styled={{
                    text: styles.textInput,
                    label: [styles.labelInput],
                    error: styles.errorInput,
                    input: [styles.inputContainer],
                    placeholder: styles.placeholder,
                  }}
                  text={`Facebook`}
                />
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
                    navigation.push("StepFour", { business: dataB.business })
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
                      width: 150,
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
                  onPress={handleSubmit(StepRegister)}
                >
                  {loading ? (
                    <ActivityIndicator size={`large`} color={`#1f1f1f`} />
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          {
                            fontFamily: "bold",
                            fontSize: 18,
                            color: "#1f1f1f",
                          },
                        ]}
                      >
                        Registrar
                      </Text>
                      <FontAwesome5
                        name="check-circle"
                        size={28}
                        color="#1f1f1f"
                      />
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
            <ModalAlert
              text={error ? error : `Tu negocio ha sido registrado con exito`}
              close={() => {
                if (error) {
                  setVisible(false);
                }
              }}
              icon={
                error
                  ? require("@/utils/images/error.png")
                  : require("@/utils/images/successful.png")
              }
              open={visible}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default StepFive;
