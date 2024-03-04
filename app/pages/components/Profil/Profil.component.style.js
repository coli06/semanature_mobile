import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style';
import common from '../../../styles/common.style.js';


export default StyleSheet.create({
    card: {
        ...common.card,
        marginBottom: 0
    },
    scrollViewContainer: {
        ...common.scrollViewContainer,
    },
    scrollView: {
        ...common.scrollView,
    },
    globalContainer: {
        ...common.globalContainer,
    },
    title: {
        ...common.title,
        marginTop: 15
    },
    title_inter: {
        color: '#000000',
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontWeight: theme.FONT_WEIGHT_BOLD,
        textAlign: 'justify',
        padding: 5,
    },
    text: {
        color: '#000000',
        fontSize: theme.FONT_SIZE_MEDIUM,
        width: Dimensions.get('window').width * 0.9,
        textAlign: 'justify',
        padding: 3,
    },
    textBis: {
        color: '#000000',
        fontSize: theme.FONT_SIZE_MEDIUM,
        width: Dimensions.get('window').width * 0.9,
        textAlign: 'left',
        padding: 3,
    },
    textBold: {
        color: '#000000',
        fontSize: theme.FONT_SIZE_MEDIUM,
        textAlign: 'justify',
        padding: 3,
        fontWeight: theme.FONT_WEIGHT_BOLD
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    bouton: {
        ...common.bouton,
    },
    boutonText: {
        ...common.boutonText,
    },
    iconTextContainer: {
        ...common.iconTextContainer
    },

});