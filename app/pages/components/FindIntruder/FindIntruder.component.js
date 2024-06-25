import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import styles from './FindIntruder.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import * as FileSystem from 'expo-file-system';

class FindIntruder extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            audio: null
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.loadAudio();
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        const { audio } = this.state;
        if (audio) {
            audio.unloadAsync();
            const fileUri = FileSystem.documentDirectory + 'temp_audio.mp3';
            FileSystem.deleteAsync(fileUri).catch(error => console.warn('Error deleting temporary audio file :', error.message));
        }
    }

    async loadAudio() {
        const audioURL = this.props.currentGame.audio_url;
        if (audioURL && audioURL !== '') {
            const { audio } = this.state;
            if (audio) {
                await audio.unloadAsync();
            }

            // Write the base64 string to a temporary file
            const fileUri = FileSystem.documentDirectory + 'temp_audio.mp3';
            await FileSystem.writeAsStringAsync(fileUri, audioURL, {
                encoding: FileSystem.EncodingType.Base64,
            });

           // Load the audio
            const newAudio = await Audio.Sound.createAsync(
                { uri: fileUri },
                { shouldPlay: false }
            );
            this.setState({ audio: newAudio.sound });
        }
    }

    async playSound() {
        const { audio } = this.state;
        if (audio) {
            console.log("playing audio");
            await audio.playAsync();
        }
    }

    handleBackButtonClick() {
        return true;
    }

    currentGame = this.props.currentGame;

    handleConfirmClicked = () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }
    }

    render() {
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }

        const title = this.currentGame.nom;
        const icone = require('./../../../assets/trouver_l_intrus_icone.png');

        const legendeText0 = this.currentGame.legende_tab ? this.currentGame.legende_tab[0] : '';
        const legendeText1 = this.currentGame.legende_tab ? this.currentGame.legende_tab[1] : '';
        const legendeText2 = this.currentGame.legende_tab ? this.currentGame.legende_tab[2] : '';
        const legendeText3 = this.currentGame.legende_tab ? this.currentGame.legende_tab[3] : '';

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description}>{this.currentGame.question}</Text>
                            {this.props.currentGame.audio_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                            <View style={styles.gameArea}>
                                <View style={styles.rowFlex}>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse == 0 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[0] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse == 1 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[1] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText1}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowFlex}>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse == 2 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[2] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText2}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse == 3 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[3] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText3}</Text>
                                    </TouchableOpacity>
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
    return <FindIntruder {...props} navigation={navigation} />;
}