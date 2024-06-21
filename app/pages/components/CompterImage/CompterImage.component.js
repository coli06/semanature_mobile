import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling
import styles from './CompterImage.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NextPage from './../../components/NextPage/NextPage.component';
import { getParcoursContents } from "../../../utils/queries";

class CompterImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            reponse: this.props.currentGame.reponse,
            isSoundLoaded: false,
            sound: null,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.loadSound(); // Load the sound when component mounts
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.unloadSound(); // Unload the sound when component unmounts
    }

    handleBackButtonClick() {
        return true;
    }

    handleInputTextChange = (input) => this.setState({ value: input });

    async loadSound() {
        const { audio_url } = this.props.currentGame;
        if (audio_url && audio_url !== '') {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audio_url },
                { shouldPlay: false }
            );
            this.setState({ sound, isSoundLoaded: true });
        }
    }

    async unloadSound() {
        if (this.state.sound) {
            await this.state.sound.unloadAsync();
        }
    }

    async playSound() {
        try {
            await this.state.sound.playAsync();
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    }

    render() {
        const { texte, nom, image_url } = this.props.currentGame;
        const etapeMax = this.props.parcoursInfo.etape_max;
        const topBarreName = etapeMax ? `Étape : ${this.props.currentGame.n_etape}/${etapeMax}` : '';
        const icone = require('./../../../assets/compter_image_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={nom} icone={icone} />
                            {image_url !== '' && <Image source={{ uri: image_url }} style={styles.areaImage} />}
                            <Text style={styles.description}>{texte}</Text>
                            <TextInput style={styles.inputTextField} onChangeText={this.handleInputTextChange} value={this.state.value} keyboardType='numeric' placeholder="NOMBRE" />
                        </View>
                        <View style={styles.rightAlign}>
                            <NextPage
                                pageName={"GameOutcomePage"}
                                parameters={{
                                    parcoursInfo: this.props.parcoursInfo,
                                    parcours: this.props.parcours,
                                    currentGame: this.props.currentGame,
                                    win: parseInt(this.state.value) === parseInt(this.state.reponse),
                                }}
                                text="Valider"
                                blockButton={true}
                            />
                            {this.state.isSoundLoaded && (
                                <TouchableOpacity
                                    style={styles.audioButton}
                                    onPress={() => this.playSound()}
                                >
                                    <Text style={styles.audioButtonText}>Play Sound</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <CompterImage {...props} navigation={navigation} />;
}
