import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style.js'

export default StyleSheet.create({
	barreContainer: {
		padding: 10,
		backgroundColor: theme.SECONDARY_COLOR,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
	},
	text: {
		color: theme.PRIMARY_COLOR,
		fontSize: theme.FONT_SIZE_TITLE,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center',
	},
	icone: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
		position: 'absolute',
		left: 7,
	}
});