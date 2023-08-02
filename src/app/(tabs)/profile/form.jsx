import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import styles from "@/assets/styles/RegisterForm.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import CustomTags from "@/components/CustomTags";
import * as ImagePicker from "expo-image-picker";

const Form = () => {
  const global = require("@/assets/styles/global.js");
  const { control } = useForm();
  const [image, setImage] = useState(null);
  const tags = [
    {
      id: "1",
      name: "Pizza",
    },
    {
      id: "2",
      name: "Hogar",
    },
    {
      id: "3",
      name: "Carpinteria",
    },
    {
      id: "4",
      name: "Pasteleria",
    },
  ];
  const pickImage = async () => {
    ImagePicker.getPendingResultAsync;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 6],
      quality: 0.5,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
      console.log(uri);
    }
  };
  useEffect(() => {}, []);

  return (
    <ScrollView style={[global.bgWhite, styles.container]}>
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
        text={`Razon social`}
      />
      <CustomInput
        control={control}
        name={`address`}
        placeholder={`Av. Bolivar - Calle 1`}
        styled={{
          text: styles.textInput,
          label: [styles.labelInput],
          error: styles.errorInput,
          input: [styles.inputContainer],
          placeholder: styles.placeholder,
        }}
        text={`Direccion`}
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
        text={`Correo electronico`}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomInput
          control={control}
          name={`phone`}
          placeholder={`+58 123 4567`}
          styled={{
            text: styles.textInputBot,
            label: [styles.labelInputBot],
            error: styles.errorInputBot,
            input: [styles.inputContainerBot],
            placeholder: styles.placeholderBot,
          }}
          text={`Telefono`}
        />
        <CustomInput
          control={control}
          name={`wsme`}
          placeholder={`ws.yourlink.me`}
          styled={{
            text: styles.textInputBot,
            label: [styles.labelInputBot],
            error: styles.errorInputBot,
            input: [styles.inputContainerBot],
            placeholder: styles.placeholderBot,
          }}
          text={`Whats App Me`}
        />
      </View>
      <CustomInput
        control={control}
        name={`activity`}
        placeholder={`Venta de Comida y Bebidas`}
        styled={{
          text: styles.textInput,
          label: [styles.labelInput],
          error: styles.errorInput,
          input: [styles.inputContainer],
          placeholder: styles.placeholder,
        }}
        text={`Actividad Laboral`}
      />
      <CustomTags data={tags} />
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          position: 'relative'
        }}
        onPress={pickImage}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginRight: 5,
          }}
          source={require("@/assets/images/cameraadd.png")}
        />
        {image && (
          <Image
            style={{
              width: 95,
              height: 95,
              resizeMode: "cover",
              borderRadius: 8,
              position: "absolute",
              left: 110,
            }}
            source={{ uri: image }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "light",
          fontSize: 14,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Sube una imagen de tu negocio
      </Text>
      <TouchableOpacity
        style={[
          global.mainBgColor,
          {
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 55,
            marginTop: 10,
            marginBottom: 125,
          },
        ]}
      >
        <Text style={[global.white, { fontFamily: "medium", fontSize: 14 }]}>
          {`Registrar`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Form;
