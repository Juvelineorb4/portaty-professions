import { View, Text, Image } from "react-native";
import React from "react";
import styles from "@/assets/styles/Profile.module.css";
import CustomButton from "@/components/CustomButton";
import { router, useRouter } from "expo-router";
const Profile = () => {
  const global = require("@/assets/styles/global.js");
  const router = useRouter()
  return (
    <View style={[styles.container, global.bgWhite]}>
      <View style={styles.header}>
        <View style={styles.headerImage}>
          <Image
            style={{
              width: 90,
              height: 90,
              resizeMode: "contain",
            }}
            source={require("@/assets/images/bueno.png")}
          />
        </View>
        <View style={styles.contentHeader}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                { fontFamily: "light", fontSize: 14 },
                global.black,
              ]}
            >
              Christopher Alvarez
            </Text>
            <Image
            style={{
              width: 35,
              height: 35,
              resizeMode: "contain",
              marginLeft: 5
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
      <Text style={{ fontFamily: "light", fontSize: 14, marginTop: 20 }}>
        Correo Electronico:
      </Text>
      <Text style={{ fontFamily: "light", fontSize: 14 }}>
        alvarezchristopherve@gmail.com
      </Text>
      <View style={[styles.line, global.mainBgColor]} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: -50 }}>
        <Text style={[{ fontFamily: "light", fontSize: 24 }, global.mainColor]}>
          ¿Tienes un negocio?
        </Text>
        <CustomButton
            text={`Regístralo`}
            handlePress={() => router.replace(`/profile/form`)}
            textStyles={[styles.textRegister, global.white]}
            buttonStyles={[styles.register, global.mainBgColor]}
          />
      </View>
    </View>
  );
};

export default Profile;
