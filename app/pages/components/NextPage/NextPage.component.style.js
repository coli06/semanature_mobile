import { StyleSheet } from 'react-native';
import common from '../../../styles/common.style';


export default StyleSheet.create({
    rightAlign: {
        ...common.rightAlign,
        flex: 1,
    },
    title: {
        ...common.title
    },
    bouton: {
        ...common.bouton,
    },
    boutonText: {
        ...common.boutonText,
        paddingHorizontal: 5,
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
});