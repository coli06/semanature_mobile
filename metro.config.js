// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
let defaultConfig = getDefaultConfig(__dirname);
defaultConfig.transformer = {
	getTransformModulePath: () => {
		return require.resolve('./transformer');
	},
	getTransformOptions: async () => ({
		transform: {
			experimentalImportSupport: false,
			inlineRequires: false,
		},
	}),
};
module.exports = defaultConfig;