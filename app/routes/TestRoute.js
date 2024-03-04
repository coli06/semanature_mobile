import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreditPage from '../pages/Credit.page'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles/theme.style';

const Tab = createBottomTabNavigator();

function TestRoute() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: theme.SECONDARY_COLOR
				},
				tabBarItemStyle: {
					marginTop: 5
				},
				tabBarActiveTintColor: 'green',
				tabBarInactiveTintColor: 'gray'
			}}
		>
			<Tab.Screen
				name="Credits"
				component={CreditPage}
				options={{
					tabBarIcon: () => (
						<Icon name="information" color={theme.PRIMARY_COLOR} size={30} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default TestRoute;