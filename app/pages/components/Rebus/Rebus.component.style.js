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
    scrollViewContainer: {
        ...common.scrollViewContainer,
    },
    rightAlign: {
        ...common.rightAlign,
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
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
});