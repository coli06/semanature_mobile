import React, { Component } from 'react';
import { View, Text, Image, BackHandler, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling
import styles from './Charade.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextPage from '../NextPage/NextPage.component';

class Charade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposition: "",
            sound: null, // State to hold the loaded sound
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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

    handleInputTextChange = (input) => this.setState({ proposition: input }) // User's input

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
        const { nom, image_url, charade, n_etape } = this.props.currentGame;
        const { etape_max } = this.props.parcoursInfo;
        const topBarreName = etape_max !== undefined ? `Étape : ${n_etape}/${etape_max}` : "";

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={nom} icone={require('./../../../assets/charade_icone.png')} />
                            {image_url !== '' && <Image source={{ uri: image_url }} style={styles.areaImage} />}
                            <Text style={styles.description}>{charade}</Text>
                            <TextInput
                                style={styles.inputTextField}
                                onChangeText={this.handleInputTextChange}
                                editable={true}
                                placeholder='RÉPONSE'
                            />
                            {this.props.currentGame.audio_url && this.props.currentGame.audio_url.trim() !== '' && (
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
                                    win: NormalizeStrings(this.state.proposition) === NormalizeStrings(this.props.currentGame.reponse),
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
    return <Charade {...props} navigation={navigation} />;
}
