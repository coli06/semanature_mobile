import React, { Component, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './routes/Navigation'
import { autoSignIn } from './config/firebaseConfig';
import LogRocket from '@logrocket/react-native';

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
		LogRocket.init('z4zajy/scrute-la-nature-debug');
		autoSignIn();
	}, []);
	return <LPOMobApp />;
};

export default App;