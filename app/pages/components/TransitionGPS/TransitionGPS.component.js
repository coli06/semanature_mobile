import React, { Component } from 'react';
import { View, Text, Image, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import styles from './TransitionGPS.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import { parseText } from '../../../utils/parseText';

class TransitionGPS extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            sound: null
        };
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
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: currentGame.audio_url }
                );
                this.setState({ sound: newSound });
                await newSound.playAsync();
            } catch (error) {
                console.error('Error loading sound:', error);
            }
        }
    }

    render() {
        const title = this.props.currentGame.nom;
        const icone = require('./../../../assets/transition_gps_icone.png');
        const paragraph = parseText(this.props.currentGame.texte);
        const illustration = this.props.currentGame.image_url;
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description}>{paragraph}</Text>
                            {(illustration !== '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            {currentGame.audio_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <NextPage
                            pageName="GamePage"
                            parameters={{ parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours }}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <TransitionGPS {...props} navigation={navigation} />;
}
