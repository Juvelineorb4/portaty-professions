import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "@/utils/styles/ModalInteractions.js";
// import { complaints } from "@/utils/constants/complaints";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Auth, API, Storage } from "aws-amplify";
import { useRecoilValue } from "recoil";
import { userAuthenticated } from "@/atoms";
import { MaterialIcons } from "@expo/vector-icons";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { es } from "@/utils/constants/lenguage";

const ModalInteractions = ({ businessID, close, open }) => {
  const global = require("@/utils/styles/global.js");
  const [complaint, setComplaint] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [starRating, setStarRating] = useState(null);
  const { control, handleSubmit } = useForm();
  const userAuth = useRecoilValue(userAuthenticated);

  const ComplaintsData = async () => {
    const api = "api-portaty";
    const path = "/api/complaints";
    const params = {
      headers: {},
    };
    try {
      const response = await API.get(api, path, params);
      setComplaints(response);
    } catch (error) {
      console.log(error);
    }
  };
  const onReportBusiness = async () => {
    try {
      const report = await API.graphql({
        query: customFavorites.createComplaints,
        variables: {
          input: {
            userID: userAuth?.attributes["custom:userTableID"],
            businessID: businessID,
            reason: complaint,
            status: "PENDING",
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ComplaintsData();
  }, []);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={open}
      onRequestClose={close}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={{ marginBottom: 15 }}>
                <View>
                  <Text style={{ fontFamily: "regular", fontSize: 14 }}>
                    Puntua y comenta para publicar tu reseña
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: 14,
                      color: "#404040",
                      marginLeft: -20
                    }}
                  >
                    Valoración
                  </Text>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <TouchableWithoutFeedback
                        key={rating}
                        onPress={() => setStarRating(rating)}
                      >
                        <MaterialIcons
                          name={rating <= starRating ? "star" : "star-border"}
                          size={25}
                          style={styles.star}
                        />
                      </TouchableWithoutFeedback>
                    ))}
                  </View>
                </View>
                <CustomInput
                  control={control}
                  name={`description`}
                  placeholder={`Escribe un comentario para este negocio`}
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
              </View>
              <Pressable
                onPress={() => {}}
                style={[
                  global.bgYellow,
                  {
                    height: 60,
                    // flex: 0.12,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                    // alignItems: "center",
                    // alignSelf: "flex-end",
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                  },
                ]}
              >
                <Text style={[global.black, { fontFamily: "bold" }]}>
                  Publicar
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalInteractions;
