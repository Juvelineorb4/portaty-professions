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
  import { es } from "@/assets/constants/lenguage";
  
  const Confirm = () => {
    const global = require("@/assets/styles/global.js");
    const { control } = useForm();

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
                <Text style={styles.title}>{es.authentication.account.entercode.title}</Text>
              <EnterCode
                title={es.authentication.account.code.title}
                subtitle={es.authentication.account.code.subtitle}
                control={control}
              />
            </ScrollView>
            <View style={{ height: 60 }}>
              <CustomButton
                text={es.authentication.account.button}
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
  