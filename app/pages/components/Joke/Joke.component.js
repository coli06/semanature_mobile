import React, { Component, useEffect } from 'react';
import { View, Text, Image, BackHandler, ScrollView } from 'react-native';
import styles from './Joke.component.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';
import {getParcoursContents} from "../../../utils/queries";

class JokePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            communesData: null,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    // empêche le retour en arrière
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
        const maxEtape = communesData ?? "-";
        if (maxEtape.max_etape === undefined)
            var TopBarreName = "";
        else
            var TopBarreName = "Etape : " + this.props.currentGame.n_etape + "/" + maxEtape.max_etape;
        // données à afficher
        const paragraph = this.props.currentGame.texte;
        const title = this.props.currentGame.nom;
        const illustration = this.props.currentGame.image_url;
        const icone = require('./../../../assets/blague_icone.png');
        // affichage
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description}> {paragraph} </Text>
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

// wrapper du component dans une fonction
export default function (props) {
    return <JokePage {...props} />
}