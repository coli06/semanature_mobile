import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../styles/theme.style';
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    card: {
        ...common.card,
        backgroundColor: theme.BACKGROUND_COLOR_WHITE
    },
    title: {
        ...common.title
    },
    globalContainer: {
        ...common.globalContainer,
    },
    areaImage: {
        ...common.areaImage,
        maxWidth: Dimensions.get('window').width * 0.75,
        maxHeight: Dimensions.get('window').height * 0.3,
        marginBottom: 0,
        resizeMode: 'contain',
    },
    inputTextField: {
        ...common.inputTextField
    },
    bouton: {
        ...common.bouton,
    },
    boutonText: {
        ...common.boutonText,
    },
    description: {
        ...common.description,
        fontSize: theme.FONT_SIZE_LARGE
    },
    scrollViewContainer: {
        ...common.scrollViewContainer
    },
    scrollView: {
        ...common.scrollView
    },
    rightAlign: {
        ...common.rightAlign,
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    rowFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        maxHeight: Dimensions.get('window').height * 0.3,
    },
    areaImageRow: {
        alignSelf: 'center',
        resizeMode: 'contain',
        maxWidth: Dimensions.get('window').width * 0.35,
        maxHeight: Dimensions.get('window').height * 0.3,
        marginBottom: 0,
        resizeMode: 'contain',
    },
    whiteBlock: {
        minWidth: Dimensions.get('window').width * 0.05,
    }
});