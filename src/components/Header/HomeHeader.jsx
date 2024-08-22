import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "@/utils/styles/Header.js";
import { useRecoilState } from "recoil";
import { eyelashSelection, inputFavoritesSearch } from "@/atoms";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = ({ type = "promotions" }) => {
  const global = require("@/utils/styles/global.js");
  const [inputSearch, setInputSearch] = useState("");
  const [inputFavorites, setInputFavorites] =
    useRecoilState(inputFavoritesSearch);
  const [selection, setSelection] = useRecoilState(eyelashSelection);
  const handleKeyPress = (input) => {
    setInputFavorites(input.trim());
  };
  const navigation = useNavigation()

  return (
    <View style={[styles.home, global.bgWhite]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{
            width: 80,
            height: 50,
            resizeMode: "cover",
            marginLeft: -12,
          }}
          source={require("@/utils/images/portaty.png")}
        />
        <TouchableOpacity onPress={() => navigation.push('NotificationsPage')}>
          <Ionicons name="notifications-sharp" size={36} color="#ffb703" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={selection !== 0 ? styles.containerEyeActive : styles.eyelash}
          onPress={() => setSelection(1)}
        >
          <Text style={selection !== 0 ? styles.eyeactive : styles.eye}>
            Favoritos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selection !== 0 ? styles.eyelash : styles.containerEyeActive}
          onPress={() => setSelection(0)}
        >
          <Text style={selection !== 0 ? styles.eye : styles.eyeactive}>
            Promociones
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search buscador */}
      {selection !== 0 && (
        <TouchableOpacity
          style={[styles.content, global.bgWhite]}
          activeOpacity={1}
        >
          <Image
            style={{
              width: 22,
              height: 22,
              resizeMode: "cover",
            }}
            source={require("@/utils/images/search_white.png")}
          />
          <TextInput
            placeholder={"Buscar favoritos"}
            defaultValue={inputFavorites}
            style={styles.input}
            placeholderTextColor="#1f1f1f"
            returnKeyType="search"
            onChangeText={(e) => setInputSearch(e)}
            onSubmitEditing={() => handleKeyPress(inputSearch)}
          />
        </TouchableOpacity>
      )}
      <View style={[styles.line, global.mainBgColor]} />
    </View>
  );
};

export default HomeHeader;
