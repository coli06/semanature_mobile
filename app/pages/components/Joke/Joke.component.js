import React, { Component } from 'react';
import { View, Text, Image, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import styles from './Joke.component.style';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';
import * as FileSystem from 'expo-file-system';

class JokePage extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
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
    
    handleBackButtonClick() {
        return true;
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

    render() {
        const { currentGame, parcoursInfo, parcours } = this.props;
        const etapeMax = parcoursInfo.etape_max;
        const topBarreName = etapeMax === undefined ? "" : `Étape : ${currentGame.n_etape}/${etapeMax}`;
        const paragraph = currentGame.texte;
        const title = currentGame.nom;
        const illustration = currentGame.image_url;
        const icone = require('./../../../assets/blague_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            {illustration !== '' && <Image source={{ uri: illustration }} style={styles.areaImage} />}
                            <Text style={styles.description}>{paragraph}</Text>
                            {currentGame.audio_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <NextPage
                            pageName="GamePage"
                            parameters={{ parcoursInfo: parcoursInfo, parcours: parcours }}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    return <JokePage {...props} />
}
