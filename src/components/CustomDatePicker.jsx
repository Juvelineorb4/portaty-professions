import React, { useState } from "react";
import { View, Button, Text, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleEndDateChange = (event, selectedDate) => {
    setShowEnd(false);
    if (selectedDate) {
      if (selectedDate <= startDate) {
        Alert.alert(
          "Error",
          "La fecha final debe ser mayor que la fecha inicial."
        );
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  return (
    <View>
      <Button
        title="Seleccionar Fecha Inicial"
        onPress={() => setShowStart(true)}
      />
      {showStart && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStart(false);
            if (selectedDate) {
              setStartDate(selectedDate);
              if (selectedDate >= endDate) {
                setEndDate(
                  new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
                );
              }
            }
          }}
        />
      )}
      <Text>Fecha Inicial: {startDate.toDateString()}</Text>

      <Button
        title="Seleccionar Fecha Final"
        onPress={() => setShowEnd(true)}
      />
      {showEnd && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      <Text>Fecha Final: {endDate.toDateString()}</Text>
    </View>
  );
};

export default CustomDatePicker;
