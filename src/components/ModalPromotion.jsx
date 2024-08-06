import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomDatePicker from "./CustomDatePicker";
import { useForm } from "react-hook-form";
import styles from "@/utils/styles/CustomPromotions.js";
import { API } from "aws-amplify";
import * as customProfile from "@/graphql/CustomMutations/Profile";

const ModalPromotion = ({ data, close, open, deletePromotion }) => {
  console.log(deletePromotion);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { control } = useForm();

  const onHandleAgainPromotion = async () => {
    console.log(data?.id);
    // return;
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const apiName = "api-portaty";
    const path = "/business/createPromotion";
    try {
      const myInit = {
        body: {
          data: {
            promotionID: data?.id,
            dateInitial: startDate,
            dateFinal: endDate,
          },
        },
        headers: {},
      };
      const result = await API.post(apiName, path, myInit);
      console.log(result);
      close();
    } catch (error) {
      console.log("ERROR: ", error);
      close();
    }
  };

  const onHandleDeletePromotion = async () => {
    console.log(data?.id);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    try {
      const result = await API.graphql({
        query: customProfile.deleteBusinessPromotion,
        variables: {
          input: {
            id: data?.id,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(result);
      close();
    } catch (error) {
      console.log(error);
      close();
    }
  };
  return (
    <Modal visible={open} onRequestClose={close} transparent>
      <TouchableWithoutFeedback onPress={close}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: 300,
              height: 400,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 16,
              }}
            >
              {!deletePromotion
                ? "Volver a publicar promocion"
                : "Eliminar promocion"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 118,
                  height: 210,
                  borderRadius: 5,
                }}
                source={{ uri: data?.image }}
              />
              <View>
                <CustomInput
                  control={control}
                  name={`description`}
                  placeholder={data?.title}
                  styled={{
                    text: styles.textInput,
                    label: [styles.labelInput],
                    error: styles.errorInput,
                    input: [styles.inputContainer],
                    placeholder: styles.placeholder,
                  }}
                  editable={false}
                  text={`Descripcion`}
                />
                {!deletePromotion && (
                  <Text
                    style={{
                      fontFamily: "medium",
                      color: "red",
                      marginVertical: 5,
                      fontSize: 12,
                      width: 120,
                    }}
                  >
                    Solo puedes cambiar las fechas
                  </Text>
                )}
                <CustomDatePicker
                  startDate={startDate}
                  setStartDate={(e) => setStartDate(e)}
                  endDate={endDate}
                  setEndDate={(e) => setEndDate(e)}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (!deletePromotion) {
                  onHandleAgainPromotion();
                } else {
                  onHandleDeletePromotion();
                }
                console.log("elimando");
              }}
              style={{
                backgroundColor: !deletePromotion ? "#ffb703" : "red",
                padding: 15,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#1f1f1f",
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: !deletePromotion ? "black" : "white",
                  fontFamily: "bold",
                }}
              >
                {!deletePromotion ? "Volver a publicar" : "Eliminar promocion"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalPromotion;
