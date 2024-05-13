import { View, Text, TouchableOpacity, Linking, ScrollView } from "react-native";
import React from "react";
import {
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import styles from "@/utils/styles/Unprofile.js";

const Contact = () => {
  const global = require("@/utils/styles/global.js");
  const openCall = () => {
    const url = `tel://+573203890732`;
    Linking.openURL(url);
  };
  const openWs = () => {
    const url =
      "https://api.whatsapp.com/send?phone=573203890732&text=Buenas%2C%20me%20gustaria%20realizar%20una%20consulta!";
    Linking.openURL(url);
  };

  const openTiktok = () => {
    const url = "https://www.tiktok.com/@portatyapp";
    Linking.openURL(url);
  };

  const openX = () => {
    const url = "https://twitter.com/PortatyApp";
    Linking.openURL(url);
  };

  const openInstagram = () => {
    const url =
      "https://www.instagram.com/portatyapp?igsh=MWNwaHU0bHZ1OGswcQ%3D%3D&utm_source=qr";
    Linking.openURL(url);
  };
  return (
    <ScrollView style={[{ flex: 1 }, global.bgWhite]}>
      <View>
        <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
          {`Redes sociales`}
        </Text>
        <View style={[styles.line, global.bgMidGray]} />
        <View>
          <TouchableOpacity
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 0,
            }}
            onPress={openInstagram}
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
                    borderWidth: 0.7,
                    borderColor: "#1f1f1f",
                  },
                  global.bgYellow,
                ]}
              >
                <Entypo name="instagram" size={20} color="#1f1f1f" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                  Abrir Instagram
                </Text>
                <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                  @portatyapp
                </Text>
              </View>
            </View>
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "cover",
              }}
              source={require("@/utils/images/arrow_right.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: -27,
            }}
            onPress={openTiktok}
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
                    borderWidth: 0.7,
                    borderColor: "#1f1f1f",
                  },
                  global.bgYellow,
                ]}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "cover",
                  }}
                  source={require("@/utils/images/tiktok.png")}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                  Abrir Tiktok
                </Text>
                <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                  @portatyapp
                </Text>
              </View>
            </View>
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "cover",
              }}
              source={require("@/utils/images/arrow_right.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: -27,
            }}
            onPress={openX}
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
                    borderWidth: 0.7,
                    borderColor: "#1f1f1f",
                  },
                  global.bgYellow,
                ]}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "cover",
                  }}
                  source={require("@/utils/images/xtwitter.png")}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                  Abrir Twitter X
                </Text>
                <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                  @portatyapp
                </Text>
              </View>
            </View>
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "cover",
              }}
              source={require("@/utils/images/arrow_right.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={[styles.titleSettings, global.black, { marginTop: 0 }]}>
          {`Números de teléfono`}
        </Text>
        <View style={[styles.line, global.bgMidGray]} />
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 0,
          }}
          onPress={openCall}
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
                  borderWidth: 0.7,
                  borderColor: "#1f1f1f",
                },
                global.bgYellow,
              ]}
            >
              <Feather name="phone-call" size={20} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>Llamar</Text>
              <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                +57 320 3890732
              </Text>
            </View>
          </View>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
            source={require("@/utils/images/arrow_right.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -27,
          }}
          onPress={openWs}
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
                  borderWidth: 0.7,
                  borderColor: "#1f1f1f",
                },
                global.bgYellow,
              ]}
            >
              <FontAwesome name="whatsapp" size={20} color="#1f1f1f" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "medium", fontSize: 15 }}>
                Abrir WhatsApp
              </Text>
              <Text style={{ fontFamily: "light", fontSize: 12, width: 150 }}>
                +57 320 3890732
              </Text>
            </View>
          </View>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
            source={require("@/utils/images/arrow_right.png")}
          />
        </TouchableOpacity>
        <View>
          <View></View>
        </View>
      </View>
      <View>
        <Text style={[styles.titleSettings, global.black, { marginTop: 0 }]}>
          {`Correos electrónicos`}
        </Text>
        <View style={[styles.line, global.bgMidGray]} />
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            paddingBottom: 100
        }}>
          <Fontisto name="email" size={20} color="#1f1f1f" />
          <Text style={{ fontSize: 14, fontFamily: "lightItalic", marginLeft: 5 }}>
            soporte@portaty.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Contact;
