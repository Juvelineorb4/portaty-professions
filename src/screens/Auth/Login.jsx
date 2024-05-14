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
import ModalAlert from "@/components/ModalAlert";
import Constants from "expo-constants";
import useCheckAppVersion from "@/hooks/useCheckAppVersion";
import ModalUpdate from "@/components/ModalUpdate";

const Login = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm();
  const emailForm = watch("email");
  const global = require("@/utils/styles/global.js");
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)\s*$/;
  const { updateAvailable, fetchUpdate, updateVersion, updateDate } =
    useCheckAppVersion();
  const [errorActive, setErrorActive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [numberError, setNumberError] = useState(0);
  const onHandleLogin = async (data) => {
    const { email, password } = data;
    setErrorActive("");
    setIsLoading(true);
    try {
      const result = await Auth.signIn(email.trim(), password.trim());
    } catch (error) {
      console.log("ERROR AL LOGEARTE", error.message);
      switch (error.message) {
        case "User is not confirmed.":
          setNumberError(1);
          setError(`Usuario: ${email} no confirmado, por favor confirmar`);
          setVisible(true);
          break;

        case "User does not exist.":
          setErrorActive(
            `Usuario: ${email} no registrado por favor registrarse`
          );
          break;
        case "Incorrect username or password.":
          setErrorActive(`Correo y/o contraseña incorrectos.`);
          break;
        case "User is disabled.":
          setErrorActive(
            "Usuario deshabilitado.\nComunicate con soporte Tecnico."
          );
          break;
        case "Password reset required for the user":
          setNumberError(2);
          setError("Por favor, actualiza tu contraseña.");
          setVisible(true);
          break;
        default:
          setErrorActive(`Ocurrio un error intente mas tarde.`);
          break;
      }
      setIsLoading(false);
      console.log("ERROR AL LOGEARSE: ", error.message);
    }
  };

  const CloseModal = () => {
    switch (numberError) {
      case 1:
        navigation.navigate("Register_App", {
          screen: "ConfirmRegister",
          params: { email: emailForm },
        });
        break;
      case 2:
        navigation.navigate("Forgot_App", {
          screen: "Forgot",
          params: { email: emailForm },
        });
        break;
      default:
        setErrorActive(`Ocurrio un error intente mas tarde.`);
        break;
    }
    setVisible(false);
  };

  const onHandleLoginSocial = async (type) => {
    try {
      switch (type) {
        case "google":
          Auth.federatedSignIn({
            provider: "Google",
            attributes: {
              birthdays: "1998-09-20",
            },
          });

          break;
      }
    } catch (error) {
      console.log("ERROR SOCIAL: ", error);
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

            <Text style={styles.name}>{es.authentication.login.name}</Text>
            {errorActive && (
              <Text style={styles.errorInputMain}>{errorActive}</Text>
            )}
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  width: 300,
                  height: 100,
                  marginBottom: 5,
                  resizeMode: "contain",
                }}
                source={require("@/utils/images/welcome.png")}
              />
            </View>

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
              placeholder={`**********`}
              styled={{
                text: styles.textInput,
                label: [styles.labelInput, global.topGray],
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhite],
                security: styles.security,
              }}
              text={`Contraseña`}
              // icon={require("@/utils/images/password.png")}
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
        <View style={{ height: 65 }}>
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={"#1f1f1f"} />
              ) : (
                es.authentication.login.button
              )
            }
            disabled={isLoading}
            handlePress={handleSubmit(onHandleLogin)}
            textStyles={[styles.textLogin, global.black]}
            buttonStyles={[styles.login, global.bgYellow]}
          />
        </View>

        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate("Forgot_App")}>
            <Text style={styles.forgot}>{es.authentication.login.forgot}</Text>
          </TouchableOpacity>
        </View>
        {/* BTN SOCIAL */}
        <View>
          <TouchableOpacity onPress={() => onHandleLoginSocial("google")}>
            <Text>GOOGLE</Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text>V</Text>
          <Text style={{ fontFamily: "bold" }}>
            {Constants.expoConfig.version}
          </Text>
        </View>
      </View>
      <ModalUpdate
        isVisible={updateAvailable}
        version={updateVersion ? updateVersion : "No definido"}
        updateDate={updateDate ? updateDate : "No definido"}
        onConfirm={fetchUpdate}
      />
      <ModalAlert
        text={error}
        close={() => CloseModal()}
        open={visible}
        icon={require("@/utils/images/error.png")}
      />
    </KeyboardAvoidingView>
  );
};
export default Login;
