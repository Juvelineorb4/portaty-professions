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

const ConfirmRegister = ({ navigation, route }) => {
  const [time, setTime] = useState(10 * 60); // 10 minutos
  const [loading, setLoading] = useState(false); // 10 minutos
  const { email } = route.params;
  const [codeInputs, setCodeInputs] = useRecoilState(codeFields);
  const global = require("@/utils/styles/global.js");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: email,
    },
  });

  const onHandleConfirm = async (data) => {
    const { email } = data;
    setLoading(true)
    try {
      // if (!code.lenght === 6) return console.log("no tiene 6");
      await Auth.confirmSignUp(email, codeInputs);
      Alert.alert("Usuario Registrado Exitosamente");
      navigation.replace("Login_Welcome", { screen: "Login" });
      setCodeInputs("");
    } catch (error) {
      console.log("ERROR AL CONFIRMAR USUARIO: ", error);
    }
    setLoading(false)

  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

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
            <Text style={{ fontFamily: "light", fontSize: 16 }}>
              Enviamos el codigo de confirmacion a {email}
            </Text>
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
              <TouchableOpacity onPress={() => console.log("Aun no esta")}>
                <Text style={styles.subtitleAlert}>
                  {es.authentication.account.code.subtitle}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{ height: 60 }}>
            <CustomButton
            
              text={loading ? (
                <ActivityIndicator color={`#ffffff`}/>
              ) : (
                es.authentication.account.button
              )}
              handlePress={handleSubmit(onHandleConfirm)}
              textStyles={[styles.textContinue, global.white]}
              buttonStyles={[styles.continue, global.mainBgColor]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ConfirmRegister;
