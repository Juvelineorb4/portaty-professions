import { View, Text } from "react-native";
import React from "react";
import LeftGrid from "./LeftGrid";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const ListSearch = ({ renderItems, more, input }) => {
  console.log(renderItems.results.length);
  if (renderItems.length !== 0)
    return (
      <View style={{ flex: 1, paddingHorizontal: 20, marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "bold",
            marginVertical: 5,
          }}
        >
          {renderItems?.sector_name}
        </Text>
        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderColor: "#1f1f1f",
            marginBottom: 10,
          }}
        ></View>
        <LeftGrid
          data={renderItems?.results.slice(
            0,
            renderItems?.results.length - 1 < 5
              ? renderItems?.results.length
              : 6
          )}
        />
        {renderItems.results.length >= 5 && (
          <View
            style={{
              alignSelf: "flex-end",
              borderWidth: 1,
              borderColor: "#1f1f1f",
              padding: 7,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "lightItalic",
                fontSize: 14,
                marginRight: 3,
              }}
            >
              Ver más
            </Text>
            <EvilIcons name="arrow-right" size={20} color="#1f1f1f" />
          </View>
        )}
      </View>
    );
};

export default ListSearch;
