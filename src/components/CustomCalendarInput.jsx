import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";

const CustomCalendarInput = ({
  defaultValue,
  control,
  name,
  rules = {},
  placeholder,
  styled = {},
  icon,
  text,
  placeholderTextColor = {},
  errorPost = false,
}) => {
  const validarFechaNacimiento = (fecha) => {
    const today = new Date();
    if (!fecha) return false; // Si no se proporciona una fecha, no es válida
    const [day, month, year] = fecha.split("/");
    const inputDate = new Date(`${year}-${month}-${day}`);
    messageError = "";
    // Expresión regular para el formato dd/mm/aaaa
    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!regex.test(fecha)) messageError = "Formato dd/mm/aaaa no valido. ";
    // Si el día no está dentro del rango de 1 a 31
    // Validar el número de días para el mes
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    if (parseInt(day) > daysInMonth) {
      messageError += `Dia no valido `;
    }

    // Si el mes no está dentro del rango de 1 a 12
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      messageError += "Mes no valido. ";
    }

    // Si el año no está dentro del rango esperado
    if (parseInt(year) < 1900 || parseInt(year) > 2099) {
      messageError += "Año no valido. ";
    }

    // Validar si es mayor de edad (18 años)
    const edadMinima = 18;
    const diffYears = today.getFullYear() - inputDate.getFullYear();
    const diffMonths = today.getMonth() - inputDate.getMonth();
    const diffDays = today.getDate() - inputDate.getDate();

    if (messageError !== "") {
      return messageError;
    } else if (
      diffYears < edadMinima ||
      (diffYears === edadMinima && diffMonths < 0) ||
      (diffYears === edadMinima && diffMonths === 0 && diffDays < 0)
    ) {
      return "Debes ser mayor de edad para continuar. ";
    }

    return true;
  };

  // Función para validar que la persona sea mayor de edad
  const edadMayorDe18 = (fecha) => {
    const [day, month, year] = fecha.split("/");
    const inputDate = new Date(`${year}-${month}-${day}`);
    return new Date().getFullYear() - year >= 18;
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: rules.required,
        validate: validarFechaNacimiento,
      }}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View>
          {text && <Text style={styled.label}>{text}</Text>}
          <View
            style={[
              styled.input,
              (error || errorPost) && { borderColor: "red", borderWidth: 0.5 },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              {icon && (
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                  }}
                  source={icon}
                />
              )}
              <TextInputMask
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={value ? styled.text : styled.placeholder}
                defaultValue={defaultValue}
                type="datetime"
                options={{
                  format: "DD/MM/YYYY",
                }}
                maxLength={10}
              />
            </View>
          </View>
          {error && (
            <Text style={styled.error}>{error.message || "Requerido"}</Text>
          )}
          {errorPost && (
            <Text
              style={{
                color: "red",
                position: "absolute",
                right: 10,
                bottom: -5,
                fontFamily: "medium",
                fontSize: 10,
                textTransform: "capitalize",
              }}
            >
              Requerido
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default CustomCalendarInput;

// const styles = StyleSheet.create({});
