import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import styles from './TransitionInfo.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextPage from './../../components/NextPage/NextPage.component'
import { useNavigation } from '@react-navigation/native';
import { parseText } from '../../../utils/parseText';
import { Audio } from 'expo-av';

class TransitionInfo extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            sound: null
        };
    }

    componentDidMount() {
        const { parcours } = this.props;
        const size = parcours.length;
        console.log(parcours[size-1].parcoursId)
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
        if (currentGame.son_url) {
            const { sound } = await Audio.Sound.createAsync(
                { uri: currentGame.son_url }
            );
            this.setState({ sound });
            await sound.playAsync();
        }
    }

    render() {
        const paragraph = parseText(this.props.currentGame.texte);
        const title = this.props.currentGame.nom;
        const illustration = this.props.currentGame.image_url;
        const etapeMax = this.props.parcoursInfo.etape_max;
        let topBarreName = etapeMax === undefined ? "" : `Étape : ${this.props.currentGame.n_etape}/${etapeMax}`;
        
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <Text style={styles.title}>{title}</Text>
                            {illustration !== '' && <Image source={{ uri: illustration }} style={styles.areaImage} />}
                            <Text style={styles.description}>{paragraph}</Text>
                            {this.props.currentGame.son_url && (
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
    return <TransitionInfo {...props} navigation={navigation} />
}
