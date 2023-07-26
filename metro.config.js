const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const { resolver } = config;
const { sourceExts } = resolver;
config.transformer.babelTransformerPath = require.resolve(
  "react-native-css-transformer"
);
config.transformer.minifierConfig.compress.drop_console = true;
config.resolver = {
  sourceExts: [...sourceExts, "css", "mjs", "cjs"],
  blacklistRE: [/#current-cloud-backend\/.*/],
};

module.exports = config;

