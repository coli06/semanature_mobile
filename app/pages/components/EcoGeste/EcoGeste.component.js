import React, { Component } from 'react';
import { View, Text, Image, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';
import styles from './EcoGeste.component.style';
import { getParcoursContents } from "../../../utils/queries";
import { parseText } from '../../../utils/parseText';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling

class EcoGeste extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const paragraph = parseText(this.props.currentGame.texte);
        const title = this.props.currentGame.nom;
        const illustration = this.props.currentGame.image_url;
        const etapeMax = this.props.parcoursInfo.etape_max;
        const topBarreName = etapeMax ? `Étape : ${this.props.currentGame.n_etape}/${etapeMax}` : '';
        const icone = require('./../../../assets/le_saviez_vous_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            {(illustration !== '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description}>{paragraph}</Text>
                        </View>
                        <NextPage
                            pageName="GamePage"
                            parameters={{
                                parcoursInfo: this.props.parcoursInfo,
                                parcours: this.props.parcours,
                            }}
                        />
                        {this.state.isSoundLoaded && (
                            <TouchableOpacity
                                style={styles.audioButton}
                                onPress={() => this.playSound()}
                            >
                                <Text style={styles.audioButtonText}>Play Sound</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    return <EcoGeste {...props} />;
}
