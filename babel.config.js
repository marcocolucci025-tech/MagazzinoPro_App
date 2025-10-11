module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Se usi react-native-reanimated, tieni questa riga:
      'react-native-reanimated/plugin',
    ],
  };
};
