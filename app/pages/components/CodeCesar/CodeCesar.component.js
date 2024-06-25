import React, { Component } from 'react';
import { View, Text, Image, BackHandler, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling
import styles from './CodeCesar.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component'
import Cesar from './Chiffrage';
import NextPage from '../NextPage/NextPage.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';
import * as FileSystem from 'expo-file-system';


class CodeCesar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newText: Cesar(NormalizeStrings(this.props.currentGame.texteBrut), parseInt(this.props.currentGame.decalage)),
            audio: null
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

    handleInputTextChange = (input) => {
        this.setState({ decoded: input });
    }

    render() {
        const { question, nom, etape_max, n_etape, image_url } = this.props.currentGame;
        const topBarreName = etape_max ? `Étape : ${n_etape}/${etape_max}` : '';

        const icone = require('./../../../assets/code_cesar_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={nom} icone={icone} />
                            {image_url !== '' && <Image source={{ uri: image_url }} style={styles.areaImage} />}
                            <Text style={styles.description}>{question}</Text>
                            <Text style={styles.encodedText}>{this.state.newText}</Text>
                            <TextInput style={styles.inputTextField} onChangeText={this.handleInputTextChange} editable={true} placeholder="CODE" />
                            {this.props.currentGame.audio_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                            
                        <View style={styles.rightAlign}>
                            <NextPage
                                pageName={"GameOutcomePage"}
                                parameters={{
                                    parcoursInfo: this.props.parcoursInfo,
                                    parcours: this.props.parcours,
                                    currentGame: this.props.currentGame,
                                    win: this.state.decoded !== undefined && NormalizeStrings(this.state.decoded) === NormalizeStrings(this.props.currentGame.texteBrut),
                                }}
                                text="Valider"
                                blockButton={true}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <CodeCesar {...props} navigation={navigation} />;
}
