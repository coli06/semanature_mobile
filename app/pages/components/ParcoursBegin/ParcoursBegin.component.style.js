import { StyleSheet } from 'react-native';
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    title: {
        ...common.title,
    },

    card: {
        ...common.cardBegin,
    },

    description: {
        ...common.description,
    },

    bouton: {
        ...common.bouton,
    },

    bouton2: {
		...common.bouton,
		width:180,
        height:50,
		alignSelf: 'center',
	},

    globalContainer: {
        ...common.globalContainer,
    },

    outsideSafeArea: {
        ...common.outsideSafeArea,
    },

    image: {
        resizeMode: 'contain',
        height:260,
        width : "100%",
    },

    activityIndicator: {
        ...common.activityIndicator,
    }
})