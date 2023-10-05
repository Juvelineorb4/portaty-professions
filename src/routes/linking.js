import * as Linking from "expo-linking";
3;

console.log("LINK CREADO:", Linking.createURL("/"));
export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      ShareListPage: {
        path: "share/list",
      },
      SharePage: {
        path: "share/business",
      },
    },
  },
};
