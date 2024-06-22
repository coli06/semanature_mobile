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
    map: {
        width: '100%',
        height: '50%',
        alignSelf: 'flex-start',
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    description: {
        ...common.description,
    },
    scrollViewContainer: {
        ...common.scrollViewContainer
    },
    scrollView: {
        ...common.scrollView
    },
    audioButton: {
        ...common.audioButton,
    },
    audioButtonText: {
        ...common.audioButtonText,
    }
});
