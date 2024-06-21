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
		const monitorStorageUsage = async () => {
			const keys = await AsyncStorage.getAllKeys();
			console.log(keys);
			const items = await AsyncStorage.multiGet(keys);
			let totalSize = 0;
			items.forEach(([key, value]) => {
			  totalSize += key.length + value.length;
			});
		  
			console.log(`Total storage usage: ${totalSize} bytes`);
		  };
		  
		  // Call this function to log storage usage
		  monitorStorageUsage();		  
	}, []);
	return <LPOMobApp />;
};

export default App;