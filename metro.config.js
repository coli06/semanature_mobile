// Learn more https://docs.expo.io/guides/customizing-metro
/*const { getDefaultConfig } = require('expo/metro-config');
let defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer = {
	getTransformOptions: async () => ({
		transform: {
			experimentalImportSupport: false,
			inlineRequires: false,
		},
	}),
};
module.exports = defaultConfig;*/

const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);