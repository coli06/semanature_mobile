import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style.js'


export default StyleSheet.create({
	container: {
		padding: theme.CONTAINER_PADDING,
	},
	text: {
		color: '#000000',
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_MEDIUM,
		textAlign: 'justify'
	}
});