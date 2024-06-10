import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Share,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Auth, API, Storage } from "aws-amplify";
import * as mutations from "@/graphql/CustomMutations/Profile";
import * as customSearch from "@/graphql/CustomQueries/Search";
import * as queries from "@/graphql/CustomQueries/Favorites";
import CustomSelect from "@/components/CustomSelect";
import styles from "@/utils/styles/Profile.js";
import CustomButton from "@/components/CustomButton";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Foundation,
  EvilIcons,
  Feather,
} from "@expo/vector-icons";
import CustomCodeField from "@/components/CustomCodeField";
import { codeProfile, confirmCodeProfile } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import CustomCodeProfile from "@/components/CustomCodeProfile";
// amplify
const Profile = ({ route, navigation }) => {
  const global = require("@/utils/styles/global.js");
  const { user } = route.params;
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user["custom:lastName"]);
  const [newEmail, setNewEmail] = useState(user?.email);
  const [editActive, setEditActive] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favoritesQY, setFavoritesQY] = useState(0);
  const [confirmEmail, setConfirmEmail] = useRecoilState(confirmCodeProfile);
  const [codeEmail, setCodeEmail] = useState("");
  const codeInputs = useRecoilValue(codeProfile);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Han compartido contigo un negocio, da click para mirarlo https://www.portaty.com/share/list?id=${user.id}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const onCheckChange = () => {
    if (
      name?.toLowerCase()?.trim() !== user?.name?.toLowerCase().trim() ||
      lastName?.toLowerCase().trim() !==
        user["custom:lastName"]?.toLowerCase().trim()
    ) {
      setIsSave(true);
    } else {
      setIsSave(false);
    }
  };
  const onFavorites = async () => {
    const result = await API.graphql({
      query: queries.userByEmail,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        email: user?.email,
      },
    });

    setFavoritesQY(
      result?.data?.userByEmail?.items[0]?.favorites?.items.length
    );
  };

  const onSaveChange = async () => {
    setIsLoading(true);
    const data = await Auth.currentAuthenticatedUser();
    const tableID = data?.attributes["custom:userTableID"];
    const sub = data?.attributes["sub"];
    try {
      if (user?.email !== newEmail?.trim()) {
        const apiName = "api-portaty"; // replace this with your api name.
        const path = "/changeEmail"; //replace this with the path you have configured on your API
        const myInit = {
          body: {
            username: sub,
            newEmail,
          }, // replace this with attributes you need
          headers: {}, // OPTIONAL
        };

        const result = await API.post(apiName, path, myInit);
        if (result?.success) setConfirmEmail(true);
      }
      // Cambiar en Cognito
      await Auth.updateUserAttributes(data, {
        name: name,
        "custom:lastName": lastName,
      });
      // Cambiar en tabla
      const result = await API.graphql({
        query: mutations.updateUsers,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            id: tableID,
            name,
            lastName,
          },
        },
      });
    } catch (error) {
      const { message } = new Error(error);
      console.log("ERROR AL ACTUALIZAR ATRIBUTO IDENTITY ID: ", message);
    }
    setIsLoading(false);
    setEditActive(!editActive);
  };
  const onConfirmCodeEmail = async () => {
    console.log(codeInputs)
    setIsLoading(true);
    const data = await Auth.currentAuthenticatedUser();
    const tableID = data?.attributes["custom:userTableID"];
    try {
      const result = await Auth.verifyCurrentUserAttributeSubmit(
        "email",
        codeInputs
      );
      console.log("RESULT: ", result);
      if (result === "SUCCESS") {
        const result = await API.graphql({
          query: mutations.updateUsers,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              id: tableID,
              email: newEmail,
            },
          },
        });
      }
    } catch (error) {
      console.log("ERROR AL CONFIRMAR CODIGO  ", error);
    }
    setIsLoading(false);
    setConfirmEmail(false);
    setCodeEmail("");
  };
  useEffect(() => {
    onFavorites();
    onCheckChange();
  }, [name, lastName]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, global.bgWhite]}
      keyboardVerticalOffset={32}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1, marginTop: 40 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 24, fontFamily: "medium" }}>
              {favoritesQY}
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "light" }}>
              Mis Favoritos
            </Text>
          </View>
          <View style={[styles.line, global.bgMidGray]} />
          <TouchableOpacity
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: -5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[
                  {
                    width: 58,
                    height: 58,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#1f1f1f",
                    borderWidth: 0.7,
                  },
                  global.bgYellow,
                ]}
              >
                <FontAwesome name="edit" size={21} color="#1f1f1f" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                  Editar
                </Text>
                <Text
                  style={{ fontFamily: "regular", fontSize: 12, width: 150 }}
                >
                  Actualiza tus datos
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{
                false: "#767577",
                true: "#ffb703",
              }}
              thumbColor={editActive ? "#FFFFFF" : "#f4f3f4"}
              onValueChange={() => setEditActive(!editActive)}
              value={editActive}
            />
          </TouchableOpacity>

          <View style={{  }}>
            <Text
              style={{ fontSize: 22, fontFamily: "lightItalic", padding: 10 }}
            >
              Datos personales
            </Text>
            <View style={[styles.line, global.bgMidGray]} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    { fontFamily: "lightItalic", fontSize: 15 },
                    global.black,
                  ]}
                >
                  Nombre
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  onChangeText={setName}
                  value={name}
                  style={[
                    {
                      fontSize: 12,
                      fontFamily: "regular",
                      padding: 10,
                      borderColor: "#1f1f1f",
                      borderWidth: 0.7,
                      borderRadius: 4,
                    },
                    editActive ? global.bgWhite : global.bgWhiteSoft,
                  ]}
                  editable={editActive ? true : false}
                />
              </View>
            </View>
            <View style={[styles.line, global.bgMidGray]} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    { fontFamily: "lightItalic", fontSize: 15 },
                    global.black,
                  ]}
                >
                  Apellido
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  onChangeText={setLastName}
                  value={lastName}
                  style={[
                    {
                      fontSize: 12,
                      fontFamily: "regular",
                      padding: 10,
                      borderColor: "#1f1f1f",
                      borderWidth: 0.7,
                      borderRadius: 4,
                    },
                    editActive ? global.bgWhite : global.bgWhiteSoft,
                  ]}
                  editable={editActive ? true : false}
                />
              </View>
            </View>
            <View style={[styles.line, global.bgMidGray]} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    { fontFamily: "lightItalic", fontSize: 15 },
                    global.black,
                  ]}
                >
                  Correo
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  value={newEmail}
                  onChangeText={setNewEmail}
                  style={[
                    {
                      fontSize: 12,
                      fontFamily: "regular",
                      padding: 10,
                      borderColor: "#1f1f1f",
                      borderWidth: 0.3,
                      borderRadius: 4,
                    },
                    global.bgWhiteSoft,
                  ]}
                  editable={editActive ? true : false}
                />
              </View>
            </View>
            {confirmEmail && (
              <>
                <View style={[styles.line, global.bgMidGray]} />
                <View
                  style={{
                    // flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <Text
                    style={[
                      { fontFamily: "lightItalic", fontSize: 15 },
                      global.black,
                    ]}
                  >
                    Confirmar codigo
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CustomCodeProfile />
                  </View>
                </View>
              </>
            )}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View
        style={{
          // flex: 1,
          paddingTop: 20,
          marginBottom: 100,
          alignSelf: 'center'
        }}
      >
        {editActive ? (
          <CustomButton
            text={
              isLoading ? <ActivityIndicator color={`#1f1f1f`} /> : "Guardar"
            }
            handlePress={onSaveChange}
            textStyles={[global.black, { fontFamily: "bold", marginLeft: 25 }]}
            buttonStyles={[
              {
                width: 200,
                height: 50,
                borderRadius: 6,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#1f1f1f",
                borderWidth: 0.7,
              },
              global.bgYellow,
              ,
            ]}
            disabled={!isSave && isLoading}
          />
        ) : (
          confirmEmail && (
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={`#1f1f1f`} />
                ) : (
                  "Confirmar Codigo"
                )
              }
              handlePress={onConfirmCodeEmail}
              textStyles={[
                global.black,
                { fontFamily: "bold", marginLeft: 25 },
              ]}
              buttonStyles={[
                {
                  width: 200,
                  height: 50,
                  borderRadius: 6,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#1f1f1f",
                  borderWidth: 0.7,
                },
                global.bgYellow,
                ,
              ]}
            />
          )
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;
