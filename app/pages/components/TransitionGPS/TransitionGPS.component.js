import React, { Component, useEffect } from 'react';
import { View, Text, Image, BackHandler, ScrollView } from 'react-native';
import styles from './TransitionGPS.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import NextPage from './../../components/NextPage/NextPage.component'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import { parseText } from '../../../utils/parseText';
import { getParcoursContents } from "../../../utils/queries";

class TransitionGPS extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
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
    return <TransitionGPS {...props} navigation={navigation} />
}

//<Image source={{ uri: this.props.currentGame.image_url }} style={styles.areaImage} />
