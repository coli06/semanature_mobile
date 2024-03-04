import { StyleSheet } from 'react-native';
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    card: {
        ...common.card
    },
    title: {
        ...common.title
    },
    description: {
        ...common.description
    },
    globalContainer: {
        ...common.globalContainer
    },
    image: {
        ...common.areaImage,
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    links: {
        ...common.description,
        color: 'blue',
    },
    scrollViewContainer: {
        ...common.scrollViewContainer
    },
    scrollView: {
        ...common.scrollView
    },
});