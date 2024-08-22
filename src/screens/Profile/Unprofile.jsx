import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/Unprofile.js";
import CustomSelect from "@/components/CustomSelect";
import { settings } from "@/utils/constants/settings";
import { useRecoilValue } from "recoil";
import { Auth, API, Storage } from "aws-amplify";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import * as mutations from "@/graphql/mutations";
import { locationPermission, profileState, userAuthenticated } from "@/atoms";
import * as WebBrowser from "expo-web-browser";
import SkeletonUnprofile from "@/components/SkeletonUnprofile";
import { Skeleton } from "@rneui/themed";
import { useEffect } from "react";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import ModalAlert from "@/components/ModalAlert";
import { useCallback } from "react";
import CustomButton from "@/components/CustomButton";
import ModalPermission from "@/components/ModalPermission";

const Unprofile = ({ navigation, route }) => {
  const { buttons } = settings;
  const global = require("@/utils/styles/global.js");
  const [selectKey, setSelectKey] = useState("");
  const [disabled, setDisabled] = useState(true);
  const userAuth = useRecoilValue(userAuthenticated);
  const [user, setUser] = useState([]);
  const [business, setBusiness] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleLocation, setVisibleLocation] = useState(false);
  const [createBussiness, setCreateBussiness] = useState(true);
  const [error, setError] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [buttonDelete, setButtonDelete] = useState(false);
=======
>>>>>>> e6cc6c81037f664cdf7aa3b36182f97ac8427ba1
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDelete, setButtonDelete] = useState(false);
  const locationStatus = useRecoilValue(locationPermission);

  const onRefresh = () => {
    setRefreshing(true);
    User();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const isFocused = navigation.isFocused();
  const status = useRecoilValue(profileState);

  const onHandleLogout = async () => {
    setLoading(true);
    setTimeout(async () => {
      await Auth.signOut();
      setLoading(false);
    }, 2000);
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

  const onHandleAccountDeletion = async (ready = false) => {
    if (!userAuth?.attributes?.sub) return;
    if (ready) {
      Alert.alert(
        "Solicitud de eliminación de cuenta ya enviada",
        "El proceso de eliminación de cuenta puede tardar entre 30 a 90 días. Si desea cancelar esta solicitud, por favor contacte a soporte@portaty.com."
      );
      return;
    }
    Alert.alert(
      "Confirmación",
      "¿Está seguro de que desea enviar la solicitud para la eliminación de su cuenta?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setButtonDelete(true);
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
            setButtonDelete(false);
          },
        },
      ]
    );
  };
<<<<<<< HEAD

=======
>>>>>>> e6cc6c81037f664cdf7aa3b36182f97ac8427ba1
  useLayoutEffect(() => {
    User();
  }, [userAuth, status, refreshing, isFocused]);

  if (loading)
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <ActivityIndicator size="large" color="#ffb703" />
      </View>
    );
  if (!userAuth)
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 80,
          },
          global.bgWhite,
        ]}
      >
        <Text
          style={{ fontSize: 16, fontFamily: "light", textAlign: "center" }}
        >
          Ingresa a tu cuenta para acceder a todas las funcionalidades que te
          ofrecemos, como:
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "medium",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Registrar un negocio, administrar tu cuenta, acceso a estadisticas y
          mucho mas
        </Text>
        <CustomButton
          text={`Iniciar sesion`}
          handlePress={() => {
            navigation.navigate("Login_Welcome", { item: route.name });
          }}
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );
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
          if (locationStatus !== "granted") {
            setVisibleLocation(true);
            return;
          }
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
              <TouchableOpacity
                onPress={() => {
                  userAuth?.attributes["custom:requestDeleting"]
                    ? onHandleAccountDeletion(true)
                    : onHandleAccountDeletion();
                }}
                style={{
                  marginBottom: -25,
                }}
                disabled={buttonDelete}
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
      <ModalPermission
        permission={"Ubicacion"}
        close={() => setVisibleLocation(false)}
        open={visibleLocation}
      />
    </ScrollView>
  );
};

export default Unprofile;