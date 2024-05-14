// const { getDefaultConfig } = require("expo/metro-config");
// const exclusionList = require("metro-config/src/defaults/exclusionList");
// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig(__dirname);
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-css-transformer"),
//       assetPlugins: ['expo-asset/tools/hashAssetFiles'],
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false
//       }
//     })

//     },
//     resolver: {
//       sourceExts: [...sourceExts, "css", "ttf", "png"],
//       blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
//     },
//   };
// })();
/*  */

const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("@expo/metro-config/babel-transformer"),
  // assetPlugins: ["react-native-css-transformer"],
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
};

config.resolver = {
  ...resolver,
  sourceExts: [...resolver.sourceExts, "css", "ttf", "png"],
  blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
};

module.exports = config;

/*  */

// const transformer = require('./metro.transformer.js'); 
// const { getDefaultConfig } = require('expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   ...defaultConfig,
//   transformer: {
//     ...defaultConfig.transformer,
//     babelTransformerPath: require.resolve('./metro.transformer.js'),
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };