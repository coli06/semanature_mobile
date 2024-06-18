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
import { getParcoursContents } from "../../../utils/queries";

class CodeCesar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newText: Cesar(NormalizeStrings(this.props.currentGame.texteBrut), parseInt(this.props.currentGame.decalage)),
            isSoundLoaded: false,
            sound: null,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.loadSound();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.unloadSound();
    }

    handleBackButtonClick() {
        return true;
    }

    handleInputTextChange = (input) => {
        this.setState({ decoded: input });
    }

    async loadSound() {
        const { son_url } = this.props.currentGame;
        if (son_url && son_url !== '') {
            const { sound } = await Audio.Sound.createAsync(
                { uri: son_url },
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
    return <CodeCesar {...props} navigation={navigation} />;
}
