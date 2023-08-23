import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/Profile.module.css";
import CustomButton from "@/components/CustomButton";
import GridProfile from "@/components/GridProfile";
import { Auth, API, Storage } from "aws-amplify";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import * as mutations from "@/graphql/mutations";
import { ScrollView } from "react-native-gesture-handler";
import { businessProfile, userProfile, profileState } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const Profile = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const [selectKey, setSelectKey] = useState('');
  const [user, setUser] = useState([]);
  const [business, setBusiness] = useState([]);
  const status = useRecoilValue(profileState);
  const User = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const result = await API.graphql({
      query: customProfile.userByEmail,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        email: attributes.email,
      },
    });
    if (result.data.userByEmail.items[0].business.items.length !== 0) setBusiness([result.data.userByEmail.items[0].business.items[0]]);
    setUser([result.data.userByEmail.items[0]]);

  };
  const getImage = async () => {
      try {
        const url = await Storage.get(business[0].image, {
          level: "protected",
          identityId: user[0].identityID,
        }).then((res) => setSelectKey(res));
      } catch (error) {
        console.log("toy", error);
      }
  };
  useLayoutEffect(() => {
    User();
    getImage()
    console.log(status)
  }, [route, status]);
  /*  */
  if (user.length !== 0 || business.length !== 0) { 
    return (
      <ScrollView style={[styles.container, global.bgWhite]}>
        <View style={{ flex: 0.5 }}>
          <View
            style={[
              styles.header,
              {
                paddingHorizontal: business ? "10%" : "20%",
                marginTop: 10,
              },
            ]}
          >
            <View style={styles.headerImage}>
              {selectKey ? (
                <Image
                  style={{
                    width: 90,
                    height: 90,
                    resizeMode: "contain",
                    borderRadius: 50,
                  }}
                  source={{ uri: selectKey }}
                />
              ) : selectKey.length === 0 ? (
                <Image
                  style={{
                    width: 90,
                    height: 90,
                    resizeMode: "contain",
                    borderRadius: 50,
                  }}
                  source={require("@/utils/images/image_profile.png")}
                />
              ) : (
                <ActivityIndicator />
              )}
            </View>
            <View style={styles.contentHeader}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[{ fontFamily: "light", fontSize: 14 }, global.black]}
                >
                  {business.length !== 0
                    ? `${business[0].name}`
                    : user.length !== 0
                    ? `${user[0].name} ${user[0].lastName}`
                    : ""}
                </Text>
                <Image
                  style={{
                    width: 35,
                    height: 35,
                    resizeMode: "contain",
                    marginLeft: 5,
                  }}
                  source={require("@/utils/images/edit.png")}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  columnGap: 10,
                }}
              >
                {business.length !== 0 ? (
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "thin", fontSize: 22 }}>0</Text>
                    <Text style={{ fontFamily: "light" }}>Seguidores</Text>
                  </View>
                ) : (
                  ""
                )}
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontFamily: "thin", fontSize: 22 }}>0</Text>
                  <Text style={{ fontFamily: "light" }}>Mis Favoritos</Text>
                  {status ? <Text style={{ fontFamily: "light" }}>Activo</Text> : <Text style={{ fontFamily: "light" }}>No activo</Text>}
                </View>
              </View>
            </View>
          </View>
          {business.length !== 0 ? (
            <View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  marginTop: 15,
                  textAlign: "center",
                }}
              >
                Actividad Laboral
              </Text>
              <Text
                style={{
                  fontFamily: "light",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {business.length !== 0 ? business[0].activity : ""}
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Correo Electronico
              </Text>
              <Text
                style={{
                  fontFamily: "light",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {business.length !== 0 ? business[0].email : ""}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  paddingHorizontal: 30,
                  marginBottom: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ marginRight: 15 }}>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    Telefono
                  </Text>
                  <Text
                    style={{
                      fontFamily: "light",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {business.length !== 0 ? business[0].phone : ""}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{
                      width: 26,
                      height: 26,
                      resizeMode: "contain",
                      marginRight: 5,
                    }}
                    source={require("@/utils/images/whatsapp.png")}
                  />
                  <Image
                    style={{
                      width: 26,
                      height: 26,
                      resizeMode: "contain",
                      marginRight: 5,
                    }}
                    source={require("@/utils/images/facebook.png")}
                  />
                  <Image
                    style={{
                      width: 26,
                      height: 26,
                      resizeMode: "contain",
                      marginRight: 5,
                    }}
                    source={require("@/utils/images/instagram.png")}
                  />
                  <Image
                    style={{
                      width: 26,
                      height: 26,
                      resizeMode: "contain",
                      marginRight: 5,
                    }}
                    source={require("@/utils/images/web.png")}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 14,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Correo Electronico
              </Text>
              <Text
                style={{
                  fontFamily: "light",
                  fontSize: 14,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                {user.length !== 0 ? user[0].email : ""}
              </Text>
            </View>
          )}
          <View style={[styles.line, global.mainBgColor]} />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          {business.length !== 0 ? (
            <GridProfile
              business={{
                item: business,
                image: selectKey,
              }}
            />
          ) : (
            <View
              style={{
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
                marginTop: "33%",
              }}
            >
              <Text
                style={[
                  { fontFamily: "light", fontSize: 24 },
                  global.mainColor,
                ]}
              >
                ¿Tienes un negocio?
              </Text>
              <CustomButton
                text={`Regístralo`}
                handlePress={() => {
                  if (user[0].id)
                    navigation.navigate("Form", {
                      user: user[0].id,
                    });
                }}
                textStyles={[styles.textRegister, global.white]}
                buttonStyles={[styles.register, global.mainBgColor]}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}, global.bgWhite]}>
        <ActivityIndicator size="large" color='#5E2129' />
      </View>
    )
  }

  
};

export default Profile;
