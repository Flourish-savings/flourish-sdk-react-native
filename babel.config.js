export const presets = [
  'module:metro-react-native-babel-preset',
  'module:react-native-dotenv',
];
export const plugins = [
  ["module:react-native-dotenv", {
    "envName": "APP_ENV",
    "moduleName": "@env",
    "path": ".env",
    "blocklist": null,
    "allowlist": null,
    "safe": false,
    "allowUndefined": true,
    "verbose": false
  }]
];
