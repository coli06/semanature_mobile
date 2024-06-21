import { StyleSheet } from 'react-native';
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    globalContainer: {
        ...common.globalContainer,
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

    description: {
        ...common.description,
    },

    title: {
        ...common.title,
    },
    
    activityIndicator: {
        ...common.activityIndicator,
    },
    
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: "center",
    },

    parcoursCardList: {
        marginTop: 10,
        minWidth: '100%',
    }
})