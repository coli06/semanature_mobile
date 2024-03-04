import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style';
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: theme.CONTAINER_PADDING,

        alignItems: 'center',
        width: '100%',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.LIGHT_GRAY_COLOR,
        borderRadius: 30,
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    textInputStyle: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    parcoursSeparator: {
        flex: 1
    },
    touchableItem: {
        backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
        paddingHorizontal: 10,
    },
    textAreaStyle: {
        fontSize: theme.FONT_SIZE_LARGE,
        padding: 10,
        textAlign: 'left',
    },
    searchStyle: {
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    title: {
        ...common.title
    }
});