import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "@/assets/styles/Login.module.css";
import { es } from "@/assets/constants/lenguage";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";

const Login = () => {
  
  const router = useRouter();
  const { control } = useForm();
  const global = require("@/assets/styles/global.js");
  const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const [errorActive, setErrorActive] = useState(false);
  
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
              <Text style={styles.errorInputMain}>
                Correo electrónico y/o contraseña incorrectos
              </Text>
            )}
            <CustomInput
              control={control}
              name={`phone`}
              placeholder={`+58 123 4567`}
              styled={{
                text: styles.textInput,
                label: [styles.labelInput, global.topGray],
                error: styles.errorInput,
                placeholder: styles.placeholder,
                input: [styles.inputContainer, global.bgWhiteSoft],
              }}
              icon={require(`../../../assets/images/phone.png`)}
              text={`Número de teléfono`}
              rules={{
                required: "Correo electrónico requerido",
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
              icon={require(`../../../assets/images/password.png`)}
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
                text={es.authentication.login.button}
                handlePress={() => router.replace({pathname: "/(tabs)/home", params: {
                  email: 'ejemplo.com',
                  password: '123'
                }})}
                textStyles={[styles.textLogin, global.white]}
                buttonStyles={[styles.login, global.mainBgColor]}
              />
            </View>

            <View style={styles.options}>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/forgot")}
              >
                <Text style={styles.forgot}>
                  {es.authentication.login.forgot}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signup}>
              <Text style={styles.dont}>
                {es.authentication.login.question}
              </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/register")}
              >
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