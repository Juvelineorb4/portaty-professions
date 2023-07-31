import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import styles from "@/assets/styles/Register.module.css";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import CustomCalendarInput from "@/components/CustomCalendarInput";
import { es } from "@/assets/constants/lenguage";
import { router, useRouter } from "expo-router";
const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

// amplify import library
import { Auth } from "aws-amplify";

const Register = () => {
  const global = require("@/assets/styles/global.js");
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      birthday: "",
      password: "",
      "password-repeat": "",
    },
  });
  const pwd = watch("password");
  const router = useRouter();

  const convertirFechaADateISO8601 = (date) => {
    // Separamos la fecha en día, mes y año
    const [dia, mes, anio] = date.split("/");
    // Creamos un nuevo objeto Date utilizando el formato "AAAA-MM-DD"
    const fechaISO8601 = new Date(`${anio}-${mes}-${dia}`);
    // Verificamos que la fecha sea válida
    if (isNaN(fechaISO8601)) {
      return null; // Si la fecha no es válida, retornamos null
    }
    // Convertimos la fecha a string en formato "AAAA-MM-DD"
    return fechaISO8601.toISOString().split("T")[0];
  };

  const onHandleRegister = async (data) => {
    const { name, email, password, birthdate } = data;
    const fechaISO8601 = convertirFechaADateISO8601(birthdate);
    console.log("FECHA: ", fechaISO8601);
    try {
      const result = await Auth.signUp({
        username: email.trim(),
        password: password.trim(),
        attributes: {
          email: email.trim(),
          name: name.trim(),
          birthdate: fechaISO8601,
        },
      });
      router.replace({
        pathname: "/register/confirm",
        params: {
          email,
        },
      });
    } catch (error) {
      console.log("ERROR AL REGISTAR: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, global.bgWhite]}
      keyboardVerticalOffset={32}
    >
      <View style={[styles.content, global.bgWhite]}>
        <ScrollView
          style={[styles.scroll, global.bgWhite]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content]}>
            <Text style={styles.title}>{es.authentication.register.title}</Text>
            <CustomInput
              control={control}
              name={`name`}
              placeholder={es.authentication.register.name.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={`Nombre`}
              icon={require(`../../../assets/images/profile_default.png`)}
              rules={{
                required: es.authentication.register.name.rules,
              }}
            />
            <CustomInput
              control={control}
              name={`email`}
              placeholder={es.authentication.register.email.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={`Correo Electronico`}
              icon={require(`../../../assets/images/email.png`)}
              rules={{
                required: es.authentication.register.email.rules,
              }}
            />
            <CustomCalendarInput
              control={control}
              setValue={setValue}
              name={`birthdate`}
              placeholder={es.authentication.register.birthday.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={`Fecha de Nacimiento`}
              icon={require(`../../../assets/images/calendar.png`)}
              rules={{
                required: es.authentication.register.birthday.rules,
              }}
            />
            <CustomInput
              control={control}
              name={`password`}
              placeholder={es.authentication.register.password.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={`Contraseña`}
              icon={require(`../../../assets/images/password.png`)}
              security={true}
              rules={{
                required: es.authentication.register.password.rules,
                minLength: {
                  value: 8,
                  message: "Mínimo 8 caracteres",
                },
              }}
            />
            <CustomInput
              control={control}
              name={`password-repeat`}
              placeholder={es.authentication.register.repeat.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={`Repetir contraseña`}
              icon={require(`../../../assets/images/password.png`)}
              security={true}
              rules={{
                required: es.authentication.register.repeat.rules,
                validate: (value) => value == pwd || "No coincide",
              }}
            />
          </View>
        </ScrollView>
        <View style={{ height: 60 }}>
          <CustomButton
            text={es.authentication.register.button}
            handlePress={handleSubmit(onHandleRegister)}
            textStyles={[styles.textContinue, global.white]}
            buttonStyles={[styles.continue, global.mainBgColor]}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
