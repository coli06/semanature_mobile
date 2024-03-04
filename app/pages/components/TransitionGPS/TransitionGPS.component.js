import React, { Component, useEffect } from 'react';
import { View, Text, Image, BackHandler, ScrollView } from 'react-native';
import styles from './TransitionGPS.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import { parseText } from '../../../utils/parseText';
import {getParcoursContents} from "../../../utils/queries";

class TransitionGPS extends Component {
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
        const paragraph = parseText(this.props.currentGame.texte);
        const { communesData } = this.state;
        const title = this.props.currentGame.nom;
        const illustration = this.props.currentGame.image_url;
        const maxEtape = communesData ?? "-";
        if (maxEtape.max_etape === undefined)
            var TopBarreName = "";
        else
            var TopBarreName = "Etape : " + this.props.currentGame.n_etape + "/" + maxEtape.max_etape;
        const icone = require('./../../../assets/transition_gps_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description}>{paragraph}</Text>
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
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
    return <TransitionGPS {...props} navigation={navigation} />
}

//<Image source={{ uri: this.props.currentGame.image_url }} style={styles.areaImage} />
