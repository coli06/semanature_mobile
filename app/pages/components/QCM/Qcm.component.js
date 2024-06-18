import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from Expo AV for sound handling
import styles from './Qcm.component.style.js';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import { getParcoursContents } from "../../../utils/queries";

class Qcm extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            sound: null, // State variable to hold the sound object
        };
    }

    componentDidMount() {
        const { parcours } = this.props;
        const size = parcours.length;
        console.log(parcours[size - 1].parcoursId);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        // Unload the sound when component is unmounted
        if (this.state.sound) {
            this.state.sound.unloadAsync();
        }
    }

    handleBackButtonClick() {
        return true;
    }

    currentGame = this.props.currentGame;

    handleConfirmClicked = async () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }

        // Check if son_url exists and is not blank
        const son_url = this.props.currentGame.son_url;
        if (son_url && son_url !== '') {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: son_url } // Load sound from the provided URL
                );
                this.setState({ sound: newSound }, () => newSound.playAsync()); // Play the loaded sound
            } catch (error) {
                console.error('Error loading sound:', error);
            }
        }
    }

    render() {
        const etapeMax = this.props.parcoursInfo.etape_max;
        const topBarreName = etapeMax ? `Étape : ${this.props.currentGame.n_etape}/${etapeMax}` : '';
        const title = this.currentGame.nom;
        const icone = require('./../../../assets/qcm_icone.png');
        const illustration = this.props.currentGame.image_url;

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            {illustration !== '' && <Image source={{ uri: illustration }} style={styles.areaImage} />}
                            <Text style={styles.description}>{this.currentGame.question}</Text>
                            <View style={styles.gameZone}>
                                <View style={styles.rowFlex}>
                                    {this.currentGame.reponses_tab.map((reponse, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.bouton}
                                            disabled={this.state.confirmClicked}
                                            onPress={() => {
                                                this.handleConfirmClicked();
                                                const win = index === this.currentGame.index_bonneReponse ? 1 : 0;
                                                this.props.navigation.navigate("GameOutcomePage", {
                                                    parcoursInfo: this.props.parcoursInfo,
                                                    parcours: this.props.parcours,
                                                    currentGame: this.props.currentGame,
                                                    win: win
                                                });
                                            }}>
                                            <Text adjustsFontSizeToFit={true} style={styles.boutonText}>{reponse}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Qcm {...props} navigation={navigation} />
}
