import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import styles from './Principes.component.style';


class Principes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
            <View style={styles.globalContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                <Text style={styles.title}>Principes</Text>
                <Text style={styles.text}>
                « Scrute la Nature » est un jeu de piste qui t’amène à la rencontre des êtres vivants qui t’entourent.{'\n'}{'\n'}
                Pour cela rien de plus simple :{'\n'}{'\n'}
                Sélectionne la commune de ton choix, puis un parcours et laisse-toi guider. Attention : une fois le
                parcours commencé, tu ne pourras pas revenir en arrière sur tes réponses. Pense donc bien à activer
                ta mémoire. A la fin, ton score apparaîtra et tu pourras recommencer le parcours autant de fois que
                tu le souhaites pour devenir un véritable expert.{'\n'}{'\n'}
                Pour jouer hors ligne : il faut d’abord télécharger le parcours une première fois sur son téléphone en
                étant connecté. Ensuite, hors-ligne, tu peux sélectionner ton parcours et jouer !{'\n'}{'\n'}
                Important : Tu partages cet espace naturel avec d'autres êtres vivants ! Merci de respecter le lieu
                dans lequel tu es. La nature te remercie.
                </Text>
                </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    return <Principes />;
}
