import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  defaultValue = "",
  control,
  name,
  rules = {},
  placeholder,
  styled = {},
  icon,
  text,
  placeholderTextColor = {},
  lines = 1,
  errorPost = false,
  editable = true,
}) => {
  const [gender, setGender] = useState(null);
  const [activeGender, setActiveGender] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { defaultValue, onChange, onBlur },
        fieldState: { error },
      }) => (
        <TouchableOpacity
          onPress={() => setActiveGender(!activeGender)}
          activeOpacity={1}
          style={{ position: "relative" }}
        >
          <View>
            {text && <Text style={styled.label}>{text}</Text>}
            <View
              style={[
                styled.input,
                (error || errorPost) && {
                  borderColor: "red",
                  borderWidth: 0.5,
                },
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
                <TextInput
                  value={
                    gender === 0
                      ? "Masculino"
                      : gender === 1
                      ? "Femenino"
                      : gender === 2
                      ? "Otro"
                      : `Elige tu género`
                  }
                  onBlur={onBlur}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderTextColor}
                  style={defaultValue ? styled.text : styled.placeholder}
                  defaultValue={defaultValue}
                  numberOfLines={lines}
                  editable={editable}
                />
              </View>
            </View>
            {error && (
              <Text style={styled.error}>{error.message || "Requerido"}</Text>
            )}
          </View>
          {activeGender ? (
            <View
              style={{
                flex: 1,
                position: "absolute",
                backgroundColor: "#ffb703",
                width: "100%",
                borderColor: "#1f1f1f",
                borderWidth: 1,
                padding: 10,
                borderRadius: 7,
                bottom: 75,
                zIndex: 100,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setGender(0);
                  onChange("Masculino");
                  setActiveGender(!activeGender);
                }}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#1f1f1f",
                    paddingVertical: 10,
                    color: gender === 0 ? "#1f1f1f" : "#ffffff",
                  }}
                >
                  Masculino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender(1);
                  onChange("Femenino");
                  setActiveGender(!activeGender);
                }}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#1f1f1f",
                    paddingVertical: 10,
                    color: gender === 1 ? "#1f1f1f" : "#ffffff",
                  }}
                >
                  Femenino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender(2);
                  onChange("Otro");
                  setActiveGender(!activeGender);
                }}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#1f1f1f",
                    paddingVertical: 10,
                    color: gender === 2 ? "#1f1f1f" : "#ffffff",
                  }}
                >
                  Otro
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}
        </TouchableOpacity>
      )}
    />
  );
};

export default CustomInput;
