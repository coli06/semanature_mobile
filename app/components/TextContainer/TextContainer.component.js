import React, { Component } from 'react';
import { View, Text } from 'react-native';
import txtstyles from './TextContainer.component.style.js';

/**
 * Ce composant permet d'afficher du texte de manière homogénéisée
 */
class TextContainer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { text } = this.props
		const { style } = this.props
		return (
			<View style={txtstyles.container}>
				<Text style={style}>{text}</Text>
			</View>
		);
	}
}

export default TextContainer;