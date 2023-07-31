import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import styles from "@/assets/styles/Forgot.module.css";
import { useForm } from "react-hook-form";
import { es } from "@/assets/constants/lenguage";
import { useRouter } from "expo-router";
import { Auth } from "aws-amplify";

const Forgot = () => {
  const router = useRouter();
  const global = require("@/assets/styles/global.js");
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");
  const pwd = watch("password");
  const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  const onHandleSendCodeEmail = async (data) => {
    const { email, password } = data;
    try {
      await Auth.forgotPassword(email);
      const passwordReplace = password.toString().replace(/%/g, "~~pct~~");
      const codificado = encodeURIComponent(passwordReplace);
      router.push({
        pathname: `/forgot/confirm`,
        params: {
          email: email,
          password: codificado,
        },
      });
    } catch (error) {
      const response = new Error(error);
      const { message } = response;
      console.log("ERROR AL ENVIAR CODIGO", message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, global.bgWhite]}
      keyboardVerticalOffset={32}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.content, global.bgWhite]}>
          <ScrollView
            style={[styles.content, global.bgWhite]}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{es.authentication.forgot.title}</Text>
            <CustomInput
              control={control}
              name={`email`}
              placeholder={es.authentication.forgot.email.placeholder}
              styled={{
                text: styles.textInput,
                label: [styles.labelInput, global.topGray],
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              icon={require("@/assets/images/email.png")}
              text={es.authentication.forgot.email.title}
              rules={{
                required: "requiere correo electronico",
              }}
            />
            <Text style={[styles.code, global.topGray]}>
              {es.authentication.forgot.code}{" "}
              <Text style={styles.emailText}>{email}</Text>
            </Text>
            <CustomInput
              control={control}
              name={`password`}
              placeholder={es.authentication.forgot.password.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={es.authentication.forgot.password.title}
              icon={require("@/assets/images/password.png")}
              security={true}
              rules={{
                required: es.authentication.forgot.password.rules,
                minLength: {
                  value: 8,
                  message: "Mínimo 8 caracteres",
                },
              }}
            />
            <CustomInput
              control={control}
              name={`password-repeat`}
              placeholder={es.authentication.forgot.repeat.placeholder}
              styled={{
                text: styles.textInput,
                label: styles.labelInput,
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={es.authentication.forgot.repeat.title}
              icon={require("@/assets/images/password.png")}
              security={true}
              rules={{
                required: es.authentication.forgot.repeat.rules,
                validate: (value) => value == pwd || "No coincide",
              }}
            />
          </ScrollView>
          <View style={{ height: 60 }}>
            <CustomButton
              text={es.authentication.forgot.button}
              handlePress={handleSubmit(onHandleSendCodeEmail)}
              textStyles={[styles.textContinue, global.white]}
              buttonStyles={[styles.continue, global.mainBgColor]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Forgot;
