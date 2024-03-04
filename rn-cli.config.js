module.exports = {
	getTransformModulePath() {
		return require.resolve("./transformer")
	},
}