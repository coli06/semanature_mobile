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
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }
        const title = this.currentGame.nom
        const icone = require('./../../../assets/qcm_icone.png');
        const illustration = this.props.currentGame.image_url;
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
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
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
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
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
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
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
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
                                            this.props.navigation.navigate("GameOutcomePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
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