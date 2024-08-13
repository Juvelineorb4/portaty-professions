import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const ItemProfile = ({ data, identityID, styled, schedule, type }) => {
  const navigation = useNavigation();
  const actividad = JSON.parse(data.activity);
  const [weekSchedule, setWeekSchedule] = useState("");

  const filterSchedule = (array, type) => {
    if (schedule === null || type === null) return;
    let scheduleG = [];
    let activeDays = array.filter((day) => day.active);

    for (let i = 0; i < activeDays.length; i++) {
      if (
        i === 0 ||
        activeDays[i].hourStart !== activeDays[i - 1].hourStart ||
        activeDays[i].hourEnd !== activeDays[i - 1].hourEnd
      ) {
        scheduleG.push({
          days: [activeDays[i].name],
          hourStart: activeDays[i].hourStart,
          hourEnd: activeDays[i].hourEnd,
        });
      } else {
        scheduleG[scheduleG.length - 1].days.push(activeDays[i].name);
      }
    }

    let pContent = scheduleG
      .map((group) => {
        let days = group.days;
        if (days.length > 2) {
          let consecutive = true;
          for (let i = 1; i < days.length; i++) {
            if (
              array.findIndex((day) => day.name === days[i]) !==
              array.findIndex((day) => day.name === days[i - 1]) + 1
            ) {
              consecutive = false;
              break;
            }
          }
          if (consecutive) {
            days = [days[0], "a", days[days.length - 1]];
          } else {
            days = days.join(" - ");
          }
        } else if (days.length === 2) {
          days = [days[0], "y", days[1]];
        }
        return `${Array.isArray(days) ? days.join(" ") : days}: ${
          group.hourStart
        } - ${group.hourEnd}`;
      })
      .join(" / ");


    setWeekSchedule(pContent);
  };

  useEffect(() => {
    filterSchedule(schedule, type);
  }, []);

  if (identityID)
    return (
      <TouchableOpacity
        style={styled.column}
        onPress={() =>
          navigation.navigate("PageNavigator", {
            screen: "Page",
            params: {
              data: {
                item: data,
                image: JSON.parse(data.images[0]).url,
                weeks: weekSchedule,
                schedule: schedule,
                scheduleType: type,
              },
            },
            // {
            // data: {
            //   item: data,
            //   image: JSON.parse(data.images[0]).url,
            // },
          })
        }
      >
        <View
          style={{
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Image
            style={{
              width: 130,
              height: 130,
              resizeMode: "cover",
              borderRadius: 2,
              borderColor: "#1f1f1f",
              borderWidth: 0.7,
            }}
            source={{ uri: data?.thumbnail }}
          />
        </View>
        <View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              marginLeft: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 13, fontFamily: "medium" }}>Nombre</Text>
              <Text
                style={{ fontSize: 12, fontFamily: "light", width: 150 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.name}
              </Text>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 13, fontFamily: "medium" }}>Area</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "light",
                  width: 100,
                }}
              >
                {actividad.main}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 13, fontFamily: "medium" }}>
                Actividad
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "light",
                  // textTransform: "capitalize",
                }}
              >
                {actividad.sub}
              </Text>
            </View>
          </View>
          <View style={{ height: 30 }}></View>
        </View>
      </TouchableOpacity>
    );
};

export default ItemProfile;
