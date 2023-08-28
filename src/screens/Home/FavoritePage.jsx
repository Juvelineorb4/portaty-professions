import { View, Text, Image } from "react-native";
import React from "react";

const FavoritePage = ({ route }) => {
  /*  */
  const {
    data: { item, image },
  } = route.params;
  // const {item, image} = data
  console.log(item)
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        paddingTop: 40,
        padding: 10,
      }}
    >
      <View style={[{ flex: 1, flexDirection: "column" }]}>
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: "cover",
              borderRadius: 5,
              backgroundColor: '#fff'
            }}
            source={{ uri: image }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20, borderWidth: 0.3, borderColor: '#444', marginTop: 15, borderRadius: 5 }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
            <Text
              style={{
                fontFamily: "regular",
                fontSize: 14,
                marginTop: 15,
              }}
            >
              Razon Social
            </Text>
            <Text
              style={{
                fontFamily: "light",
                fontSize: 14,
              }}
            >
              {item.business.name}
            </Text>
            </View>
            <View>

            <Text
              style={{
                fontFamily: "regular",
                fontSize: 14,
                marginTop: 15,
                textAlign: 'right'
              }}
            >
              Pagina Web
            </Text>
            <Text
              style={{
                textAlign: 'right',
                fontFamily: "light",
                fontSize: 14,
              }}
            >
              {`Proximamente`}
            </Text>
            </View>

          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>

            <Text
              style={{
                fontFamily: "regular",
                fontSize: 14,
                marginTop: 15,
              }}
            >
              Actividad Laboral
            </Text>
            <Text
              style={{
                fontFamily: "light",
                fontSize: 14,
              }}
            >
              {item.business.name}
            </Text>
            </View>
              <View>
              <Text
              style={{
                fontFamily: "regular",
                fontSize: 14,
                marginTop: 15,
                textAlign: 'right'
              }}
            >
              WhatsApp
            </Text>
            <Text
              style={{
                fontFamily: "light",
                fontSize: 14,
                textAlign: 'right'
              }}
            >
              {item.business.whatsapp}
            </Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>

          <Text
            style={{
              fontFamily: "regular",
              fontSize: 14,
              marginTop: 15,
            }}
          >
            Correo Electronico
          </Text>
          <Text
            style={{
              fontFamily: "light",
              fontSize: 12,
              width: 180
            }}
          >
            {item.business.email}
          </Text>
          </View>
            <View>
            <Text
            style={{
              fontFamily: "regular",
              fontSize: 14,
              marginTop: 15,
              textAlign: 'right'
            }}
          >
            Instagram
          </Text>
          <Text
            style={{
              fontFamily: "light",
              fontSize: 14,
              textAlign: 'right'
            }}
          >
            {`Proximamente`}
          </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>

          <Text
            style={{
              fontFamily: "regular",
              fontSize: 14,
              marginTop: 15,
            }}
          >
            Numero de telefono
          </Text>
          <Text
            style={{
              fontFamily: "light",
              fontSize: 14,
            }}
          >
            {item.business.phone}
          </Text>
            </View>
            <View>
            <Text
            style={{
              fontFamily: "regular",
              fontSize: 14,
              marginTop: 15,
              textAlign: 'right'
            }}
          >
            Facebook
          </Text>
          <Text
            style={{
              fontFamily: "light",
              fontSize: 14,
              textAlign: 'right'
            }}
          >
            {`Proximamente`}
          </Text>
            </View>
          </View>
          <View>

          <Text
            style={{
              fontFamily: "regular",
              fontSize: 14,
              marginTop: 15,
            }}
          >
            Direccion
          </Text>
          <Text
            style={{
              fontFamily: "light",
              fontSize: 14,
            }}
          >
            {`Proximamente`}
          </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavoritePage;