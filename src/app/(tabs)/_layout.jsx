import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { Tabs } from "expo-router";
import styles from "@/assets/styles/Tabs.module.css";
import { Auth, API } from "aws-amplify";
import { userByEmail } from "@/graphql/queries";
const global = require("@/assets/styles/global.js");
const { width } = Dimensions.get("window");
const MARGIN = 0;
const TAB_BAR_WIDTH = width - 2 * MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH / 3;

function MyTabBar({ state, descriptors, navigation }) {
  const [translateX] = useState(new Animated.Value(0));

  const translateTab = (index) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);
  return (
    <View
      style={[
        styles.tabBarContainer,
        global.bgWhite,
        { width: TAB_BAR_WIDTH, bottom: MARGIN },
      ]}
    >
      <View
        style={{
          width: TAB_WIDTH,
          ...StyleSheet.absoluteFillObject,
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[
            styles.slidingTab,
            global.mainBgColor,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        const tabBarIcon = options.tabBarIcon;
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{ flex: 1, alignItems: "center" }}
          >
            <TabIcon
              tabIcon={tabBarIcon}
              isFocused={isFocused}
              label={label}
              index={state.index}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({ isFocused, tabIcon, label, index }) => {
  const [translateY] = useState(new Animated.Value(0));

  const translateIcon = (val) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused) {
      translateIcon(-15);
    } else {
      translateIcon(0);
    }
  }, [index]);
  return (
    <>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Image
          style={{
            width: 33,
            height: 33,
            resizeMode: "contain",
            marginTop: isFocused ? -2 : 0,
          }}
          source={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
        />
      </Animated.View>
      <Text
        style={{
          color: isFocused ? "#5E2129" : "#5E2129",
          fontSize: 13,
          fontFamily: "regular",
          marginTop: isFocused ? 0 : -3,
        }}
      >
        {label}
      </Text>
    </>
  );
};
const TabsLayout = () => {
  useEffect(() => {
    // checkUser();
  }, []);

  // const checkUser = async () => {
  //   const { attributes } = await Auth.currentAuthenticatedUser();
  //   const { email } = attributes;
  //   const result = await API.graphql({
  //     query: userByEmail,
  //     authMode: "AMAZON_COGNITO_USER_POOLS",
  //     variables: {
  //       email: email,
  //     },
  //   });
  //   console.log(result.data.userByEmail.items[0]);
  // };


  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={`home`}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: {
            activeIcon: require("../../assets/images/home_white.png"),
            inActiveIcon: require("../../assets/images/home.png"),
          },
          headerShown: false,
          tabBarLabel: "Inicio",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: {
            activeIcon: require("../../assets/images/search_white.png"),
            inActiveIcon: require("../../assets/images/search.png"),
          },
          headerShown: false,
          tabBarLabel: "Buscar",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: {
            activeIcon: require("../../assets/images/profile_white.png"),
            inActiveIcon: require("../../assets/images/profile.png"),
          },
          headerShown: false,
          tabBarLabel: "Mi perfil",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
