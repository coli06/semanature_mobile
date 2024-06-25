import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GamePage from './../pages/Game.page'
import SearchCommunePage from './../pages/SearchCommune.page'
import ParcoursChoicePage from './../pages/ParcoursChoice.page.js'
import CreditPage from './../pages/Credit.page'
import LeSaviezVousPage from './../pages/LeSaviezVous.page';
import JokePage from './../pages/Joke.page';
import FinParcoursPage from '../pages/FinParcours.page';
import QcmPage from './../pages/Qcm.page';
import GameOutcomePage from './../pages/GameOutcome.page';
import CodeGamePage from './../pages/CodeGame.page';
import CodeCesarPage from './../pages/CodeCesar.page';
import TransitionGPSPage from './../pages/TransitionGPS.page';
import CGUPage from './../pages/CGU.page';
import ListeParcoursLocalPage from './../pages/ListeParcoursLocal.page';
import TransitionInfoPage from '../pages/TransitionInfo.page';
import CompterImagePage from '../pages/CompterImage.page';
import CharadePage from './../pages/Charade.page';
import RebusPage from './../pages/Rebus.page';
import HomePage from './../pages/Home.page';
import EcoGestePage from './../pages/EcoGeste.page';
import ParcoursBeginPage from '../pages/ParcoursBegin.page.js';
import MapPage from '../pages/Map.page.js';
import PrincipesPage from '../pages/Principes.page.js';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from './../styles/theme.style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PyramidPage from './../pages/Pyramid.page';
import FindIntruderPage from '../pages/FindIntruder.page';
import FindSilhouettePage from '../pages/FindSilhouette.page';
import HomeTab from '../pages/components/HomeTab/HomeTab.component.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/** Il s'agit du navigateur s'occupant des parcours
 *  Chaque type de page doit y être ajouté si cette dernière intervient dans un parcours
 * @returns 
 */

function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="HomePage"
				component={HomePage}
			/>
			<Stack.Screen
				name="SearchCommunePage"
				component={SearchCommunePage}
			/>
			<Stack.Screen
				name="PrincipesPage"
				component={PrincipesPage}
			/>
			<Stack.Screen
				name="CreditPage"
				component={CreditPage}

			/>
			<Stack.Screen
				name="ParcoursChoicePage"
				component={ParcoursChoicePage}
			/>
			<Stack.Screen
				name="GamePage"
				component={GamePage}
			/>
			<Stack.Screen
				name="LeSaviezVousPage"
				component={LeSaviezVousPage}
			/>
			<Stack.Screen
				name="JokePage"
				component={JokePage}
			/>
			<Stack.Screen
				name="FinParcoursPage"
				component={FinParcoursPage}
			/>

			<Stack.Screen
				name="QcmPage"
				component={QcmPage}
			/>
			<Stack.Screen
				name="GameOutcomePage"
				component={GameOutcomePage}
			/>
			<Stack.Screen
				name="FindIntruderPage"
				component={FindIntruderPage}
			/>

			<Stack.Screen
				name="PyramidPage"
				component={PyramidPage}
			/>
			<Stack.Screen
				name="CodeGamePage"
				component={CodeGamePage}
			/>
			<Stack.Screen
				name="CodeCesarPage"
				component={CodeCesarPage}
			/>
			<Stack.Screen
				name="TransitionGPSPage"
				component={TransitionGPSPage}
			/>
			<Stack.Screen
				name="CompterImagePage"
				component={CompterImagePage}
			/>
			<Stack.Screen
				name="TransitionInfoPage"
				component={TransitionInfoPage}
			/>
			<Stack.Screen
				name="CharadePage"
				component={CharadePage}
			/>
			<Stack.Screen
				name="RebusPage"
				component={RebusPage}
			/>
			<Stack.Screen
				name="FindSilhouettePage"
				component={FindSilhouettePage}
			/>
			<Stack.Screen
				name="EcoGestePage"
				component={EcoGestePage}
			/>

			<Stack.Screen
				name="ParcoursBeginPage"
				component={ParcoursBeginPage}
			/>
		</Stack.Navigator>

	)
}

/** Fonction s'occupant de la navigation de la barre en bas de l'écran.
 * Elle instancie également la navigation liée au parcours
 * 
 */
function Navigation(props) {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.SECONDARY_COLOR,
                },
                tabBarItemStyle: {
                    marginTop: 5,
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            }}
            initialRouteName='Accueil'
        >
            <Tab.Screen
                name="Crédits"
                component={CreditPage}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Icon name="information" color={theme.PRIMARY_COLOR} size={30}/>
                    ),
                }}
            />
            <Tab.Screen
                name="CGU"
                component={CGUPage}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Icon name="file-document-outline" color={theme.PRIMARY_COLOR} size={30}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Accueil"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <HomeTab focused={focused}/>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? 'white' : 'lightgray', fontSize:11 }}>
                            Accueil
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Parcours"
                component={ListeParcoursLocalPage}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Icon name="download" color={theme.PRIMARY_COLOR} size={30}/>
                    ),
                }}
            />

            <Tab.Screen
                name="Carte"
                component={MapPage}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Icon name="map" color={theme.PRIMARY_COLOR} size={30}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Navigation;