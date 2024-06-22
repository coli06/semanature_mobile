import React, { Component, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './routes/Navigation'
import { autoSignIn } from './config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LPOMobApp extends Component {
	render() {
		return (
			<NavigationContainer>
				<Navigation/>
			</NavigationContainer>
		);
	}
}

const App = () => {
	useEffect(() => {
		autoSignIn();	  
	}, []);
	return <LPOMobApp />;
};

export default App;