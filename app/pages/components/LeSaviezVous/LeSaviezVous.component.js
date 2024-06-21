import React, { Component, useEffect } from 'react';
import { View, Text, Image, BackHandler, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import styles from './LeSaviezVous.component.style';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NextPage from './../../components/NextPage/NextPage.component';
import { parseText } from '../../../utils/parseText';
import {getParcoursContents} from "../../../utils/queries";

class LeSaviezVous extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    // empêche le retour en arrière
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
        // données à afficher
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }

        // données à afficher
        const title = this.props.currentGame.nom;
        const icone = require('./../../../assets/le_saviez_vous_icone.png');
        const paragraph = parseText(this.props.currentGame.texte);
        const illustration = this.props.currentGame.image_url;
        
        // affichage
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description}>{paragraph}</Text>
                        </View>
                        <NextPage
                            pageName="GamePage"
                            parameters={{ parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours }}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

// wrapper du component
export default function (props) {
    return <LeSaviezVous {...props} />
}
