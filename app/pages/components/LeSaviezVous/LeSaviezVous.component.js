import React, { Component } from 'react';
import { View, Text, Image, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import styles from './LeSaviezVous.component.style';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';
import { parseText } from '../../../utils/parseText';

class LeSaviezVous extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: null,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
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

    render() {
        const { currentGame, parcoursInfo, parcours } = this.props;
        const etapeMax = parcoursInfo.etape_max;
        const topBarreName = etapeMax === undefined ? "" : `Étape : ${currentGame.n_etape}/${etapeMax}`;
        const title = currentGame.nom;
        const icone = require('./../../../assets/le_saviez_vous_icone.png');
        const paragraph = parseText(currentGame.texte);
        const illustration = currentGame.image_url;
        const hasAudio = currentGame.audio_url && currentGame.audio_url.trim() !== '';

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={hasAudio ? icone : null} />
                            {illustration !== '' && <Image source={{ uri: illustration }} style={styles.areaImage} />}
                            <Text style={styles.description}>{paragraph}</Text>
                            {hasAudio && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <NextPage
                            pageName="GamePage"
                            parameters={{ parcoursInfo, parcours }}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

// Wrapper component
export default function (props) {
    return <LeSaviezVous {...props} />;
}
