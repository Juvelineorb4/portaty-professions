import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import GridSearch from "@/components/Search/GridSearch";
import * as customSearch from "@/graphql/CustomQueries/Search";
import * as Location from "expo-location";
import { Auth, API, Storage } from "aws-amplify";

const SearchOut = ({ route }) => {
  const global = require("@/utils/styles/global.js");
  const { input } = route.params;
  const [moreItems, setMoreItems] = useState(1);
  const [items, setItems] = useState([]);
  const [totalData, setTotalData] = useState(2);
  const [totalLimit, setTotalLimit] = useState(1);
  let number = 26 * moreItems;

  const getData = async () => {
    const api = "api-professions-gateway";
    const path = "/searchBusinessByDistance";
    const params = {
      headers: {}, // OPTIONAL
      queryStringParameters: {
        location: JSON.stringify({
          lat: 10.175697,
          lon: -69.3123711,
        }),
        km: 10,
        from: 0,
        text: input.trim(),
        limit: number,
      },
    };
    try {
      const response = await API.get(api, path, params);
      console.log("toy en response", response.total);

      setTotalData(response.total);
      setTotalLimit(response.limit);
      let newItems = [];
      const long = 26;
      for (let i = 0; i < response.items.length; i += long) {
        let cut = response.items.slice(i, i + long);
        newItems.push(cut);
      }
      return setItems(newItems);
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  useEffect(() => {
    getData();
  }, [route, moreItems]);

  if (items.length !== 0)
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingBottom: 50 }}>
        <Text style={{fontFamily: 'thinItalic', fontSize: 16, paddingLeft: 10, paddingBottom: 15}}>Busqueda por: "{input.trim()}"</Text>
        {items !== 0 && (
          <FlatList
            data={items}
            renderItem={({ item, index }) => (
              <GridSearch renderItems={item} more={index} />
            )}
            keyExtractor={(item, index) => index}
            ListFooterComponent={() => (
              <View
                style={{
                  height: 100,
                  background: "#ffffff",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 20,
                }}
              >
                {totalData > totalLimit && (
                  <ActivityIndicator size="large" color="#5E2129" />
                )}
                {totalData === totalLimit && (
                  <Text style={{ fontFamily: "light", fontSize: 14 }}>
                    No hay mas resultados por: "{input.trim()}"
                  </Text>
                )}
              </View>
            )}
            onEndReached={() => {
              if (totalData > totalLimit) setMoreItems(moreItems + 1);
            }}
            onEndReachedThreshold={0}
          />
        )}
      </View>
    );
  if (totalData === 0) {
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <Text style={[{fontFamily: 'light', fontSize: 16, textAlign: 'center', marginBottom: 60}, global.midGray]}>No se encuentran resultados por: "{input.trim()}"</Text>
      </View>
    );
  } else {
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          global.bgWhite,
        ]}
      >
        <ActivityIndicator size="large" color="#5E2129" />
      </View>
    );
  }
};

export default SearchOut;
