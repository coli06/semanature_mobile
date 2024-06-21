import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import styles from './FindIntruder.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';

class FindIntruder extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            sound: null,
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

    currentGame = this.props.currentGame;

    handleConfirmClicked = () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }
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
        const etapeMax = this.props.parcoursInfo.etape_max;
        const hasAudio = this.currentGame.audio_url && this.currentGame.audio_url.trim() !== '';

        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }

        const title = this.currentGame.nom;
        const icone = hasAudio ? require('./../../../assets/trouver_l_intrus_icone.png') : null;

        const legendeText0 = this.currentGame.legende_tab ? this.currentGame.legende_tab[0] : '';
        const legendeText1 = this.currentGame.legende_tab ? this.currentGame.legende_tab[1] : '';
        const legendeText2 = this.currentGame.legende_tab ? this.currentGame.legende_tab[2] : '';
        const legendeText3 = this.currentGame.legende_tab ? this.currentGame.legende_tab[3] : '';

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description}>{this.currentGame.question}</Text>
                            <View style={styles.gameArea}>
                                <View style={styles.rowFlex}>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse === 0 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[0] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse === 1 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[1] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText1}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowFlex}>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse === 2 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[2] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText2}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = this.currentGame.index_bonneReponse === 3 ? 1 : 0;
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win });
                                        }}>
                                        <Image source={{ uri: this.currentGame.images_tab[3] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText3}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {hasAudio && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                <Text style={styles.audioButtonText}>🔊</Text>
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
    return <FindIntruder {...props} navigation={navigation} />;
}
