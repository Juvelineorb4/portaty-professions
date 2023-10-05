import * as Linking from "expo-linking";
export default {
  prefixes: [Linking.createURL("/"), "portaty://", "https://portaty.com"],
  config: {
    screens: {
      ShareNavigator: {
        screens: {
          ShareListPage: {
            path: "share/list",
          },
        },
      },
      SharePage: {
        path: "share/business",
      },
    },
  },
};
