import React, { Component } from 'react';
import { View, Text} from 'react-native';
import styles from './Map.component.style.js';
import { useNavigation } from '@react-navigation/native';

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Recherchez la commune où vous souhaitez effectuer un parcours</Text>
                <Text style={styles.text}>Fonctionnalité à venir !</Text>
            </View>
        );
    }
}


/** Barre de recherche de commune, pour accéder à la page de choix de parcours de cette commune.
 * 
*/
export default function (props) {
    // gère le changement de page
    const navigation = useNavigation();

    // wrapper du component dans une fonction
    return <Map {...props}
        navigation={navigation}
    />;
}

