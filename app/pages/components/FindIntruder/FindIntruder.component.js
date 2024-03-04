import React, { Component, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './FindIntruder.component.style.js'
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import {getParcoursContents} from "../../../utils/queries";

class FindIntruder extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            confirmClicked: false,
            communesData: null,};
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
        const illustration = this.props.currentGame.image_url;
        const maxEtape = communesData ?? "-";
        if (maxEtape.max_etape === undefined)
            var TopBarreName = "";
        else
            var TopBarreName = "Etape : " + this.props.currentGame.n_etape + "/" + maxEtape.max_etape;

        const title = this.currentGame.nom;
        // On affiche dans un premier temps la barre du haut (logo LPO + nom page +log SEM engagée)
        // Ensuite on affiche le titre, la description, et deux lignes avec sur chaque ligne une image qui est aussi un bouton. C'est sur l'image intrus
        // qu'il va falloir cliquer
        const icone = require('./../../../assets/trouver_l_intrus_icone.png');
        if (this.currentGame && this.currentGame.legende_tab){
            const legendeText0 = this.currentGame.legende_tab[0];
            const legendeText1 = this.currentGame.legende_tab[1];
            const legendeText2 = this.currentGame.legende_tab[2];
            const legendeText3 = this.currentGame.legende_tab[3];
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description} > {this.currentGame.question} </Text>
                            <View style={styles.gameArea}>
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
                                        <Image source={{ uri: this.currentGame.images_tab[0] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText0}</Text>
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
                                        <Image source={{ uri: this.currentGame.images_tab[1] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText1}</Text>
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
                                        <Image source={{ uri: this.currentGame.images_tab[2] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText2}</Text>
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
                                        <Image source={{ uri: this.currentGame.images_tab[3] }} style={styles.image} />
                                        <Text style={styles.legende}>{legendeText3}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description} > {this.currentGame.question} </Text>
                            <View style={styles.gameArea}>
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
                                        <Image source={{ uri: this.currentGame.images_tab[0] }} style={styles.image} />
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
                                        <Image source={{ uri: this.currentGame.images_tab[1] }} style={styles.image} />
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
                                        <Image source={{ uri: this.currentGame.images_tab[2] }} style={styles.image} />
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
                                        <Image source={{ uri: this.currentGame.images_tab[3] }} style={styles.image} />
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
}

export default function (props) {
    const navigation = useNavigation();
    return <FindIntruder {...props} navigation={navigation} />
}