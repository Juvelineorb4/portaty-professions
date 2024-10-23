import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Checkbox from "expo-checkbox";
import ModalAlert from "@/components/ModalAlert";
import { API, Auth } from "aws-amplify";
import * as customProfile from "@/graphql/CustomMutations/Profile";
import { useRecoilValue } from "recoil";
import { notificationToken, userAuthenticated } from "@/atoms";

const DatePage = ({ navigation, route }) => {
  const { businessId, businessEmail, businessPhone } = route.params;
  const global = require("@/utils/styles/global.js");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const userAuth = useRecoilValue(userAuthenticated);
  const [selections, setSelections] = useState(["EMAIL"]);
  const token = useRecoilValue(notificationToken);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    setSelectedDate(newDate);
    hideTimePicker();
  };

  const toggleCheckbox = (type) => {
    if (selections.includes(type)) {
      setSelections(selections.filter((item) => item !== type));
    } else {
      setSelections([...selections, type]);
    }
  };
  const formatAWSDateTime = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm:ss[Z]");
  };

  const createDateBusiness = async () => {
    setLoading(true);
    const date = formatAWSDateTime(selectedDate);
    console.log(selections);
    console.log(userAuth);
    try {
      const result = await API.graphql({
        query: customProfile.createDate,
        authMode: userAuth ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        variables: {
          input: {
            userID:
              userAuth !== null
                ? userAuth?.attributes["custom:userTableID"]
                : null,
            businessID: businessId,
            date: date,
            notificationMethod: selections,
            userToken: token,
          },
        },
      });
      console.log(result);
      setVisible(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[global.bgWhite, { flex: 1, padding: 20, paddingBottom: 50 }]}
    >
      <Text
        style={{
          fontFamily: "light",
          fontSize: 19,
          textAlign: "center",
          marginTop: 35,
          marginBottom: 30,
        }}
      >
        Vamos a gestionar tu cita para poder comunicarnos con el negocio
      </Text>

      <View>
        <Text
          style={{
            fontFamily: "light",
            fontSize: 14,
            marginVertical: 10,
            marginBottom: 25,
          }}
        >
          Empecemos por elegir la fecha y hora que quieres agendar
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            rowGap: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#1f1f1f",
                borderRadius: 6,
                padding: 15,
                width: 150,
              }}
              onPress={showDatePicker}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "medium",
                  textAlign: "center",
                }}
              >
                Selecciona la fecha
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "medium",
                width: 100,
              }}
            >
              {moment(selectedDate).format("DD/MM/YYYY")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#1f1f1f",
                borderRadius: 6,
                padding: 15,
                width: 150,
              }}
              onPress={showTimePicker}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "medium",
                  textAlign: "center",
                }}
              >
                Selecciona la hora
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
              minimumDate={new Date(selectedDate)} // Establece la fecha mínima a la actual
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "medium",
                width: 100,
              }}
            >
              {moment(selectedDate).format("HH:mm")}
            </Text>
          </View>
        </View>

        {/* Checkbox */}
        <Text
          style={{
            fontFamily: "light",
            fontSize: 14,
            marginTop: 50,
            marginBottom: 35,
          }}
        >
          Ahora dinos por donde te gustaria que el negocio te contacte
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          {businessEmail && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Checkbox
                value={selections.includes("EMAIL")}
                onValueChange={() => toggleCheckbox("EMAIL")}
                color={selections.includes("EMAIL") ? "#ffb703" : undefined}
              />
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                Correo
              </Text>
            </View>
          )}
          {businessPhone && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Checkbox
                value={selections.includes("WHATSAPP")}
                onValueChange={() => {
                  toggleCheckbox("WHATSAPP");
                  setIsWhatsApp(!isWhatsApp);
                }}
                color={selections.includes("WHATSAPP") ? "#ffb703" : undefined}
              />
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                WhatsApp
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Checkbox
              value={selections.includes("PUSH_NOTIFICATION")}
              onValueChange={() => toggleCheckbox("PUSH_NOTIFICATION")}
              color={
                selections.includes("PUSH_NOTIFICATION") ? "#ffb703" : undefined
              }
            />
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 12,
                marginLeft: 5,
              }}
            >
              Notificación Móvil
            </Text>
          </View>
        </View>

        {/* boton */}
        <TouchableOpacity
          style={[
            {
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#1f1f1f",
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 30,
            },
            global.mainBgColor,
          ]}
          onPress={() => createDateBusiness()}
        >
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 16,
            }}
          >
            Agendar cita
          </Text>
        </TouchableOpacity>
      </View>
      <ModalAlert
        text={`Se envio la solicitud para agendar una cita`}
        icon={require("@/utils/images/successful.png")}
        close={() => setVisible(false)}
        isLink={true}
        navigation={() => navigation.goBack()}
        open={visible}
        whatsApp={isWhatsApp}
        whatsAppLink={isWhatsApp ? businessPhone : ""}
      />
    </ScrollView>
  );
};

export default DatePage;
