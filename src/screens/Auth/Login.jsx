import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
} from "react-native";
import { Auth } from "aws-amplify";
import styles from "@/utils/styles/Login.module.css";
import { es } from "@/utils/constants/lenguage";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

const Login = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const global = require("@/utils/styles/global.js");
  const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const [errorActive, setErrorActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onHandleLogin = async (data) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const result = await Auth.signIn(email.trim(), password.trim());
    } catch (error) {
      const response = new Error(error);
      const { message } = response;
      switch (message) {
        case "UserNotConfirmedException: User is not confirmed.":
          Alert.alert(`Usuario: ${email} no confirmado`, "por favor confirmar");
          navigation.navigate("Register_App", {
            screen: "ConfirmRegister",
            params: { email: email },
          });
          break;

        case "UserNotFoundException: User does not exist.":
          Alert.alert(
            `Usuario: ${email} no registrado`,
            "por favor resgitrase"
          );
          break;
        default:
          break;
      }
      setIsLoading(false);
      console.log("ERROR AL LOGEARSE: ", message);
      Alert.alert("Error Al Logearse: ", message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, global.bgWhite]}
      keyboardVerticalOffset={32}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={[styles.scroll, global.bgWhite]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 30,
          }}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{es.authentication.login.title}</Text>
            <Image
              style={{
                width: 300,
                height: 100,
                marginBottom: 25,
                resizeMode: "contain",
              }}
              source={require("@/utils/images/welcome.png")}
            />
            <Text style={styles.name}>{es.authentication.login.name}</Text>
            {errorActive && (
              <Text style={styles.errorInputMain}>
                Correo electrónico y/o contraseña incorrectos
              </Text>
            )}
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
              icon={require("@/utils/images/email.png")}
              rules={{
                required: es.authentication.register.email.rules,
              }}
            />
            <CustomInput
              control={control}
              name={`password`}
              placeholder={`**********`}
              styled={{
                text: styles.textInput,
                label: [styles.labelInput, global.topGray],
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              text={`Contraseña`}
              icon={require("@/utils/images/password.png")}
              security={true}
              rules={{
                required: "Contraseña requerida",
                minLength: {
                  value: 8,
                  message: "8 caracteres minimo",
                },
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.panel}>
        <View style={{ height: 60 }}>
          <CustomButton
            text={
              isLoading ? <ActivityIndicator /> : es.authentication.login.button
            }
            handlePress={handleSubmit(onHandleLogin)}
            textStyles={[styles.textLogin, global.white]}
            buttonStyles={[styles.login, global.mainBgColor]}
          />
        </View>

        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate("Forgot_App")}>
            <Text style={styles.forgot}>{es.authentication.login.forgot}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup}>
          <Text style={styles.dont}>{es.authentication.login.question}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register_App")}>
            <Text style={styles.signupBtn}>
              {es.authentication.login.register}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;
