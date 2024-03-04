import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import styles from './Credit.component.style.js';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';

class Credit extends Component {
    render() {
        const PlaceholderLogoLPOAura = require('./../../../assets/logo_LPO_credits.png');
        const PlaceholderLogoSEM = require('./../../../assets/logo_st_etienne_metropole.png');
        const PlaceholderLogoTSE = require('./../../../assets/logo_Telecom_St_Etienne.png');
        const PlaceholderLogoOel = require('./../../../assets/logo_Oelie_Sainte.jpg');
        const PlaceholderLogoLPOFr = require('./../../../assets/logo_LPO.png');
        const PlaceholderLogoFrN = require('./../../../assets/logo_France_Nature.png');
        const PlaceholderLogoFrK = require('./../../../assets/logo_France_Kit.png');
        const PlaceholderLogoOFB = require('./../../../assets/logo_OFB_actualite.jpg');
        return (

            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Crédits" />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <Text style={styles.title}>Un jeu conçu et édité par: </Text>
                            <Text style={styles.description} >La LPO AuRA en partenariat avec l'école d'ingénieurs Télécom</Text>
                            <View style={styles.gameArea}>
                                <Image source={PlaceholderLogoLPOAura} style={styles.areaImage} />
                                <Image source={PlaceholderLogoTSE} style={styles.areaImage} />
                            </View>
                            <Text style={styles.description}>Graphiques: C.Rousse - LPO France - L'OISEAU MAG Junior</Text>
                            <Text style={styles.description}>Application réalisée dans le cadre de l’Atlas de la biodiversité Intercommunal (ABI) de Saint-Etienne Métropôle, projet en partenariat avec FNE et la LPO</Text>
                            <View style={styles.gameArea}>
                                <Image source={PlaceholderLogoSEM} style={styles.areaImage} />
                                <View style={styles.rowFlex}>
                                    <Image source={PlaceholderLogoFrN} style={styles.areaImageRow} />
                                    <View style={styles.whiteBlock} />
                                    <Image source={PlaceholderLogoLPOFr} style={styles.areaImageRow} />
                                </View>
                            </View>
                            <Text style={styles.description}>Jeu soutenu financièrement par: </Text>
                            <View style={styles.gameArea}>
                                <Image source={PlaceholderLogoFrK} style={styles.areaImage} />
                                <Image source={PlaceholderLogoOFB} style={styles.areaImage} />
                                <Image source={PlaceholderLogoOel} style={styles.areaImage} />
                            </View>
                        </View>

                    </ScrollView>
                </View >
            </SafeAreaView >
        );
    }
}

export default Credit;