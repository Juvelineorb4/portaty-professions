import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/utils/styles/Unprofile.module.css";
import CustomSelect from "@/components/CustomSelect";
import { settings } from "@/utils/constants/settings";
const Unprofile = () => {
    const { buttons } = settings;
  const global = require("@/utils/styles/global.js");
  return (
    <ScrollView
      style={[styles.container, global.bgWhite]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.line, global.bgWhiteSmoke]} />

      <CustomSelect
        title={`Registra un negocio`}
        subtitle={`Publica tu negocio para que cientos de personajes puedan encontrarte`}
        styled={{
          text: {
            container: styles.textContainerSelect,
            title: [styles.textTitleSelect, global.black],
            subtitle: [styles.textSubtitleSelect, global.topGray],
          },
          container: styles.containerSelect,
          iconLeft: [styles.iconLeft, global.mainBgColor],
          iconRight: styles.iconRight,
        }}
        icon={{
          left: require("@/utils/images/product.png"),
          right: require("@/utils/images/arrow_right.png"),
        }}
      />
      <View style={[styles.line, global.bgWhiteSmoke]} />
      <CustomSelect
        title={`Lista de tus negocios`}
        subtitle={`Mira todos los negocios que tienes publicados`}
        styled={{
          text: {
            container: styles.textContainerSelect,
            title: [styles.textTitleSelect, global.black],
            subtitle: [styles.textSubtitleSelect, global.topGray],
          },
          container: styles.containerSelect,
          iconLeft: [styles.iconLeft, global.mainBgColor],
          iconRight: styles.iconRight,
        }}
        icon={{
          left: require("@/utils/images/product.png"),
          right: require("@/utils/images/arrow_right.png"),
        }}
      />
      <View style={[styles.line, global.bgWhiteSmoke]} />
      <View style={styles.content}>
        <Text style={[styles.titleSettings, global.black]}>
          {`Configuracion`}
        </Text>
        {buttons.map((button, index) => (
          <View key={index}>
            {button.route ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate(button.route)}
              >
                <View style={[styles.line, global.bgWhiteSmoke]} />
                <CustomSelect
                  title={button.title}
                  subtitle={button.subtitle}
                  styled={{
                    text: {
                      container: styles.textContainerSelect,
                      title: [styles.textTitleSelect, global.black],
                      subtitle: [styles.textSubtitleSelect, global.topGray],
                    },
                    container: styles.containerSelect,
                    iconLeft: [styles.iconLeft, global.mainBgColor],
                    iconRight: styles.iconRight,
                  }}
                  icon={button.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={1}>
                <View style={[styles.line, global.bgWhiteSmoke]} />
                <CustomSelect
                  title={button.title}
                  subtitle={button.subtitle}
                  styled={{
                    text: {
                      container: styles.textContainerSelect,
                      title: [styles.textTitleSelect, global.black],
                      subtitle: [styles.textSubtitleSelect, global.topGray],
                    },
                    container: styles.containerSelect,
                    iconLeft: [styles.iconLeft, global.mainBgColor],
                    iconRight: styles.iconRight,
                  }}
                  icon={button.icon}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Unprofile;
