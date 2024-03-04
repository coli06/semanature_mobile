import { StyleSheet, Dimensions } from 'react-native';
import common from '../../../styles/common.style.js';
import theme from '../../../styles/theme.style';



export default StyleSheet.create({
    globalContainer: {
        ...common.globalContainer,
    },
    text: {
        color: '#000000',
        fontSize: theme.FONT_SIZE_MEDIUM,
        textAlign: 'justify',
        width: Dimensions.get('window').width * 0.9,
        padding: 3,
    },

    title: {
        ...common.title,
        marginTop: 15
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
})
