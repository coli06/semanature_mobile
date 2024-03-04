import { StyleSheet, Dimensions } from 'react-native';
import common from '../../styles/common.style.js'

export default StyleSheet.create({

	title: {
		...common.title,
		flex: 1,
	},

	icone: {
		...common.areaImage,
		alignSelf: "flex-start",
		flex: 1,
		minWidth: Dimensions.get('window').width * 0.2,
		minHeight: Dimensions.get('window').height * 0.075,
		maxWidth: Dimensions.get('window').width * 0.2,
		maxHeight: Dimensions.get('window').width * 0.075,
		marginBottom: 0,
		resizeMode: 'contain',
	},
	container: {
		flexDirection: 'row',
	}

})