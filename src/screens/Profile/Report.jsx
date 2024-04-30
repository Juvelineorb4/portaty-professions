import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "@/utils/styles/Report.module.css";
import CustomInput from "@/components/CustomInput";
import { useForm } from "react-hook-form";
import { es } from "@/utils/constants/lenguage";
import * as mutations from "@/graphql/CustomMutations/Profile";
import { Auth, API, Storage } from "aws-amplify";
import ModalAlert from "@/components/ModalAlert";
import { useRecoilValue } from "recoil";
import { userAuthenticated } from "@/atoms";

const Report = ({navigation}) => {
  const global = require("@/utils/styles/global.js");
  const { control, handleSubmit } = useForm();
  const [active, setActive] = useState(false);
  const userAuth = useRecoilValue(userAuthenticated);
  const updateShedule = async (data) => {
    const { reason, description } = data;
    console.log(reason, description);
    try {
      const result = await API.graphql({
        query: mutations.createReports,
        authMode: "AWS_IAM",
        variables: {
          input: {
            userID: userAuth.attributes["custom:userTableID"],
            subject: reason,
            description: description,
            status: "PENDING",
          },
        },
      });
      console.log(result);
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={[
        global.bgWhite,
        {
          flex: 1,
          padding: 20,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: "lightItalic",
          fontSize: 22,
          marginVertical: 15,
        }}
      >
        Reportar fallas en la Portaty
      </Text>
      <View style={[styles.line, global.bgMidGray]} />
      <View
        style={{
          marginTop: 15,
        }}
      >
        <CustomInput
          control={control}
          name={`reason`}
          placeholder={`Coloca tu motivo de reporte`}
          placeholderTextColor={`#1f1f1f80`}
          styled={{
            text: styles.textInput,
            label: [styles.labelInput],
            error: styles.errorInput,
            input: [styles.inputContainer],
            placeholder: styles.placeholder,
          }}
          text={`Motivo`}
          rules={{
            required: es.businessForm.register.email.rules,
          }}
        />
        <View style={{ marginBottom: 10 }}></View>
        <CustomInput
          control={control}
          name={`description`}
          placeholder={`Escribe una descripcion sobre el error o falla que estas teniendo`}
          styled={{
            text: styles.textInputDescription,
            label: [styles.labelInput],
            error: styles.errorInputDescription,
            input: [styles.inputContainerDescription],
            placeholder: styles.placeholderDescription,
          }}
          lines={10}
          area={true}
          text={`Descripcion`}
          rules={{
            required: es.businessForm.register.company.rules,
          }}
          max={500}
        />

        <TouchableOpacity
          style={[
            {
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#1f1f1f",
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
            },
            global.mainBgColor,
          ]}
          onPress={handleSubmit(updateShedule)}
        >
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 16,
            }}
          >
            Enviar reporte
          </Text>
        </TouchableOpacity>
      </View>
      <ModalAlert
        text={"Reporte enviado correctamente"}
        close={() => {
          setActive(false);
          navigation.navigate("Unprofile");
        }}
        open={active}
        icon={require("@/utils/images/successful.png")}
      />
    </View>
  );
};

export default Report;