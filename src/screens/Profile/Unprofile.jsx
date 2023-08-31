import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/Unprofile.module.css";
import CustomSelect from "@/components/CustomSelect";
import { settings } from "@/utils/constants/settings";
import { useRecoilValue } from "recoil";
import { Auth, API, Storage } from "aws-amplify";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import * as mutations from "@/graphql/mutations";
import { businessProfile, userProfile, profileState } from "@/atoms";

const Unprofile = ({ navigation, route }) => {
  const { buttons } = settings;
  const global = require("@/utils/styles/global.js");
  const [selectKey, setSelectKey] = useState("");
  const [user, setUser] = useState([]);
  const [business, setBusiness] = useState([]);
  const status = useRecoilValue(profileState);
  const onHandleLogout = async () => {
    await Auth.signOut();
    setTimeout(() => {
      navigation.navigate("Login_Welcome");
    }, 500);
  };
  const User = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const result = await API.graphql({
      query: customProfile.userByEmail,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        email: attributes.email,
      },
    });
    if (result.data.userByEmail.items[0].business.items.length !== 0)
      setBusiness(result.data.userByEmail.items[0].business.items);
    setUser([result.data.userByEmail.items[0]]);
  };
  // const getImage = async () => {
  //     try {
  //       const url = await Storage.get(business[0].image, {
  //         level: "protected",
  //         identityId: user[0].identityID,
  //       }).then((res) => setSelectKey(res));
  //     } catch (error) {
  //       console.log("toy", error);
  //     }
  // };
  useLayoutEffect(() => {
    User();
    // getImage()
    console.log(business)
    console.log(status);
  }, [route, status]);
  return (
    <ScrollView
      style={[styles.container, global.bgWhite]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
          {`Perfil`}
        </Text>
        <View style={[styles.line, global.bgWhiteSmoke]} />
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
            iconLeft: [styles.iconLeft, global.mainBgColor],
            iconRight: styles.iconRight,
          }}
          icon={{
            left: require("@/utils/images/profile_white.png"),
            right: require("@/utils/images/arrow_right.png"),
          }}
        />
      </View>
      <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
        {`Gestion`}
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (user[0].business.items.length !== 0) {
            Alert.alert("Ya tienes un negocio registrado");
          } else {
            navigation.navigate("Form", {
              user: user[0].id,
            });
          }
        }}
      >
        <View style={[styles.line, global.bgWhiteSmoke]} />
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
            iconLeft: [styles.iconLeft, global.mainBgColor],
            iconRight: styles.iconRight,
          }}
          icon={{
            left: require("@/utils/images/product.png"),
            right: require("@/utils/images/arrow_right.png"),
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('List', {
          data: business,
          user: user[0]
        })}
      >
        <View style={[styles.line, global.bgWhiteSmoke]} />
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
            iconLeft: [styles.iconLeft, global.mainBgColor],
            iconRight: styles.iconRight,
          }}
          icon={{
            left: require("@/utils/images/order.png"),
            right: require("@/utils/images/arrow_right.png"),
          }}
        />
      </TouchableOpacity>
      {/* <View style={[styles.line, global.bgWhiteSmoke]} /> */}
      <View style={styles.content}>
        <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
          {`Configuracion`}
        </Text>
        {buttons.map((button, index) => (
          <View key={index}>
            {button.route ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate(button.route)}
              >
                <View style={[styles.line, global.bgWhiteSmoke]} />
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
                    iconLeft: [styles.iconLeft, global.mainBgColor],
                    iconRight: styles.iconRight,
                  }}
                  icon={button.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={1} onPress={onHandleLogout} >
                <View style={[styles.line, global.bgWhiteSmoke]} />
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
                    iconLeft: [styles.iconLeft, global.mainBgColor],
                    iconRight: styles.iconRight,
                  }}
                  icon={button.icon}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Unprofile;
