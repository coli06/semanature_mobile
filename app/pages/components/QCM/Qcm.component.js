import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import styles from './Qcm.component.style.js';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';

class Qcm extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            sound: null, 
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
        if (this.state.sound) {
            this.state.sound.unloadAsync();
        }
    }

    handleBackButtonClick() {
        return true;
    }

    async playSound() {
        const { sound } = this.state;
        if (sound) {
            await sound.unloadAsync();
        }
        const { currentGame } = this.props;
        if (currentGame.audio_url) {
            const { sound } = await Audio.Sound.createAsync(
                { uri: currentGame.audio_url }
            );
            this.setState({ sound });
            await sound.playAsync();
        }
    }

    handleConfirmClicked = async () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }

        const audio_url = this.props.currentGame.audio_url;
        if (audio_url && audio_url !== '') {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: audio_url }
                );
                this.setState({ sound: newSound }, () => newSound.playAsync());
            } catch (error) {
                console.error('Error loading sound:', error);
            }
        }
    }

    render() {
        const etapeMax = this.props.parcoursInfo.etape_max;
        const topBarreName = etapeMax ? `Étape : ${this.props.currentGame.n_etape}/${etapeMax}` : '';
        const title = this.props.currentGame.nom;
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
                            <Text style={styles.description}>{this.props.currentGame.question}</Text>
                            {this.props.currentGame.audio_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                            <View style={styles.gameZone}>
                                <View style={styles.rowFlex}>
                                    {this.props.currentGame.reponses_tab.map((reponse, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.bouton}
                                            disabled={this.state.confirmClicked}
                                            onPress={() => {
                                                this.handleConfirmClicked();
                                                const win = index === this.props.currentGame.index_bonneReponse ? 1 : 0;
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
