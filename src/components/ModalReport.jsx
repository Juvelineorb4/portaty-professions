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
import styles from "@/utils/styles/ModalReport.js";
// import { complaints } from "@/utils/constants/complaints";
import * as customFavorites from "@/graphql/CustomMutations/Favorites";
import { Auth, API, Storage } from "aws-amplify";
import { useRecoilValue } from "recoil";
import { userAuthenticated } from "@/atoms";

const ModalReport = ({ businessID, close, open }) => {
  const global = require("@/utils/styles/global.js");
  const [complaint, setComplaint] = useState("");
  const [complaints, setComplaints] = useState([]);
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
      console.log(error)
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
    ComplaintsData()
  }, [])
  
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
                  <Text style={{ fontFamily: "regular", fontSize: 16 }}>
                    Elige un motivo de reporte
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={complaints}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        height: 50,
                        borderWidth: 0.5,
                        borderColor: "#1f1f1f",
                        padding: 5,
                        borderRadius: 3,
                        marginBottom: 2,
                        justifyContent: "center",
                        backgroundColor:
                          item === complaint ? "#ffb703" : "#ffffff",
                        // alignItems: 'center'
                      }}
                      onPress={() => setComplaint(item)}
                    >
                      <Text style={{ fontFamily: "regular", fontSize: 14 }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              <Pressable
                onPress={() => {
                  if (complaint !== "") {
                    onReportBusiness();
                    setComplaint("");
                    close();
                  }
                  setComplaint("");
                  close();
                }}
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
                  Aceptar
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalReport;