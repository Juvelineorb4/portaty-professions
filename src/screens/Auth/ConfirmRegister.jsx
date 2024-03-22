import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/utils/styles/Confirm.module.css";
import EnterCode from "@/components/EnterCode";
import CustomButton from "@/components/CustomButton";
import { es } from "@/utils/constants/lenguage";
import { Auth } from "aws-amplify";
import { Alert } from "react-native";
import CustomCodeField from "@/components/CustomCodeField";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeFields } from "@/atoms";
import ModalAlert from "@/components/ModalAlert";

const ConfirmRegister = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const [time, setTime] = useState(60 * 60); // 10 minutos
  const [timeResend, setTimeResend] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [loading, setLoading] = useState(false); // 10 minutos
  const [visible, setVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState("");
  const [codeInputs, setCodeInputs] = useRecoilState(codeFields);
  const [codeSend, setCodeSend] = useState("");
  const [errorSendCode, setErrorSendCode] = useState("");

  const { params } = route;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: params?.email,
    },
  });

  const onHandleConfirm = async () => {
    const { email } = params;

    setErrorMsg("");
    setCodeSend("");
    setErrorSendCode("");
    setLoading(true);
    try {
      await Auth.confirmSignUp(email, codeInputs);
      setVisible(true);
      setCodeInputs("");
    } catch (error) {
      console.log("Error al confirmar usuario: ", error.message);
      switch (error.message) {
        case "Invalid verification code provided, please try again.":
          setErrorMsg(
            `Se proporcionó un código de verificación no válido (${codeInputs}). Inténtelo de nuevo.`
          );
          break;
        case "Attempt limit exceeded, please try after some time.":
          setErrorMsg(
            `Se superó el límite de intentos. Inténtelo después de un tiempo.`
          );
          break;
        default:
          setErrorMsg("Ocurrio un error, Intente de nuevo.");
          break;
      }
    }
    setLoading(false);
  };

  const CloseModal = () => {
    navigation.replace("Login_Welcome", { screen: "Login" });
    setVisible(false);
  };

  const onHandleResendCode = async () => {
    const { email } = params;
    setErrorMsg("");
    setCodeSend("");
    setErrorSendCode("");
    try {
      const result = await Auth.resendSignUp(email);
      setCodeSend(
        `Codigo enviado al ${result?.CodeDeliveryDetails?.Destination}`
      );
      setTime(60 * 60);
      setTimeResend(5 * 60);
    } catch (error) {
      console.log("ERROR AL ENVIAR MENSAJE: ", error.message);
      switch (error.message) {
        case "Attempt limit exceeded, please try after some time.":
          setErrorSendCode(
            `Se superó el límite de intentos. Inténtelo después de un tiempo.`
          );
          break;

        default:
          setErrorSendCode("Ocurrio un error, Intente de nuevo.");
          break;
      }
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(timerId);
      return () => clearInterval(timerId);
    }
  }, [time]);

  useEffect(() => {
    if (timeResend <= 0) setCodeSend("");
    if (timeResend > 0) {
      const timerId = setInterval(() => {
        setTimeResend((prevTimeResend) => prevTimeResend - 1);
      }, 1000);
      setIntervalId(timerId);
      return () => clearInterval(timerId);
    }
  }, [timeResend]);
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
            <Text style={[styles.title, global.mainColor]}>
              {es.authentication.account.entercode.title}
            </Text>
            <Text
              style={{ fontFamily: "light", fontSize: 16, marginBottom: 5 }}
            >
              Enviamos el codigo de confirmacion a {params?.email}
            </Text>
            <Text style={{ color: "red" }}>{errorMsg}</Text>
            <Text
              style={[{ fontSize: 16, fontFamily: "light", marginTop: 10 }]}
            >{`Tu codigo expirara en: ${formatTime(
              time
            )} introducelo antes`}</Text>

            <CustomCodeField />
            <View style={{ marginTop: 10 }}>
              <Text style={styles.titleAlert}>
                {es.authentication.account.code.title}
              </Text>
              <TouchableOpacity onPress={onHandleResendCode}>
                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.subtitleAlert,
                      timeResend > 0 && { color: "rgba(0, 0, 0, 0.2)" },
                    ]}
                  >
                    {es.authentication.account.code.subtitle}
                  </Text>
                  {timeResend > 0 && (
                    <Text style={[styles.subtitleAlert]}>
                      {formatTime(timeResend)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "green" }}>{codeSend}</Text>
              <Text style={{ color: "red" }}>{errorSendCode}</Text>
            </View>
            <View>
              <Text
                style={[styles.subtitleAlert, { color: "rgba(0, 0, 0, 0.2)" }]}
              >
                *No olvides revisar la sección de "SPAM"*
              </Text>
            </View>
          </ScrollView>
          <View style={{ height: 60 }}>
            <CustomButton
              text={
                loading ? (
                  <ActivityIndicator color={`#1f1f1f`} />
                ) : (
                  es.authentication.account.button
                )
              }
              handlePress={handleSubmit(onHandleConfirm)}
              textStyles={[styles.textContinue, global.black]}
              buttonStyles={[styles.continue, global.mainBgColor]}
            />
          </View>
          <ModalAlert
            text={"Usuario registrado exitosamente"}
            close={() => {
              CloseModal();
            }}
            open={visible}
            icon={require("@/utils/images/successful.png")}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ConfirmRegister;
