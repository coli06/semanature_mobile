import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './InfoLogoText.component.style.js';
import theme from '../../styles/theme.style.js';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
//import Ionicon from '@expo/vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Ce composant permet d'afficher une information accompagnée d'une icône
 */
class InfoLogoText extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { text, iconName, iconCollection } = this.props
		return (
            <View style={styles.container}>
                {iconCollection == "Ionicons" && (<IonIcon name={iconName} color={theme.PRIMARY_COLOR} size={20}/>)}
                {iconCollection == "MaterialCommunityIcons" && (<MCIcon name={iconName} color={theme.PRIMARY_COLOR} size={20}/>)}
                {iconCollection == "MaterialIcons" && (<MaterialIcon name={iconName} color={theme.PRIMARY_COLOR} size={20}/>)}
                <Text style={iconCollection == "Ionicons" ? styles.extraSpaceText : styles.text}>{text}</Text>
			</View>
		);
	}
}

export default InfoLogoText;