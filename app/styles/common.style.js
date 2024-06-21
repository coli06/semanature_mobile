import { StyleSheet, Dimensions } from 'react-native';
import theme from '../styles/theme.style.js'

export default StyleSheet.create({

	bouton: {
		padding: 10,
		margin: 10,
		borderRadius: 30,
		backgroundColor: theme.PRIMARY_COLOR,
		alignItems: 'center',
	},

	boutonText: {
		color: "white",
		textAlign: 'center',
		fontSize: theme.FONT_SIZE_LARGE,
		fontWeight: theme.FONT_WEIGHT_BOLD,
	},

	activityIndicator: {
		color: theme.PRIMARY_COLOR,
	},

	areaImage: {
		alignSelf: 'center',
		resizeMode: 'contain',
		minWidth: Dimensions.get('window').width * 0.8,
		minHeight: Dimensions.get('window').height * 0.3,
		marginBottom: 10,
		marginTop: 10,
	},

	title: {
		color: '#000000',
		fontSize: theme.FONT_SIZE_LARGE,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		padding: 10,
		marginHorizontal: 10,
		marginBottom: 15,
		marginTop: 5,
	},

	MainTitle: {
		color: '#000000',
		fontSize: 36,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'justify',
		padding: 10,
		margin: 10,
	},

	description: {
		color: '#000000',
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_LIGHT,
		padding: 5,
		margin: 5,
		textAlign: 'justify',
	},

	card: {
		backgroundColor: theme.LIGHT_GRAY_COLOR,
		width: '95%',
		borderRadius: 30,
		marginVertical: 5,
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		alignSelf: 'center',
	},

	cardBegin: {
		paddingVertical: theme.CONTAINER_PADDING,
		backgroundColor: theme.LIGHT_GRAY_COLOR,
		width: '90%',
		borderRadius: 30,
		marginVertical: 20,
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: -1,

	},

	globalContainer: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		alignItems: 'center',
		flexBasis: 1,
		flexWrap: 'nowrap',
	},

	gameArea: {
		flex: 1,
		width: '95%',
		height: '30%',
		resizeMode: 'contain',
	},

	inputText: {
		color: '#000000',
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_LIGHT,
		padding: 5,
	},

	scrollViewContainer: {
		paddingBottom: 300,
		alignItems: 'center',
	},

	scrollView: {
		minWidth: '100%',
	},

	inputTextField: {
		color: '#000000',
		fontSize: theme.FONT_SIZE_LARGE,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'justify',
		borderColor: '#000000',
		borderWidth: 1,
		marginBottom: 50,
		borderRadius: 20,
		padding: 10,
		margin: 10,
		marginLeft: 20,
		paddingRight: 50,
	},

	rightAlign: {
		width: '100%',
		alignItems: 'flex-end'
	},

	outsideSafeArea: {
		backgroundColor: theme.SECONDARY_COLOR,
		flex: 1,
	},

	globalContainerScroll: {
		backgroundColor: theme.SECONDARY_COLOR,
	},

	iconTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	parcoursCardList: {
        minWidth: '100%',
	}

});