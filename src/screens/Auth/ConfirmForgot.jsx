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
  import styles from "@/utils/styles/Confirm.module.css";
  import EnterCode from "@/components/EnterCode";
  import CustomButton from "@/components/CustomButton";
  import { es } from "@/utils/constants/lenguage";
  import { Auth } from "aws-amplify";
  
  const ConfirmForgot = ({navigation, router}) => {
    const global = require("@/utils/styles/global.js");
    const {email, password} = route.params
    const { control, handleSubmit } = useForm({
      defaultValues: {
        email: email,
        password: password,
        code: ["", "", "", "", "", ""],
      },
    });
    const onHandleConfirmCodeNewPassword = async (data) => {
      console.log(data);
      const { email, code, password } = data;
      let newCode = "";
      code.forEach((item) => {
        newCode = newCode + item;
      });
      try {
        await Auth.forgotPasswordSubmit(email, newCode, password);
        navigation.navigate('Login')
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
              <Text>Enviamos el codigo de confirmacion a {email}</Text>
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
  
  export default ConfirmForgot;
  