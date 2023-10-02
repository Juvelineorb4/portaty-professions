import * as Linking from "expo-linking";
export default {
  prefixes: [Linking.createURL("/"), "portaty://", "https://portaty.com"],
  config: {
    screens: {
      Tabs_Navigation: {
        screens: {
          Profile_Tab: {
            screens: {
              Unprofile: {
                path: "profile",
              },
            },
          },
        },
      },
    },
  },
};
