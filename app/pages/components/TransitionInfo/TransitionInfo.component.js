import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, BackHandler, ScrollView } from 'react-native';
import styles from './TransitionInfo.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextPage from './../../components/NextPage/NextPage.component'
import { useNavigation } from '@react-navigation/native';
import { parseText } from '../../../utils/parseText';
import {db} from "../../../config/firebaseConfig";
import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getParcoursFromCommune,
    getAllCommunes,
    getParcoursContents,
    getAllDataFromCollection, displayParcoursForCommune
} from "../../../utils/queries";
import loadParcoursLocally from "../../../utils/loadParcoursLocally";


class TransitionInfo extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        const { parcours } = this.props;
        const size = parcours.length;
        console.log(parcours[size-1].parcoursId)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        return true;
    }

    render() {
        const paragraph = parseText(this.props.currentGame.texte);
        const title = this.props.currentGame.nom;
        const illustration = this.props.currentGame.image_url;
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }
        console.log(etapeMax);
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <Text style={styles.title}>{title}</Text>
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

export default function (props) {
    const navigation = useNavigation();
    return <TransitionInfo {...props} navigation={navigation} />
}
//<Image source={illustration} style={styles.image} />
