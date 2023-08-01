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
import MultiSelect from "react-native-multiple-select";
import CustomTags from "@/components/CustomTags";

const Form = () => {
  const global = require("@/assets/styles/global.js");
  const { control } = useForm();
    const tags = [
        {
            id: '1',
            name: 'Pizza'
        },
        {
            id: '2',
            name: 'Hogar'
        },
        {
            id: '3',
            name: 'Carpinteria'
        },
        {
            id: '4',
            name: 'Pasteleria'
        },
    ]
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
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 120 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
              marginRight: 5,
            }}
            source={require("@/assets/images/cameraadd.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            global.mainBgColor,
            {
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 49,
              marginTop: 10,
            },
          ]}
        >
          <Text style={[global.white, { fontFamily: "medium", fontSize: 14 }]}>
            {`Registrar`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Form;
