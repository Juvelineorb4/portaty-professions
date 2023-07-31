import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "@/assets/styles/Confirm.module.css";
import EnterCode from "@/components/EnterCode";
import CustomButton from "@/components/CustomButton";
import { es } from "@/assets/constants/lenguage";
import {
  useRouter,
  usePathname,
  useNavigation,
  useLocalSearchParams,
} from "expo-router";
// amplify
import { Auth } from "aws-amplify";
import { Alert } from "react-native";

const Confirm = () => {
  const router = useRouter();
  const pathName = usePathname();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const global = require("@/assets/styles/global.js");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: params?.email,
      code: ["", "", "", "", "", ""],
    },
  });

  const onHandleConfirm = async (data) => {
    const { code, email } = data;
    let newCode = "";
    code.forEach((item) => {
      newCode = newCode + item;
    });
    try {
      if (!code.lenght === 6) return console.log("no tiene 6");
      await Auth.confirmSignUp(email, newCode);
      Alert.alert("Usuario Registrado Exitosamente");
      router.replace("/(auth)/login");
    } catch (error) {
      console.log("ERROR AL CONFIRMAR USUARIO: ", error);
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
            style={[styles.scroll, global.bgWhite]}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>
              {es.authentication.account.entercode.title}
            </Text>
            <Text>Enviamos el codigo de confirmacion a {params.email}</Text>
            <EnterCode
              title={es.authentication.account.code.title}
              subtitle={es.authentication.account.code.subtitle}
              control={control}
            />
          </ScrollView>
          <View style={{ height: 60 }}>
            <CustomButton
              text={es.authentication.account.button}
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

export default Confirm;
