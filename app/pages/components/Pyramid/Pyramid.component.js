import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import styles from './Pyramid.component.style';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { useNavigation } from '@react-navigation/native';
import generateValues from './generateValues';
import CircleLine from './CircleLine'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import {getParcoursContents} from "../../../utils/queries";


/**
 * Classe du component pour le jeu calcul pyramidale
 */
class Pyramid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastCircleValue: '',
            communesData: null};
        // initialise les valeurs des premiers cercles avec la fonction generateValues
        this.state = { s: generateValues(this.props.currentGame.nombre), confirmClicked: false };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

    handleConfirmClicked = () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }
    }

    handleInputTextChange = (input) => this.setState({ lastCircleValue: input })

  render() {
    const question = this.props.currentGame.question;
    const title = this.props.currentGame.nom;
    const result = this.props.currentGame.nombre;
    const illustration = this.props.currentGame.image_url;
    const { communesData } = this.state;
    const maxEtape = communesData ?? "-";
    if (maxEtape.max_etape === undefined)
      var TopBarreName = "";
    else
      var TopBarreName = "Etape : " + this.props.currentGame.n_etape + "/" + maxEtape.max_etape;
    const textRegles = "Règle : Remplir la pyramide jusqu'en bas selon le principe suivant : chaque case vide doit contenir la somme des deux cases qui se trouvent au-dessus"
    const icone = require('./../../../assets/calcul_pyramidal_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>

                            <MainTitle title={title} icone={icone} />
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={styles.description}>{textRegles}</Text>
                            <Text style={styles.description}>{question}</Text>


                            <View style={styles.gameArea}>

                                <CircleLine count={4} edit={false} preFill={true} s={this.state.s} />
                                <CircleLine count={3} edit={true} preFill={false} />
                                <CircleLine count={2} edit={true} preFill={false} />
                                <CircleLine count={1} edit={true} onChangeText={this.handleInputTextChange} value={this.state.lastCircleValue} preFill={false} />

                            </View>


                        </View>
                        <View style={styles.rightAlign}>
                            <TouchableOpacity style={styles.bouton}
                                disabled={this.state.confirmClicked}
                                onPress={() => {
                                    this.handleConfirmClicked();

                                    // dans la fonction generateValues, on récupère seulement les deux premières unités du résultat
                                    // pour que le résultat soit cohérent, il faut appliquer la même transformation ici
                                    var win = 0;
                                    var newResult = parseInt(String(result).substring(0, 2), 10);
                                    // de la même manière que dans generateValues, si le résultat est un chiffre, 
                                    // il deviendra un nombre décimal qu'il faut donc multiplier par 10 pour retrouver la bonne valeure
                                    if (Math.trunc(newResult) == 0) {
                                        newResult = newResult * 10;
                                    }
                                    if (parseInt(this.state.lastCircleValue) == newResult) {
                                        win = 1;
                                    }
                                    this.props.navigation.navigate("GameOutcomePage", { parcours: this.props.parcours, currentGame: this.props.currentGame, win: win });
                                }}>
                                <Text style={styles.boutonText}> {"Valider"} </Text>
                            </TouchableOpacity>
                        </View>
                        <View>

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

}

export default function (props) {
    const navigation = useNavigation();
    return <Pyramid {...props} navigation={navigation} />
}

