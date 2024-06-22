import { StyleSheet, Dimensions } from 'react-native';
import theme from './../../../styles/theme.style'
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    title: {
        ...common.title,
    },
    globalContainer: {
        ...common.globalContainer,
    },
    description: {
        ...common.description,
    },
    bouton: {
        ...common.bouton,
        backgroundColor: theme.LIGHT_GRAY_COLOR,
        margin: 0,
        padding: 0,
        maxWidth: '100%', // Assurez-vous que le bouton ne dépasse pas le conteneur
        },
    card: {
        ...common.card,
    },
    imageContainer: {

        minWidth: '100%',
        height: '100%',
        padding: 0,
        margin: 0,
    },
    rowFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        maxHeight: Dimensions.get('window').height * 0.3,
    },
    gameArea: {
        height: Dimensions.get('window').height * 0.4,
        justifyContent: 'space-between',
    },
    image: {
        ...common.areaImage,
        minHeight: Dimensions.get('window').width * 0.3,
        minWidth: Dimensions.get('window').width * 0.4,
        //resizeMode: 'contain',
        width: '100%', // Adaptez l'image à la largeur du bouton
        resizeMode: 'contain' // Gardez les proportions de l'image

    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    scrollViewContainer: {
      ...common.scrollViewContainer
    },
    scrollView: {
      ...common.scrollView
    },
    legende: {
        color: '#000000',
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_LIGHT,
		textAlign: 'justify',
        maxWidth: '100%', // Empêche la légende de dépasser le bouton
    },
    audioButton: {
        ...common.audioButton,
    },
    audioButtonText: {
        ...common.audioButtonText,
    }
})