import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/Unprofile.js";
import CustomSelect from "@/components/CustomSelect";
import { settings } from "@/utils/constants/settings";
import { useRecoilValue } from "recoil";
import { Auth, API, Storage } from "aws-amplify";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import * as mutations from "@/graphql/mutations";
import { profileState, userAuthenticated } from "@/atoms";
import * as WebBrowser from "expo-web-browser";
import SkeletonUnprofile from "@/components/SkeletonUnprofile";
import { Skeleton } from "@rneui/themed";
import { useEffect } from "react";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import ModalAlert from "@/components/ModalAlert";
import { useCallback } from "react";

const Unprofile = ({ navigation, route }) => {
  const { buttons } = settings;
  const global = require("@/utils/styles/global.js");
  const [selectKey, setSelectKey] = useState("");
  const [disabled, setDisabled] = useState(true);
  const userAuth = useRecoilValue(userAuthenticated);
  const [user, setUser] = useState([]);
  const [business, setBusiness] = useState([]);
  const [visible, setVisible] = useState(false);
  const [createBussiness, setCreateBussiness] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    User();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const isFocused = navigation.isFocused();
  const status = useRecoilValue(profileState);
  const fetchOtro = async () => {
    const result = await API.graphql({
      query: customProfile.getBusiness2,
      authMode: "AWS_IAM",
      variables: {
        id: "9eec6b66-f536-41a9-9bdd-e4d963cfc6a0",
      },
    });
    console.log("QUE SUELTA", result);
  };

  const onHandleLogout = async () => {
    await Auth.signOut();
  };
  const User = async () => {
    try {
      const fetchAllBusiness = async (nextToken, result = []) => {
        const response = await API.graphql({
          query: customProfile.listBusinessbyUserID,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            userID: userAuth?.attributes["custom:userTableID"],
            nextToken,
          },
        });

        const items = response.data.listBusinessbyUserID.items;
        result.push(...items);

        if (response.data.listBusinessbyUserID.nextToken) {
          return fetchAllBusiness(
            response.data.listBusinessbyUserID.nextToken,
            result
          );
        }

        return result;
      };

      const allBusiness = await fetchAllBusiness();
      if (allBusiness.length !== 0) setBusiness(allBusiness);
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  };
  const _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };

  const onHandleAccountDeletion = async () => {
    if (!userAuth?.attributes?.sub) return;

    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que quieres enviar la solicitud para la eliminación de cuenta?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const api = "api-portaty";
              const path = "/request_account_deletion";
              const params = {
                headers: {},
                queryStringParameters: {
                  username: userAuth?.attributes?.sub,
                },
              };

              const response = await API.get(api, path, params);
              console.log("RESPONSE: ", response);
              if (response?.success) {
                const data = await Auth.currentAuthenticatedUser();
                // cambiar atributo para saber si ya solicito o no la eliminacion
                await Auth.updateUserAttributes(data, {
                  "custom:requestDeleting": "required",
                });
              }
            } catch (error) {
              console.error(
                "ERROR A ENVIAR SOLICITUD DE ELIMINAR CUENTA: ",
                error
              );
            }
          },
        },
      ]
    );
  };
  useLayoutEffect(() => {
    User();
    fetchOtro();
  }, [userAuth, status, refreshing, isFocused]);

  if (!userAuth?.attributes) return <SkeletonUnprofile />;
  return (
    <ScrollView
      style={[styles.container, global.bgWhite]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => User()} />
      }
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
            {`Perfil`}
          </Text>
        </View>

        <View style={[styles.line, global.bgMidGray]} />

        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate("Profile", {
              user: userAuth?.attributes,
            })
          }
          style={{
            marginBottom: -25,
          }}
        >
          <CustomSelect
            title={`Mi cuenta`}
            subtitle={`Manten actualizado tus datos`}
            styled={{
              text: {
                container: styles.textContainerSelect,
                title: [styles.textTitleSelect, global.black],
                subtitle: [styles.textSubtitleSelect, global.topGray],
              },
              container: styles.containerSelect,
              iconLeft: [styles.iconLeft, global.bgYellow],
              iconRight: styles.iconRight,
            }}
            icon={{
              left: require("@/utils/images/profile_settings.png"),
              right: require("@/utils/images/arrow_right.png"),
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
        {`Gestion`}
      </Text>
      <View style={[styles.line, global.bgMidGray]} />
      <TouchableOpacity
        onPress={() => {
          if (disabled) return;
          if (business.length === 1) {
            setError(
              "Ya has conseguido el maximo de negocios registrados permitidos"
            );
            setVisible(true);
            return;
          }
          navigation.navigate("FormNavigator", {
            user: userAuth?.attributes,
          });
        }}
        style={{
          marginBottom: -25,
        }}
      >
        <CustomSelect
          title={`Registra un negocio`}
          subtitle={`Publica tu negocio para que cientos de personajes puedan encontrarte`}
          styled={{
            text: {
              container: styles.textContainerSelect,
              title: [styles.textTitleSelect, global.black],
              subtitle: [styles.textSubtitleSelect, global.topGray],
            },
            container: styles.containerSelect,
            iconLeft: [styles.iconLeft, global.bgYellow],
            iconRight: styles.iconRight,
          }}
          icon={{
            left: require("@/utils/images/product.png"),
            right: require("@/utils/images/arrow_right.png"),
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (disabled) return;
          navigation.navigate("List", {
            data: business,
            user: userAuth?.attributes,
          });
        }}
        style={{
          marginBottom: -25,
        }}
      >
        {/* <View style={[styles.line, global.bgMidGray]} /> */}
        <CustomSelect
          title={`Lista de tus negocios`}
          subtitle={`Mira todos los negocios que tienes publicados`}
          styled={{
            text: {
              container: styles.textContainerSelect,
              title: [styles.textTitleSelect, global.black],
              subtitle: [styles.textSubtitleSelect, global.topGray],
            },
            container: styles.containerSelect,
            iconLeft: [styles.iconLeft, global.bgYellow],
            iconRight: styles.iconRight,
          }}
          icon={{
            left: require("@/utils/images/order.png"),
            right: require("@/utils/images/arrow_right.png"),
          }}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
          {`Configuracion`}
        </Text>
        <View
          style={[
            styles.line,
            global.bgMidGray,
            {
              marginBottom: 1,
              // marginTop: 5
            },
          ]}
        />
        {buttons.map((button, index) => (
          <View key={index}>
            {button.route ? (
              <TouchableOpacity
                onPress={() => navigation.navigate(button.route)}
                style={{
                  marginBottom: -25,
                }}
              >
                <CustomSelect
                  title={button.title}
                  subtitle={button.subtitle}
                  styled={{
                    text: {
                      container: styles.textContainerSelect,
                      title: [styles.textTitleSelect, global.black],
                      subtitle: [styles.textSubtitleSelect, global.topGray],
                    },
                    container: styles.containerSelect,
                    iconLeft: [styles.iconLeft, global.bgYellow],
                    iconRight: styles.iconRight,
                  }}
                  icon={button.icon}
                />
              </TouchableOpacity>
            ) : button.web ? (
              <TouchableOpacity
                onPress={() => _handlePressButtonAsync(button.web)}
                style={{
                  marginBottom: -25,
                }}
              >
                {/* <View style={[styles.line, global.bgMidGray]} /> */}
                <CustomSelect
                  title={button.title}
                  subtitle={button.subtitle}
                  styled={{
                    text: {
                      container: styles.textContainerSelect,
                      title: [styles.textTitleSelect, global.black],
                      subtitle: [styles.textSubtitleSelect, global.topGray],
                    },
                    container: styles.containerSelect,
                    iconLeft: [styles.iconLeft, global.bgYellow],
                    iconRight: styles.iconRight,
                  }}
                  icon={button.icon}
                />
              </TouchableOpacity>
            ) : button.modal ? (
              <>
                {console.log(
                  "QUE HAY: ",
                  userAuth?.attributes["custom:requestDeleting"]
                )}
                {!userAuth?.attributes["custom:requestDeleting"] && (
                  <TouchableOpacity
                    onPress={onHandleAccountDeletion}
                    style={{
                      marginBottom: -25,
                    }}
                  >
                    <CustomSelect
                      title={button.title}
                      subtitle={button.subtitle}
                      styled={{
                        text: {
                          container: styles.textContainerSelect,
                          title: [styles.textTitleSelect, global.black],
                          subtitle: [styles.textSubtitleSelect, global.topGray],
                        },
                        container: styles.containerSelect,
                        iconLeft: [styles.iconLeft, global.bgYellow],
                        iconRight: styles.iconRight,
                      }}
                      icon={button.icon}
                    />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity onPress={onHandleLogout}>
                {/* <View style={[styles.line, global.bgMidGray]} /> */}
                <CustomSelect
                  title={button.title}
                  subtitle={button.subtitle}
                  styled={{
                    text: {
                      container: styles.textContainerSelect,
                      title: [styles.textTitleSelect, global.black],
                      subtitle: [styles.textSubtitleSelect, global.topGray],
                    },
                    container: styles.containerSelect,
                    iconLeft: [styles.iconLeft, global.bgYellow],
                    iconRight: styles.iconRight,
                  }}
                  icon={button.icon}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <ModalAlert
        text={error}
        icon={require("@/utils/images/alert.png")}
        close={() => setVisible(false)}
        open={visible}
      />
    </ScrollView>
  );
};

export default Unprofile;
