import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "@/assets/styles/Profile.module.css";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import GridProfile from "@/components/GridProfile";
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";

const Profile = () => {
  const global = require("@/assets/styles/global.js");
  const router = useRouter();
  const params = useLocalSearchParams();
  const [user, setUser] = useState({});
  const User = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const result = await API.graphql({
      query: queries.userByEmail,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        email: attributes.email,
      },
    });
    setUser(result.data.userByEmail.items[0]);
  };
  useEffect(() => {
    User();
  }, []);
  return (
    <View style={[styles.container, global.bgWhite]}>
      <View style={{ flex: 0.5 }}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <Image
              style={{
                width: 90,
                height: 90,
                resizeMode: "contain",
              }}
              source={require("@/assets/images/image_profile.png")}
            />
          </View>
          <View style={styles.contentHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[{ fontFamily: "light", fontSize: 14 }, global.black]}
              >
                {user ? `${user.name} ${user.lastName}` : ""}
              </Text>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: "contain",
                  marginLeft: 5,
                }}
                source={require("@/assets/images/edit.png")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontFamily: "thin", fontSize: 22 }}>0</Text>
                <Text style={{ fontFamily: "light" }}>Mis Favoritos</Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "light",
            fontSize: 14,
            marginTop: 20,
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
            marginBottom: 15,
          }}
        >
          {user ? user.email : ""}
        </Text>
        <View style={[styles.line, global.mainBgColor]} />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: -50,
        }}
      >
        <View
          style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: -200,
          }}
        >
          <Text
            style={[{ fontFamily: "light", fontSize: 24 }, global.mainColor]}
          >
            ¿Tienes un negocio?
          </Text>
          <CustomButton
            text={`Regístralo`}
            handlePress={() => {
              if (user.id)
                router.push({
                  pathname: `/profile/form`,
                  params: {
                    user: user.id,
                  },
                });
            }}
            textStyles={[styles.textRegister, global.white]}
            buttonStyles={[styles.register, global.mainBgColor]}
          />
        </View>

        {/* <GridProfile /> */}
      </View>
    </View>
  );
};

export default Profile;
