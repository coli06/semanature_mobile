import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './MainTitle.component.style.js';

class MainTitle extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { title } = this.props
		const { icone } = this.props
		return (
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.title}>{title}</Text>
				<Image style={styles.icone} source={icone} />
			</View>
		);
	}
}

export default MainTitle;