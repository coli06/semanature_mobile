import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling
import styles from './FindSilhouette.component.style.js'; // Import your style file
import TopBarre from '../../../components/TopBarre/TopBarre.component.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import * as FileSystem from 'expo-file-system';

class FindSilhouette extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            audio: null // State to hold the loaded sound
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

    handleConfirmClicked = () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }
    }

    render() {
        const { title, icone, question, image_url, images_tab, audio_url } = this.props.currentGame;

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Trouver silhouette" />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description}>{question}</Text>
                            {audio_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()} disabled={this.state.confirmClicked}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                            <Image source={{ uri: image_url }} style={styles.areaImage} />
                            <View style={styles.gameZone}>
                                <View style={styles.rowFlex}>
                                    {images_tab.map((image, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.bouton}
                                            disabled={this.state.confirmClicked}
                                            onPress={() => {
                                                this.handleConfirmClicked();
                                                var win = this.props.currentGame.index_bonneReponse === index ? 1 : 0;
                                                this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                            }}
                                        >
                                            <View style={styles.imageContainer}>
                                                <Image source={{ uri: image }} style={styles.image} />
                                            </View>
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
    return <FindSilhouette {...props} navigation={navigation} />;
}
