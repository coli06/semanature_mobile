import React, { Component, useEffect } from 'react';
import { View, Text, Image, BackHandler, TextInput, ScrollView } from 'react-native';
import styles from './CompterImage.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';

import NextPage from './../../components/NextPage/NextPage.component'
import { useNavigation } from '@react-navigation/native';
import {getParcoursContents} from "../../../utils/queries";

class CompterImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            communesData: null,
            reponse: this.props.currentGame.reponse
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

    handleInputTextChange = (input) => this.setState({ value: input })

    render() {
        const result = this.props.currentGame.reponse;
        const paragraph = this.props.currentGame.texte;
        const title = this.props.currentGame.nom;
        const etapeMax = this.props.parcours.etape_max;
        if (etapeMax === undefined) {
            var TopBarreName = "";
        } else {
            var TopBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }
        const icone = require('./../../../assets/compter_image_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} styel={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Image source={{ uri: this.props.currentGame.image_url }} style={styles.areaImage} />
                            <Text style={styles.description}>{paragraph}</Text>
                            <TextInput style={styles.inputTextField} onChangeText={this.handleInputTextChange} value={this.state.value} keyboardType='numeric' placeholder="NOMBRE" />
                        </View>
                        <View style={styles.rightAlign}>
                            <NextPage pageName={"GameOutcomePage"}
                                parameters={{
                                    parcours: this.props.parcours, currentGame: this.props.currentGame,
                                    win: parseInt(this.state.value) == parseInt(result),
                                }}
                                text="Valider"
                                blockButton={true}
                            />
                        </View>
                    </ScrollView>
                </View >
            </SafeAreaView >
        );
    }
}

export default function (props) {
    const navigation = useNavigation();

    return <CompterImage {...props} navigation={navigation} />
}
