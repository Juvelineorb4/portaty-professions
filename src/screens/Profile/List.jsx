import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "@/utils/styles/Mode.module.css";
import ItemProfile from "@/components/ItemProfile";
import CustomButton from "@/components/CustomButton";

const List = ({ route, navigation }) => {
  const { data, user } = route.params;
  const global = require("@/utils/styles/global.js");
  if (data.length !== 0)
    return (
      <ScrollView
        style={[
          { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
          global.bgWhite,
        ]}
      >
        <Text style={{ fontFamily: "regular", fontSize: 16, marginBottom: 10 }}>
          Tienes {data.length} negocio(s) registrado(s)
        </Text>

        {data.map((post, index) => {
          let schedule = JSON.parse(post.schedule)
          return (
            <ItemProfile
              key={index}
              data={post}
              schedule={schedule.shedule}
              type={schedule.type}
              identityID={user["custom:identityID"]}
              styled={{ column: styles.columnList }}
            />
          );
        })}
        <View
          style={{
            marginBottom: 120,
          }}
        ></View>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 150}}>

        <Text style={{fontFamily: 'regular', fontSize: 18, textAlign: 'center'}}>Solo puedes registrar 1 negocio con tu cuenta gratuita </Text>
        <CustomButton
          text={`Adquiere un plan`}
          handlePress={() =>
            navigation.navigate("FormNavigator", {
              user: user["custom:userTableID"],
            })
          }
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
        </View> */}
      </ScrollView>
    );
  if (data.length === 0)
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 70,
          },
          global.bgWhite,
        ]}
      >
        <Text style={{ fontFamily: "regular", fontSize: 16 }}>
          No tienes ningun negocio registrado
        </Text>
        <CustomButton
          text={`Registrar un negocio`}
          handlePress={() =>
            navigation.navigate("FormNavigator", {
              user: user["custom:userTableID"],
            })
          }
          textStyles={[styles.textSearch, global.black]}
          buttonStyles={[styles.search, global.bgYellow]}
        />
      </View>
    );
};

export default List;