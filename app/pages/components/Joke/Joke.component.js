import React, { Component } from 'react';
import { View, Text, Image, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import styles from './Joke.component.style';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';

class JokePage extends Component {
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
                            <MainTitle title={title} icone={currentGame.audio_url ? icone : null} />
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
                            parameters={{ parcoursInfo, parcours }}
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
