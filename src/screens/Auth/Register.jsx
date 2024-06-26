import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "@/utils/styles/Register.module.css";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import CustomInputSelect from "@/components/CustomInputSelect";
import CustomButton from "@/components/CustomButton";
import CustomCalendarInput from "@/components/CustomCalendarInput";
import { es } from "@/utils/constants/lenguage";
import { Auth } from "aws-amplify";
import ModalAlert from "@/components/ModalAlert";
import CustomCheckBox from "@/components/CustomCheckBox";
import * as WebBrowser from "expo-web-browser";

// recoil
import { notificationToken } from "@/atoms/index";
import { useRecoilValue } from "recoil";
const Register = ({ navigation }) => {
  const token = useRecoilValue(notificationToken);
  const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");
  const global = require("@/utils/styles/global.js");
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      birthdate: "",
      password: "",
      "password-repeat": "",
    },
  });
  const pwd = watch("password");

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

  const CloseModal = () => {
    setVisible(false);
  };

  const onHandleRegister = async (data) => {
    setIsLoading(true);
    const { name, lastName, email, password, birthdate, gender } = data;
    const fullName = `${name.trim()} ${lastName.trim()}`;
    const fechaISO8601 = convertirFechaADateISO8601(birthdate);
    try {
      const result = await Auth.signUp({
        username: email.trim(),
        password: password.trim(),
        attributes: {
          email: email.trim(),
          name: name.trim(),
          birthdate: fechaISO8601,
          "custom:lastName": lastName.trim(),
          "custom:gender": gender.trim(),
          "custom:notificationToken": token,
        },
      });
      navigation.navigate("ConfirmRegister", {
        email: email.trim(),
      });
    } catch (error) {
      console.log(error);
      switch (error?.message) {
        case "An account with the given email already exists.":
          setError(`El correo: ${email.trim()}. Ya esta registrado!`);
          setVisible(true);
          break;

        default:
          setError(`Ocurrio un error, Intente mas tarde!`);
          setVisible(true);
          break;
      }
    }
    setIsLoading(false);
  };

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.portaty.com/terminos"
    );
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
            {/* <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              > */}
            <CustomInput
              control={control}
              name={`name`}
              placeholder={es.authentication.register.name.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhite],
              }}
              text={`Nombre`}
              // icon={require("@/utils/images/profile_default.png")}
              rules={{
                required: es.authentication.register.name.rules,
              }}
            />
            <CustomInput
              control={control}
              name={`lastName`}
              placeholder={es.authentication.register.lastName.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhite],
              }}
              text={`Apellido`}
              // icon={require("@/utils/images/profile_default.png")}
              rules={{
                required: es.authentication.register.lastName.rules,
              }}
            />
            <CustomInputSelect
              control={control}
              name={`gender`}
              placeholderTextColor={`#1f1f1f`}
              placeholder="Elige tu género"
              editable={false}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholderGender,
                input: [styles.inputContainer, global.bgWhite],
                security: styles.security,
              }}
              text={`Género`}
              rules={{
                required: es.authentication.register.password.rules,
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
                input: [styles.inputContainer, global.bgWhite],
              }}
              text={`Fecha de nacimiento`}
              // icon={require("@/utils/images/calendar.png")}
              rules={{
                required: es.authentication.register.birthday.rules,
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
                input: [styles.inputContainer, global.bgWhite],
              }}
              text={`Correo electronico`}
              // icon={require("@/utils/images/email.png")}
              rules={{
                required: `Requerido`,
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Email no valido.",
                },
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
                input: [styles.inputContainer, global.bgWhite],
                security: styles.security,
              }}
              text={`Contraseña`}
              // icon={require("@/utils/images/password.png")}
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
                input: [styles.inputContainer, global.bgWhite],
                security: styles.security,
              }}
              text={`Repetir contraseña`}
              // icon={require("@/utils/images/password.png")}
              security={true}
              rules={{
                required: es.authentication.register.repeat.rules,
                validate: (value) => value == pwd || "No coincide",
              }}
            />
          </View>
          <CustomCheckBox
            control={control}
            name={"terms"}
            text={"Acepto los terminos y condiciones"}
            onPressed={_handlePressButtonAsync}
            rules={{ required: "Requerido" }}
          />
        </ScrollView>
        <View style={{ height: 65 }}>
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={`#1f1f1f`} />
              ) : (
                es.authentication.register.button
              )
            }
            disabled={isLoading}
            handlePress={handleSubmit(onHandleRegister)}
            textStyles={[styles.textContinue, global.black]}
            buttonStyles={[styles.continue, global.mainBgColor]}
          />
        </View>
      </View>
      <ModalAlert
        text={error}
        icon={require("@/utils/images/error.png")}
        close={() => CloseModal()}
        open={visible}
      />
    </KeyboardAvoidingView>
  );
};

export default Register;
