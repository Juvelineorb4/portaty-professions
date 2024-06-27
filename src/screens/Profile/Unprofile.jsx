import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/Unprofile.module.css";
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
  const [refreshing, setRefreshing] = useState(false);
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
    await Auth.signOut();
  };
  const User = async () => {
    const result = await API.graphql({
      query: customProfile.userByEmail,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        email: userAuth?.attributes?.email,
      },
    });
    console.log(result);
    if (result?.data?.userByEmail?.items[0]?.business?.items?.length !== 0)
      setBusiness(result.data.userByEmail.items[0].business.items);
    setDisabled(false);
  };
  const _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };

  useLayoutEffect(() => {
    User();
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
                  marginVertical: -25,
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
