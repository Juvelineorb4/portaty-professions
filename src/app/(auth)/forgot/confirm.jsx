import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/assets/styles/Confirm.module.css";
import EnterCode from "@/components/EnterCode";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { es } from "@/assets/constants/lenguage";
<<<<<<< HEAD
import { useLocalSearchParams, useRouter } from "expo-router";

const Confirm = () => {
  const router = useRouter();
  const { email, password } = useLocalSearchParams()
=======
import { useRouter, useLocalSearchParams } from "expo-router";
// amplify
import { Auth } from "aws-amplify";

const Confirm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
>>>>>>> 87d88912c5186da2ef6945775fa97bd9bd871205
  const global = require("@/assets/styles/global.js");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: params?.email,
      password: params?.password,
      code: ["", "", "", "", "", ""],
    },
  });
<<<<<<< HEAD
  console.log(email, password)
=======
  console.log("PARSM: ", params);
  const onHandleConfirmCodeNewPassword = async (data) => {
    console.log(data);
    const { email, code, password } = data;
    let newCode = "";
    code.forEach((item) => {
      newCode = newCode + item;
    });
    try {
      await Auth.forgotPasswordSubmit(email, newCode, password);
      router.replace({
        pathname: "/(auth)/login",
        params: {
          email,
        },
      });
    } catch (error) {
      const { message } = new Error(error);
      console.log("ERROR AL CONFIRMAR CODIGO: ", message);
    }
  };

  // const onHandleResendCode = async () => {
  //   const { username } = params;
  //   try {
  //     await Auth.forgotPassword(username);
  //   } catch (error) {
  //     const { message } = new Error(error);
  //     console.log("ERROR AL ENVIAR MENSAJE: ", message);
  //   }
  // };

>>>>>>> 87d88912c5186da2ef6945775fa97bd9bd871205
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, global.bgWhite]}
      keyboardVerticalOffset={32}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.content, global.bgWhite]}>
          <ScrollView
            style={[styles.scroll, global.bgWhite]}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{es.authentication.forgot.title}</Text>
            <Text>Enviamos el codigo de confirmacion a {params?.email}</Text>
            <EnterCode
              title={es.authentication.account.code.title}
              subtitle={es.authentication.account.code.subtitle}
              control={control}
            />
          </ScrollView>
          <View style={{ height: 60 }}>
            <CustomButton
              text={`Confirmar contraseña`}
              handlePress={handleSubmit(onHandleConfirmCodeNewPassword)}
              textStyles={[styles.textContinue, global.white]}
              buttonStyles={[styles.continue, global.mainBgColor]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Confirm;
