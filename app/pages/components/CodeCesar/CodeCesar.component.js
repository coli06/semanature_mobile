import React, { Component } from 'react';
import { View, Text, Image, BackHandler, TextInput, ScrollView } from 'react-native';
import styles from './CodeCesar.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component'
import { useNavigation } from '@react-navigation/native';
import Cesar from './Chiffrage';
import NextPage from '../NextPage/NextPage.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';
import {getParcoursContents} from "../../../utils/queries";

/** 
 * Classe du component pour le jeu Code César
 */
class CodeCesar extends Component {
    constructor(props) {
        super(props);
        // récupère le texte initial et le décalage puis retient le texte crypté dans 'newText'.
        this.state = {
            newText: Cesar(NormalizeStrings(this.props.currentGame.texteBrut), parseInt(this.props.currentGame.decalage)),
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

    /**
     * Permet de bloquer le retour arrière
     * @returns 
     */
    handleBackButtonClick() {
        return true;
    }

    /**
     * Permet de se souvenir de l'entrée de l'utilisateur
     * @param {*} input 
     * @returns 
     */
    handleInputTextChange = (input) => this.setState({ decoded: input })

    render() {
        const question = this.props.currentGame.question;
        const title = this.props.currentGame.nom;
        const etapeMax = this.props.parcoursInfo.etape_max;
        if (etapeMax === undefined) {
            var topBarreName = "";
        } else {
            var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
        }

        const icone = require('./../../../assets/code_cesar_icone.png');
        const illustration = this.props.currentGame.image_url;

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={topBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} styel={styles.scrollView}>
                        <View style={styles.card}>

                            <MainTitle title={title} icone={icone} />
                            {(illustration !== '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description} >{question}</Text>
                            <Text style={styles.encodedText} >{this.state.newText}</Text>
                            <TextInput style={styles.inputTextField} onChangeText={this.handleInputTextChange} editable={true} placeholder="CODE" />

                        </View>
                        <View style={styles.rightAlign}>
                            <NextPage pageName={"GameOutcomePage"}
                                parameters={{
                                    parcoursInfo: this.props.parcoursInfo,
                                    parcours: this.props.parcours,
                                    currentGame: this.props.currentGame,
                                    // la condition détermine si l'entrée de l'utilisateur correspond au message initial
                                    win: this.state.decoded !== undefined && NormalizeStrings(this.state.decoded) === NormalizeStrings(this.props.currentGame.texteBrut),
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
    return <CodeCesar {...props} navigation={navigation} />
}

