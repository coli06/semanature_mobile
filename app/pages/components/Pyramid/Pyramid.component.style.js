import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style';
import common from '../../../styles/common.style.js';

export default StyleSheet.create({
    card: {
        ...common.card,
    },
    title: {
        ...common.title,
    },
    globalContainer: {
        ...common.globalContainer,
    },
    areaImage: {
        ...common.areaImage,
    },
    bouton: {
        ...common.bouton,
    },
    boutonText: {
        ...common.boutonText,
    },
    circle: {
        ...common.boutonText,
        fontSize: theme.FONT_SIZE_LARGE,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) * 1,
        minWidth: Dimensions.get('window').width * 0.15,
        minHeight: Dimensions.get('window').width * 0.15,
        backgroundColor: theme.PRIMARY_COLOR,
        padding: 10,
        margin: 10,
    },
    circleLine: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    gameArea: {
        //minHeight: '100%',
        padding: 10,
    },
    description: {
        ...common.description,
    },
    rightAlign: {
        width: '100%',
        alignItems: 'flex-end'
    },

    scrollViewContainer: {
        ...common.scrollViewContainer,
    },
    scrollView: {
        ...common.scrollView,
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    audioButton: {
        ...common.audioButton,
    },
    audioButtonText: {
        ...common.audioButtonText,
    }

});