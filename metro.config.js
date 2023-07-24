const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const { resolver } = config;
const { sourceExts } = resolver;
config.transformer.babelTransformerPath = require.resolve(
  "react-native-css-transformer"
);

config.resolver = {
  sourceExts: [...sourceExts, "css"],
  blacklistRE: [/#current-cloud-backend\/.*/],
};

module.exports = config;