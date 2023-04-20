module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
      ignore: ['**/*.test.js'],
    },
    development: {
      plugins: [
        [
          'module:react-native-dotenv',
          {
            moduleName: '@env',
            path: '.env',
            blocklist: null,
            allowlist: null,
            safe: false,
            allowUndefined: true,
          },
        ],
      ],
    },
    // Ajouter cette configuration pour forcer l'utilisation du polyfill
    force: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
      ignore: ['**/*.test.js'],
    },
  },
};
