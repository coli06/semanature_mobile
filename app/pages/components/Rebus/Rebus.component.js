import React, { Component } from 'react';
import { View, Text, Image, BackHandler, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import styles from './Rebus.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';


class Rebus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposition: "",
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

    handleInputTextChange = (input) => {
        this.setState({ proposition: input });
    }

    async playSound() {
        const { sound } = this.state;
        if (sound) {
            await sound.unloadAsync();
        }
        const { currentGame } = this.props;
        if (currentGame.son_url) {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: currentGame.son_url }
                );
                this.setState({ sound: newSound });
                await newSound.playAsync();
            } catch (error) {
                console.error('Error loading sound:', error);
            }
        }
    }

    render() {
        const question = this.props.currentGame.question;
        const reponse = NormalizeStrings(this.props.currentGame.reponse);
        const description = this.props.currentGame.description;
        const title = this.props.currentGame.nom;
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }
        const icone = require('./../../../assets/rebus_icone.png');
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description} >{question}</Text>
                            <Text style={styles.description} >{description}</Text>
                            <Image source={{ uri: this.props.currentGame.image_url }} style={styles.areaImage} />
                            {currentGame.son_url && (
                                <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                                    <Text style={styles.audioButtonText}>🔊</Text>
                                </TouchableOpacity>
                            )}
                            <TextInput
                                style={styles.inputTextField}
                                onChangeText={this.handleInputTextChange}
                                editable={true}
                                placeholder="RÉPONSE"
                            />
                        </View>
                        <View style={styles.rightAlign}>
                            <NextPage
                                pageName={"GameOutcomePage"}
                                parameters={{
                                    parcoursInfo: this.props.parcoursInfo,
                                    parcours: this.props.parcours,
                                    currentGame: this.props.currentGame,
                                    win: NormalizeStrings(this.state.proposition) == reponse,
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
    return <Rebus {...props} navigation={navigation} />;
}
