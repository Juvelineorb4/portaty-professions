import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import styles from "@/utils/styles/CustomPromotions.js";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { onCreateBusinessPromotion } from "@/graphql/CustomSubscriptions/Promotion";
import CustomCalendarInput from "./CustomCalendarInput";
import * as queries from "@/graphql/CustomQueries/Profile";

const CustomPromotions = ({ route, navigation }) => {
  const { data: formData } = route.params;
  const global = require("@/utils/styles/global.js");
  const [image, setImage] = useState(null);
  const [imageB64, setImageB64] = useState(null);
  const [blobImage, setBlobImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [errorDate, setErrorDate] = useState({
    status: false,
    message: "",
  });
  const { control, handleSubmit, watch } = useForm();

  const fetchPromotions = async () => {
    try {
      const response = await API.graphql({
        query: queries.listBusinessPromotions,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          filter: { businessID: { eq: formData?.id } },
        },
      });
      setPromotions(response.data.listBusinessPromotions.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPromotions();
    const subscription = API.graphql({
      query: onCreateBusinessPromotion,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).subscribe({
      next: ({ value }) => {
        console.log(
          "Nuevo post creado:",
          value?.data?.onCreateBusinessPromotion
        );
        // Actualiza tu estado o realiza otras acciones aquí
      },
      error: (error) => {
        console.error("Error en la suscripción:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function urlToBlob(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", url);
      xhr.responseType = "blob"; // convert type
      xhr.send();
    });
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImageB64(result.assets[0].base64);
      const { uri } = result.assets[0];
      const blobData = await urlToBlob(uri);
      setBlobImage(blobData);
      setImage(uri);
      setErrorDate({
        status: false,
        message: "",
      });
    }
  };

  const onHandleSendPromotion = async (data) => {
    const [dayFinal, monthFinal, yearFinal] = data.dateFinal.split("/");
    const [dayInitial, monthInitial, yearInitial] = data.dateInitial.split("/");
    const today = new Date();

    const dateFinalISO = new Date(
      `${yearFinal}-${monthFinal}-${dayFinal}`
    ).toISOString();
    const dateInitialISO = new Date(
      `${yearInitial}-${monthInitial}-${dayInitial}`
    ).toISOString();
    const dateFinal = new Date(`${yearFinal}-${monthFinal}-${dayFinal}`);
    const dateInitial = new Date(
      `${yearInitial}-${monthInitial}-${dayInitial}`
    );
    dateInitial.setHours(0, 0, 0, 0);
    dateFinal.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (dateInitialISO < today) {
      console.log("1", dateInitialISO < today);
      setErrorDate({
        status: true,
        message: "La fecha inicial no puede ser una fecha pasada",
      });
      return;
    }
    if (dateFinal <= dateInitial) {
      console.log("2");

      setErrorDate({
        status: true,
        message: "Tu fecha final no puede ser menor que la fecha inicial",
      });
    } else {
      console.log("3");

      setErrorDate({
        status: false,
        message: "",
      });
    }

    if (!imageB64) {
      setErrorDate({
        status: true,
        message: "Tienes que seleccionar una imagen",
      });
      return;
    }
    setErrorDate({
      status: false,
      message: "",
    });
    const userAuth = await Auth.currentAuthenticatedUser();
    const apiName = "api-portaty";
    const path = "/business/createPromotion";

    try {
      const myInit = {
        body: {
          data: {
            dateInitial: dateInitialISO,
            dateFinal: dateFinalISO,
            title: data.title,
            businessID: formData?.id,
            image: imageB64,
            identityID: userAuth?.attributes["custom:identityID"],
            userID: userAuth?.attributes["custom:userTableID"],
          },
        },
        headers: {},
      };
      const result = await API.post(apiName, path, myInit);
      navigation.navigate("Profile");
      console.log("RESULT: ", result);
    } catch (error) {
      console.log("ERROR: ", error.response.data);
    }
  };
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
      <View
        style={{
          flex: 1,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            marginVertical: 25,
            borderBottomColor: "#1f1f1f",
            borderBottomWidth: 1,
            paddingBottom: 5,
          }}
        >
          Crea una promocion nueva
        </Text>

        {promotions.length === 0 ? (
          <View
            style={{
              flexDirection: "row",
              columnGap: 20,
            }}
          >
            <Pressable onPress={() => pickImage()}>
              <View
                style={{
                  borderColor: "#1f1f1f",
                  borderStyle: "dashed",
                  borderWidth: 1.3,
                  height: 245,
                  width: 150,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {image ? (
                  <Image
                    style={{
                      width: 148,
                      height: 243,
                      borderRadius: 5,
                    }}
                    source={{ uri: image }}
                  />
                ) : (
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                    }}
                    source={require("@/utils/images/cameraadd.png")}
                  />
                )}
              </View>
            </Pressable>

            <View>
              <CustomCalendarInput
                control={control}
                name={`dateInitial`}
                placeholder={`01/01/2000`}
                styled={{
                  text: styles.textInput,
                  label: [styles.labelInput],
                  error: styles.errorInput,
                  input: [styles.inputContainer],
                  placeholder: styles.placeholder,
                }}
                picker={true}
                text={`Fecha inicial`}
              />
              <CustomCalendarInput
                control={control}
                name={`dateFinal`}
                placeholder={`02/01/2000`}
                styled={{
                  text: styles.textInput,
                  label: [styles.labelInput],
                  error: styles.errorInput,
                  input: [styles.inputContainer],
                  placeholder: styles.placeholder,
                }}
                picker={true}
                text={`Fecha final`}
              />
              <CustomInput
                control={control}
                name={`title`}
                placeholder={`Coloca tu titulo`}
                styled={{
                  text: styles.textInput,
                  label: [styles.labelInput],
                  error: styles.errorInput,
                  input: [styles.inputContainer],
                  placeholder: styles.placeholder,
                }}
                rules={{
                  required: `Requerido`,
                }}
                text={`Titulo`}
              />
              {errorDate.status && (
                <Text
                  style={{
                    color: "red",
                    fontFamily: "regular",
                    fontSize: 11,
                    width: 120,
                    marginVertical: 5,
                  }}
                >
                  {errorDate.message}
                </Text>
              )}
              <Pressable
                style={[
                  global.bgYellow,
                  {
                    borderWidth: 1,
                    width: 100,
                    height: 40,
                    borderRadius: 8,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingHorizontal: 10,
                    marginTop: 15,
                  },
                ]}
                onPress={handleSubmit(onHandleSendPromotion)}
              >
                {loading ? (
                  <ActivityIndicator size={`large`} color={`#1f1f1f`} />
                ) : (
                  <Text
                    style={[
                      {
                        fontFamily: "bold",
                        fontSize: 12,
                        color: "#1f1f1f",
                      },
                    ]}
                  >
                    Publicar
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontFamily: "light",
                fontSize: 20,
                textAlign: "center",
                marginVertical: 40
              }}
            >
              Ya tienes una promocion activa
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            marginBottom: 25,
            borderBottomColor: "#1f1f1f",
            borderBottomWidth: 1,
            paddingBottom: 5,
          }}
        >
          Historial de tus promociones
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            width: 320,
          }}
        >
          <View>
            <Text
              style={{
                borderColor: "#1f1f1f",
                borderWidth: 0.8,
                padding: 5,
                borderTopLeftRadius: 5,
                width: 80,
                textAlign: "center",
                fontFamily: "bold",
                fontSize: 12,
              }}
            >
              Fecha Ini.
            </Text>
          </View>
          <View>
            <Text
              style={{
                borderColor: "#1f1f1f",
                borderWidth: 0.8,
                padding: 5,
                borderLeftWidth: 0,
                width: 80,
                textAlign: "center",
                fontFamily: "bold",
                fontSize: 12,
              }}
            >
              Fecha Fin.
            </Text>
          </View>
          <View>
            <Text
              style={{
                borderColor: "#1f1f1f",
                borderWidth: 0.8,
                padding: 5,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                width: 80,
                textAlign: "center",
                fontFamily: "bold",
                fontSize: 12,
              }}
            >
              Estatus
            </Text>
          </View>
          <View>
            <Text
              style={{
                borderColor: "#1f1f1f",
                borderWidth: 0.8,
                padding: 5,
                borderTopRightRadius: 5,
                width: 80,
                textAlign: "center",
                fontFamily: "bold",
                fontSize: 12,
              }}
            >
              Imagen
            </Text>
          </View>
        </View>

        {promotions.map((item, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              width: 320,
            }}
          >
            <View>
              <Text
                style={{
                  padding: 5,
                  borderTopLeftRadius: 5,
                  width: 80,
                  textAlign: "center",
                  fontFamily: "light",
                  fontSize: 12,
                }}
              >
                {String(item.dateInitial.split("T")[0])}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  padding: 5,
                  borderLeftWidth: 0,
                  width: 80,
                  textAlign: "center",
                  fontFamily: "light",
                  fontSize: 12,
                }}
              >
                {String(item.dateFinal.split("T")[0])}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  padding: 5,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  width: 80,
                  textAlign: "center",
                  fontFamily: "light",
                  fontSize: 12,
                }}
              >
                {item.status === "PUBLISHED" ? "Activo" : "Acabo"}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => Linking.openURL(item.image)}>
                <Text
                  style={{
                    padding: 5,
                    borderTopRightRadius: 5,
                    width: 80,
                    textAlign: "center",
                    fontFamily: "medium",
                    fontSize: 12,
                    color: "blue",
                  }}
                >
                  Ver foto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CustomPromotions;
