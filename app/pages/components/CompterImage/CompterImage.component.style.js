import { StyleSheet } from 'react-native';
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    card: {
        ...common.card
    },
    title: {
        ...common.title
    },
    globalContainer: {
        ...common.globalContainer,
    },
    areaImage: {
        ...common.areaImage,
    },
    inputText: {
        ...common.title,
        borderColor: '#000000',
        borderWidth: 2,
        margin: 10,
        marginTop: 40,
        borderRadius: 10,
        paddingBottom: 5,
        paddingRight: 50,
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
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    rightAlign: {
        ...common.rightAlign,
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
        alignItems: 'center'
    },
    audioButtonText: {
        fontSize: 20,
    }
});