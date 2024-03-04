import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style.js'

export default StyleSheet.create({
	barreContainer: {
		padding: 10,
		backgroundColor: theme.SECONDARY_COLOR,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	text: {
		color: theme.PRIMARY_COLOR,
		fontSize: theme.FONT_SIZE_TITLE,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'justify',
	},
	icone: {
		width: 46,
		height: 46,
		resizeMode: 'contain',
	}
});