import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Qcm.component.style.js'
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import {getParcoursContents} from "../../../utils/queries";


class Qcm extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            communesData: null
        };
    }

    componentDidMount() {
        const { parcours } = this.props;
        const size = parcours.length;
        console.log(parcours[size-1].parcoursId)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.fetchCommunesData(parcours[size-1].parcoursId)
            .then(communesData => {
                this.setState({ communesData });
            })
            .catch(error => {
                console.error('Error fetching communes data:', error);
            });
    }
    fetchCommunesData(id) {
        return getParcoursContents(id)
            .then(communesData => {
                return communesData.general;
            })
            .catch(error => {
                console.error('Error fetching communes data:', error);
                return null; // or some default value if an error occurs
            });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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

    render() {
        const { communesData } = this.state;
        const paragraph = this.props.currentGame.texte;
        const maxEtape = communesData ?? "-";
        if (maxEtape.max_etape === undefined)
            var TopBarreName = "";
        else
            var TopBarreName = "Etape : " + this.props.currentGame.n_etape + "/" + maxEtape.max_etape;
        const title = this.currentGame.nom
        const icone = require('./../../../assets/qcm_icone.png');
        const illustration = this.props.currentGame.image_url;
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description} > {this.currentGame.question} </Text>
                            <View style={styles.gameZone}>
                                <View style={styles.rowFlex}>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = 0;
                                            if (this.currentGame.index_bonneReponse == 0) {
                                                win = 1;
                                            }
                                            this.props.navigation.navigate("GameOutcomePage", { parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
                                        }}>
                                        <Text adjustsFontSizeToFit={true} style={styles.boutonText}> {this.currentGame.reponses_tab[0]} </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = 0;
                                            if (this.currentGame.index_bonneReponse == 1) {
                                                win = 1;
                                            }
                                            this.props.navigation.navigate("GameOutcomePage", { parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
                                        }}>
                                        <Text adjustsFontSizeToFit={true} style={styles.boutonText}> {this.currentGame.reponses_tab[1]} </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.rowFlex}>
                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = 0;
                                            if (this.currentGame.index_bonneReponse == 2) {
                                                win = 1;
                                            }
                                            this.props.navigation.navigate("GameOutcomePage", { parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
                                        }}>
                                        <Text adjustsFontSizeToFit={true} style={styles.boutonText}> {this.currentGame.reponses_tab[2]} </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.bouton}
                                        disabled={this.state.confirmClicked}
                                        onPress={() => {
                                            this.handleConfirmClicked();
                                            var win = 0;
                                            if (this.currentGame.index_bonneReponse == 3) {
                                                win = 1;
                                            }
                                            this.props.navigation.navigate("GameOutcomePage", { parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
                                        }}>
                                        <Text adjustsFontSizeToFit={true} style={styles.boutonText}> {this.currentGame.reponses_tab[3]} </Text>
                                    </TouchableOpacity>
                                </View>
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
    return <Qcm {...props} navigation={navigation} />
}