import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './TopBarre.component.style'

/**
 * Créer une barre en haut de la page pour afficher le nom de la page, passé en paramètre, ainsi que les icones de la LPO et SEM métropole
 */
class TopBarre extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const PlaceholderImage = require('./../../assets/logo_LPO.png');
		const PlaceholderLogoSEM = require('./../../assets/logo_SM.png');
		const { name } = this.props;
		return (
			<View style={styles.barreContainer}>
				<Image source={PlaceholderImage} style={styles.icone} />

				<Text style={styles.text}>
					{name}
				</Text>
			</View>
		);
	}
}

export default TopBarre;