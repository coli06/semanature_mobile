import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import styles from './Pyramid.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { useNavigation } from '@react-navigation/native';
import generateValues from './generateValues';
import CircleLine from './CircleLine'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import { Audio } from 'expo-av';

class Pyramid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastCircleValue: '',
            sound: null,
            confirmClicked: false,
            s: generateValues(this.props.currentGame.nombre)
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        const { parcours } = this.props;
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

    handleConfirmClicked = () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }
    }

    handleInputTextChange = (input) => this.setState({ lastCircleValue: input })

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
        const question = this.props.currentGame.question;
        const title = this.props.currentGame.nom;
        const result = this.props.currentGame.nombre;
        const illustration = this.props.currentGame.image_url;
        const etapeMax = this.props.parcoursInfo.etape_max;
        const topBarreName = etapeMax === undefined ? "" : `Étape : ${this.props.currentGame.n_etape}/${etapeMax}`;
        const textRegles = "Remplir la pyramide jusqu'en bas selon le principe suivant : chaque case vide doit contenir la somme des deux cases qui se trouvent au-dessus";
        const icone = require('./../../../assets/calcul_pyramidal_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>

                            <MainTitle title={title} icone={icone} />
                            {illustration !== '' && <Image source={{ uri: illustration }} style={styles.areaImage} />}
                            <Text style={styles.description}>{textRegles}</Text>
                            <Text style={styles.description}>{question}</Text>

                            <View style={styles.gameArea}>
                                <CircleLine count={4} edit={false} preFill={true} s={this.state.s} />
                                <CircleLine count={3} edit={true} preFill={false} />
                                <CircleLine count={2} edit={true} preFill={false} />
                                <CircleLine count={1} edit={true} onChangeText={this.handleInputTextChange} value={this.state.lastCircleValue} preFill={false} />
                            </View>

                            {this.props.currentGame.audio_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                        <View style={styles.rightAlign}>
                            <TouchableOpacity style={styles.bouton}
                                disabled={this.state.confirmClicked}
                                onPress={() => {
                                    this.handleConfirmClicked();

                                    // Logic to validate the answer
                                    var win = 0;
                                    var newResult = parseInt(String(result).substring(0, 2), 10);
                                    if (Math.trunc(newResult) === 0) {
                                        newResult *= 10;
                                    }
                                    if (parseInt(this.state.lastCircleValue) === newResult) {
                                        win = 1;
                                    }

                                    // Navigate to the outcome page
                                    this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
                                }}>
                                <Text style={styles.boutonText}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Pyramid {...props} navigation={navigation} />
}
