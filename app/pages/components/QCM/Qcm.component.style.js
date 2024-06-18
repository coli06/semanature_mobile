import { Dimensions, StyleSheet } from 'react-native';
import theme from './../../../styles/theme.style'
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    title: {
        ...common.title
    },
    globalContainer: {
        ...common.globalContainer,
    },
    description: {
        ...common.description,
    },
    bouton: {
        ...common.bouton,
        flex: 1,
        flexGrow: 1,
        margin: 5,
    },
    card: {
        ...common.card,
    },
    boutonText: {
        ...common.boutonText,
        fontSize: theme.FONT_SIZE_MEDIUM,
    },
    areaImage: {
        ...common.areaImage,
    },
    rowFlex: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
    },
    gameZone: {
        minHeight: '20%',
        alignSelf: 'center',
        alignItems: 'center',
        maxHeight: Dimensions.get('window').height * 0.2
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    scrollViewContainer: {
        ...common.scrollViewContainer
    },
    scrollView: {
        ...common.scrollView
    },
    audioButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        alignItems: 'center',
    },
    audioButtonText: {
        fontSize: 20,
    }

})