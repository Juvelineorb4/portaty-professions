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
import { es } from "@/assets/constants/lenguage";
import { router, useRouter } from "expo-router";
const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

const Register = () => {
  const global = require("@/assets/styles/global.js");
  const { control, handleSubmit } = useForm();
  const router = useRouter()
  const onHandleRegister = () => {
    router.replace('/register/confirm')
  }
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
              name={`phone`}
              placeholder={es.authentication.register.phone.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={`Número de teléfono`}
              icon={require(`../../../assets/images/phone.png`)}
              rules={{
                required: es.authentication.register.phone.rules,
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
            text={
                es.authentication.register.button
            }
            handlePress={onHandleRegister}
            textStyles={[styles.textContinue, global.white]}
            buttonStyles={[styles.continue, global.mainBgColor]}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
