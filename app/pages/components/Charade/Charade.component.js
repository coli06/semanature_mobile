import React, { Component, useEffect } from 'react';
import { View, Text, Image, BackHandler, TextInput, ScrollView } from 'react-native';
import styles from './Charade.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component'
import { useNavigation } from '@react-navigation/native';
import NextPage from '../NextPage/NextPage.component';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getParcoursContents} from "../../../utils/queries";

class Charade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposition: "",
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        const { parcours } = this.props;
        const size = parcours.length;
        console.log(parcours[size-1].parcoursId)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        return true;
    }

    handleInputTextChange = (input) => this.setState({ proposition: input }) // Proposition de l'utilisateur

    render() {
        const paragraph = this.props.currentGame.texte;
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }

        const charade = this.props.currentGame.charade;
        const reponse = NormalizeStrings(this.props.currentGame.reponse);
        const title = this.props.currentGame.nom;
        const illustration = this.props.currentGame.image_url
        console.log(this.props.parcours.size);
        const icone = require('./../../../assets/charade_icone.png');
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description} >{charade}</Text>
                            <TextInput style={styles.inputTextField} onChangeText={this.handleInputTextChange} editable={true} placeholder='RÉPONSE' />
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
    return <Charade {...props} navigation={navigation} />
}

