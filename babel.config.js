module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "react-native-classname-to-style",
      [
        "react-native-platform-specific-extensions",
        {
          extensions: ["css", "ttf", "png"],
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
          },
        },
      ],
    ],
  };
};