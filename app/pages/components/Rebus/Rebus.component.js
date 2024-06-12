import React, { Component, useEffect } from 'react';
import { View, Text, Image, BackHandler, TextInput, ScrollView } from 'react-native';
import styles from './Rebus.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextPage from './../../components/NextPage/NextPage.component'
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';
import {getParcoursContents} from "../../../utils/queries";


class Rebus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposition: "",
            communesData: null
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        const { parcours } = this.props;
        const size = parcours.length;
        console.log(parcours[size-1].parcoursId)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        /* this.fetchCommunesData(parcours[size-1].parcoursId)
            .then(communesData => {
                this.setState({ communesData });
            })
            .catch(error => {
                console.error('Error fetching communes data:', error);
            }); */
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

    handleInputTextChange = (input) => this.setState({ proposition: input }) // Proposition de l'utilisateur

    render() {
        const question = this.props.currentGame.question;
        const reponse = NormalizeStrings(this.props.currentGame.reponse);
        const description = this.props.currentGame.description;
        const title = this.props.currentGame.nom;
        const etapeMax = this.props.parcours.etape_max;
        if (etapeMax === undefined) {
            var TopBarreName = "";
        } else {
            var TopBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }
        const icone = require('./../../../assets/rebus_icone.png');
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>

                            <MainTitle title={title} icone={icone} />
                            <Text style={styles.description} >{question}</Text>
                            <Text style={styles.description} >{description}</Text>
                            <Image source={{ uri: this.props.currentGame.image_url }} style={styles.areaImage} />
                            <TextInput style={styles.inputTextField} onChangeText={this.handleInputTextChange} editable={true} placeholder="RÉPONSE" />
                        </View>
                        <View style={styles.rightAlign}>
                            <NextPage pageName={"GameOutcomePage"}
                                parameters={{
                                    parcours: this.props.parcours, currentGame: this.props.currentGame,
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
    return <Rebus {...props} navigation={navigation} />
}

