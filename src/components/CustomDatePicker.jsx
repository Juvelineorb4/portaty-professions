import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [startDateString, setStartDateString] = useState("Elige fecha inicial");
  const [endDateString, setEndDateString] = useState("Elige fecha final");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(Platform.OS === "ios");
    setStartDate(currentDate);
    if (currentDate > endDate) {
      setEndDate(currentDate);
      dateStrings(currentDate, currentDate);
      return;
    }
    dateStrings(currentDate, endDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(Platform.OS === "ios");
    if (currentDate >= startDate) {
      setEndDate(currentDate);
    }
    dateStrings(startDate, currentDate);
  };

  const dateStrings = (start, end) => {
    const dayStart = start.getUTCDate();
    const monthStart = start.getUTCMonth() + 1;
    const yearStart = start.getUTCFullYear();

    setStartDateString(
      `${dayStart}-${
        monthStart < 10 ? `0${monthStart}` : monthStart
      }-${yearStart}`
    );

    const dayEnd = end.getUTCDate();
    const monthEnd = end.getUTCMonth() + 1;
    const yearEnd = end.getUTCFullYear();

    setEndDateString(
      `${dayEnd}-${monthEnd < 10 ? `0${monthEnd}` : monthEnd}-${yearEnd}`
    );
  };

  useEffect(() => {
    dateStrings(startDate, endDate);
  }, []);

  return (
    <View>
      <Text
        style={{
          fontFamily: "bold",
          fontSize: 12,
          color: "#1f1f1f",
          marginBottom: 2,
        }}
      >
        Fecha inicial
      </Text>
      {/* <TouchableOpacity
        style={{
          borderRadius: 8,
          width: 130,
          height: 40,
          marginLeft: 1,
          marginBottom: 5,
          padding: 10,
          borderColor: "#1f1f1f",
          borderWidth: 1,
        }}
        onPress={() => setShowStartPicker(true)}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 11,
            color: "#404040",
            opacity: 0.5,
          }}
        >
          {startDateString}
        </Text>
      </TouchableOpacity> */}
      {Platform.OS === "ios" && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          maximumDate={maxDate}
          onChange={onStartDateChange}
          style={{
            borderRadius: 8,
            marginLeft: 1,
            color: "#404040",
            left: -20,
            marginBottom: 10,
            marginTop: 5,
          }}
        />
      )}

      <Text
        style={{
          fontFamily: "bold",
          fontSize: 12,
          color: "#1f1f1f",
          marginBottom: 2,
        }}
      >
        Fecha final
      </Text>
      {/* <TouchableOpacity
        style={{
          borderRadius: 8,
          width: 130,
          height: 40,
          marginLeft: 1,
          marginBottom: 5,
          padding: 10,
          borderColor: "#1f1f1f",
          borderWidth: 1,
        }}
        onPress={() => setShowEndPicker(true)}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 11,
            color: "#404040",
            opacity: 0.5,
          }}
        >
          {endDateString}
        </Text>
      </TouchableOpacity> */}
      {Platform.OS === "ios" && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          minimumDate={startDate}
          maximumDate={startDate}
          onChange={onEndDateChange}
          style={{
            borderRadius: 8,
            marginLeft: 1,
            color: "#404040",
            left: -20,
            marginBottom: 10,
            marginTop: 5,
          }}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;
