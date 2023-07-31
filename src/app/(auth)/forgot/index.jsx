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

const Forgot = ({ navigation }) => {
  const router = useRouter();
  const global = require("@/assets/styles/global.js");
  const { control, watch } = useForm({
    defaultValues: {
      phone: "",
      code: ["", "", "", "", "", ""],
    },
  });
  const phone = watch("phone");
  const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
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
                required: "Ingresa tu número de teléfono",
              }}
            />
            <Text style={[styles.code, global.topGray]}>
              {es.authentication.forgot.code}{" "}
              <Text style={styles.emailText}>{phone}</Text>
            </Text>
          </ScrollView>
          <View style={{ height: 60 }}>
            <CustomButton
              text={es.authentication.forgot.button}
              handlePress={() => router.replace({pathname: "/(auth)/forgot/confirm", params: {
                email: 'ejemplo email',
                password: 'ejemplo password'
              }})}
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
