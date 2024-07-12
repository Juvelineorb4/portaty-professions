import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import styles from "@/utils/styles/CustomPromotions.js";

const CustomPromotions = ({ route, navigation }) => {
  const { data } = route.params;
  const global = require("@/utils/styles/global.js");
  const [image, setImage] = useState(null);
  const [imageB64, setImageB64] = useState(null);
  const [blobImage, setBlobImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();

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
      setError(false);
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
            <CustomInput
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
              text={`Fecha inicial`}
            />
            <CustomInput
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
              text={`Titulo`}
            />
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
              onPress={() => console.log("buenas")}
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
                        fontSize: 12,
                        color: "#1f1f1f",
                      },
                    ]}
                  >
                    Publicar
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
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
      </View>
    </ScrollView>
  );
};

export default CustomPromotions;
