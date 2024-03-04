import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../styles/theme.style';
import common from '../../../styles/common.style';

export default StyleSheet.create({
    card: {
        ...common.card,
        marginBottom: 0
    },
    MainTitle: {
        ...common.MainTitle
    },
    title: {
        ...common.title
    },
    titleBis: {
        ...common.title,
        fontSize: theme.FONT_SIZE_SMALL
    },
    globalContainer: {
        ...common.globalContainer,
    },
    bouton: {
        ...common.bouton,
    },
    boutonText: {
        ...common.boutonText,
    },
    areaImage: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: Dimensions.get('window').height * 0.15,
        maxWidth: Dimensions.get('window').width * 0.3,
        marginBottom: 0,
        marginTop: 0,
    },
    gameArea: {
        flexDirection: 'row',
        marginBottom: 0,
        marginTop: 0,
        alignItems: 'center'
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
        ...common.scrollView,
        backgroundColor:'white'
    },
    small_info: {
        ...common.description,
        fontSize: theme.FONT_SIZE_SMALL,
        width:Dimensions.get('window').width * 0.95,
    }
});
