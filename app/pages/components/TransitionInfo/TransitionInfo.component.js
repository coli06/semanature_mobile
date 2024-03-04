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
        this.state = {
            communesData: null,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        const { parcours } = this.props;
        const size = parcours.length;
        console.log(parcours[size-1].parcoursId)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.fetchCommunesData(parcours[size-1].parcoursId)
            .then(communesData => {
                this.setState({ communesData });
            })
            .catch(error => {
                console.error('Error fetching communes data:', error);
            });
    }
    fetchCommunesData(id) {
        return getParcoursContents(id)
            .then(communesData => {
                return communesData.general;
            })
            .catch(error => {
                console.error('Error fetching communes data:', error);
                return null; // or some default value if an error occurs
            });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        return true;
    }


    render() {
        const { communesData } = this.state;
        const paragraph = parseText(this.props.currentGame.texte);
        const title = this.props.currentGame.nom;
        const illustration = this.props.currentGame.image_url;
        const maxEtape = communesData ?? "-";
        if (maxEtape.max_etape === undefined)
            var TopBarreName = "";
        else
            var TopBarreName = "Etape : " + this.props.currentGame.n_etape + "/" + maxEtape.max_etape;

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <Text style={styles.title}>{title}</Text>
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description}>{paragraph}</Text>
                        </View>
                        <NextPage
                            pageName="GamePage"
                            parameters={{ parcours: this.props.parcours }}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    /*useEffect(() => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                    return true;
            })
    },[]);
    */
    return <TransitionInfo {...props} navigation={navigation} />
}
//<Image source={illustration} style={styles.image} />
