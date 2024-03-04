const obfuscatingTransformer = require("react-native-obfuscating-transformer");

module.exports = obfuscatingTransformer({
	/* Insert here any required configuration */

	// offusque TOUT les fichiers
	filter: (filename, source) => true
});