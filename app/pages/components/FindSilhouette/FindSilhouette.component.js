import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling
import styles from './FindSilhouette.component.style.js'; // Import your style file
import TopBarre from '../../../components/TopBarre/TopBarre.component.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';

class FindSilhouette extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            sound: null, // State to hold the loaded sound
            hasAudio: false, // State to determine if audio should be displayed
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.checkAudioAvailability();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (this.state.sound) {
            this.state.sound.unloadAsync(); // Unload the sound when component unmounts
        }
    }

    handleBackButtonClick() {
        return true;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentGame.audio_url !== this.props.currentGame.audio_url) {
            this.checkAudioAvailability();
        }
    }

    checkAudioAvailability() {
        const { audio_url } = this.props.currentGame;
        const hasAudio = audio_url && audio_url.trim() !== '';
        this.setState({ hasAudio });
    }

    handleConfirmClicked = () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }
    }

    async playSound() {
        const { sound } = this.state;
        if (sound) {
            await sound.unloadAsync(); // Unload any previously loaded sound
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

    render() {
        const { title, icone, question, image_url, images_tab } = this.props.currentGame;
        const { hasAudio } = this.state;

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Trouver silhouette" />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={hasAudio ? icone : null} />
                            <Text style={styles.description}>{question}</Text>
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
                                {hasAudio && (
                                    <TouchableOpacity
                                        style={styles.audioButton}
                                        onPress={() => this.playSound()}
                                        disabled={this.state.confirmClicked}
                                    >
                                        <Text style={styles.audioButtonText}>Play Sound</Text>
                                    </TouchableOpacity>
                                )}
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
