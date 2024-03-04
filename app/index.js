import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './routes/Navigation'
import { autoSignIn } from './config/firebaseConfig';


class LPOMobApp extends Component {
	render() {
		return (
			<NavigationContainer>

				<Navigation
				/>
			</NavigationContainer>
		);
	}
}

export default function () {
	autoSignIn();
	return <LPOMobApp />
}