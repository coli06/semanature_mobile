import React, { Component, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './FindSilhouette.component.style.js'
import TopBarre from '../../../components/TopBarre/TopBarre.component.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';

class FindSilhouette extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = { confirmClicked: false };
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
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Trouver silhouette" />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description} >{this.currentGame.question}</Text>
                            <Image source={{ uri: this.props.currentGame.image_url }} style={styles.areaImage} />
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
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: this.currentGame.images_tab[0] }} style={styles.image} />
                                        </View>
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
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: this.currentGame.images_tab[1] }} style={styles.image} />
                                        </View>
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
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: this.currentGame.images_tab[2] }} style={styles.image} />
                                        </View>
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
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: this.currentGame.images_tab[3] }} style={styles.image} />
                                        </View>
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
    return <FindSilhouette {...props} navigation={navigation} />
}