module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Se usi react-native-reanimated, lascia questa riga
      'react-native-reanimated/plugin',
    ],
  };
};
