import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Linking, ScrollView } from 'react-native';
import styles from './FinParcours.components.style';

import TopBarre from './../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import { getParcoursFromCommuneLocally } from '../../../utils/loadParcoursLocally';
import saveParcours, { saveObject, saveGameHistory } from '../../../components/ParcoursCard/saveParcours';

class FinParcoursPage extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        const score = this.props.currentGame.score;
        const scoremax = this.props.currentGame.score_max
        const parcoursId = this.props.currentGame.parcoursId

        // sauvegarde du score (et du score max si pas encore sauvegardé)
        getParcoursFromCommuneLocally(props.parcours.commune).then((parcours) => {
            parcours = parcours.filter((item) => item.identifiant === parcoursId);
            if (parcours == null) {
                return;
            }
            if (parcours.general.score == null) {
                parcours.general.score = score;
                parcours.general.score_max = scoremax;
            } else {
                parcours.general.score = Math.min(Math.max(score, parcours.general.score), scoremax);
                parcours.general.score_max = scoremax;
            }
            saveObject(parcoursId, JSON.stringify(parcours));
            console.log("score : ", score);
            console.log("scoremax : ", scoremax);
            console.log("parcours.general.score : ", parcours.general.score);
            console.log("parcours.general.score_max : ", parcours.general.score_max);
            saveGameHistory(parcours, score);
        })
    }

    // empêche le retour en arrière de la page
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        return true;
    }

    render() {
        const icone = require('./../../../assets/fin_parcours_icone.png');
        const score = this.props.currentGame.score;
        const scoremax = this.props.currentGame.score_max
        const parcoursId = this.props.currentGame.parcoursId
        const title = "Félicitations !"
        let txt = "Vous avez obtenu " + score + " sur " + scoremax;

        // affichage de la page
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Fin de parcours" />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description}>{txt}</Text>
                            <Text style={styles.description}>{'Partez à l’exploration des autres parcours ! Ils ont tous leurs propres trucs et astuces pour favoriser le vivant et préserver nos ressources !'}</Text>
                            <Text style={styles.description}>{'Ou'}</Text>
                            <Text style={styles.description}>{'Allez sur ces sites internet :'}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL('https://auvergne-rhone-alpes.lpo.fr/s-engager/ ')}>
                                <Text style={styles.links}>
                                    LPO Auvergne-Rhône-Alpes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://engageepourlanature.saint-etienne-metropole.fr/citoyens/ ')}>
                                <Text style={styles.links}>
                                    Saint-Étienne Métropole engagée pour la nature
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://www.ofb.gouv.fr/grand-public-et-citoyens')}>
                                <Text style={styles.links}>
                                    Office Français de la Biodiversité
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://www.oelie-eau.fr/eau-et-environnement/respecter-lenvironnement')}>
                                <Text style={styles.links}>
                                    Maison de l'eau
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <NextPage
                            pageName="HomePage"
                            parameters={{ parcours: this.props.parcours }}
                            text="Retour accueil"
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <FinParcoursPage {...props} navigation={navigation} />
}