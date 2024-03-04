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
});