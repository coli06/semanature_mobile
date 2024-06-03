import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Home.component.style';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';


import TopBarre from './../../../components/TopBarre/TopBarre.component';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const PlaceholderLPO = require('./../../../assets/logo_LPO_credits.png');
        const PlaceholderOiseauMagJunior = require('./../../../assets/oiseau-magJ.png');
        const MesangeImage = require('./../../../assets/parcours_begin_icone.png');
        const navigation = this.props.navigation;
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Accueil" />
                <ScrollView style={styles.scrollView}>
                <View style={styles.globalContainer}>
                    <Text style={styles.MainTitle}>Scrute la nature</Text>
                    <View style={styles.card}>
                        <Text style={styles.title}>
                            Le royaume du vivant est menacé.
                        </Text>
                        <Text style={styles.description}>
                            Choisissez votre commune, partez à la découverte de ses habitants, découvrez de superbes coins de nature, déjouez les mauvais tours, résolvez les énigmes et rétablissez l’équilibre !
                        </Text>
                        <Text style={styles.description}>
                            À vos marques, prêts, partez !
                        </Text>
                        <View style={styles.gameArea}>
                        <Image source={MesangeImage} style={styles.areaImage} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SearchCommunePage");
                            }} style={styles.bouton}>
                            <Text style={styles.boutonText}>Choisir une commune</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("PrincipesPage");
                            }} style={styles.bouton}>
                            <Text style={styles.boutonText}>Principes</Text>
                        </TouchableOpacity>
                        <Text style={styles.small_info}>
                            Cet outil a été créé lors de l’ABI (Atlas de la Biodiversité Intercommunal) de Saint-Étienne Métropole.
                        </Text>
                    </View>
                    <View style={styles.gameArea}>
                        <Image source={PlaceholderLPO} style={styles.areaImage} />
                        <Image source={PlaceholderOiseauMagJunior} style={styles.areaImage} />
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}

export default function (props) {
    const navigation = useNavigation();
    return <Home {...props} navigation={navigation} />;
}