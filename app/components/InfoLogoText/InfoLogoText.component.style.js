import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style.js'

export default StyleSheet.create({
    container: {
		backgroundColor: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        borderRadius: 30,
        paddingVertical: 7.5,
        paddingRight: 15,
        paddingLeft: 10,
        marginHorizontal: 8,
    },

    text: {
        fontWeight: theme.FONT_WEIGHT_BOLD,
        color: theme.PRIMARY_COLOR,
		textAlign: 'center',
        marginLeft: 7.5,        
    },

    extraSpaceText: {
        fontWeight: theme.FONT_WEIGHT_BOLD,
        color: theme.PRIMARY_COLOR,
		textAlign: 'center',
        marginLeft: 10,
    }
});