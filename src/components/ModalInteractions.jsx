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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "@/utils/styles/ModalInteractions.js";
// import { complaints } from "@/utils/constants/complaints";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Auth, API, Storage } from "aws-amplify";
import { useRecoilState, useRecoilValue } from "recoil";
import { updateListFavorites, userAuthenticated } from "@/atoms";
import { MaterialIcons } from "@expo/vector-icons";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { es } from "@/utils/constants/lenguage";

const ModalInteractions = ({ businessID, close, open }) => {
  const global = require("@/utils/styles/global.js");
  const [starRating, setStarRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const userAuth = useRecoilValue(userAuthenticated);
  const [listUpdate, setListUpdate] = useRecoilState(updateListFavorites);

  const fetchInteractions = async (data) => {
    const { description } = data;
    console.log(description, starRating, businessID);
    setLoading(true);
    try {
      const rating = await API.graphql({
        query: customFavorites.createBusinessComment,
        variables: {
          input: {
            userID: userAuth?.attributes["custom:userTableID"],
            businessID: businessID,
            stars: starRating,
            description: description,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(rating);
      setLoading(false);
      setListUpdate(true)
      close();
    } catch (error) {
      console.log(error);
      setLoading(false);
      close();
    }
  };

  useEffect(() => {}, []);

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
                      marginLeft: -20,
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
              <TouchableOpacity
                onPress={handleSubmit(fetchInteractions)}
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
                {loading ? (
                  <ActivityIndicator size="small" color="#1f1f1f" />
                ) : (
                  <Text style={[global.black, { fontFamily: "bold" }]}>
                    Publicar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalInteractions;
