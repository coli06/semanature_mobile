import React, { Component, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, TextInput, ScrollView, Alert } from 'react-native';
import styles from './CodeGame.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';
import {getParcoursContents} from "../../../utils/queries";

class CodeGame extends Component {
    constructor(props) {
        super(props);
        // par défaut on utilise blockConfirm pour empêcher de passer à la page suivante
        this.state = { code: this.props.currentGame.code, blockConfirm: true, input: '' };
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

    /**
     * Permet de bloquer le retour arrière
     * @returns 
     */
    handleBackButtonClick() {
        return true;
    }

    /**
     * Permet d'éviter le spam click
     */
    handleConfirmClicked = () => {
        if (!this.state.confirmClicked) {
            this.setState({ confirmClicked: true });
        }
    }

    handleChange = (input) => {
        this.setState({ input: input })
    }

  render() {
    const paragraph = this.props.currentGame.texte;
    const etapeMax = this.props.parcours.etape_max;
    if (etapeMax === undefined) {
        var TopBarreName = "";
    } else {
        var TopBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
    }
    const title = this.props.currentGame.nom;
    const icone = require('./../../../assets/code_paysage_icone.png');
    const illustration = this.props.currentGame.image_url;
    return (
      <SafeAreaView style={styles.outsideSafeArea}>
        <TopBarre name={TopBarreName} />
        <View style={styles.globalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer} styel={styles.scrollView}>
            <View style={styles.card}>
              <MainTitle title={title} icone={icone} />
              {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
              <Text style={styles.description}>{paragraph}</Text>
              <TextInput style={styles.inputTextField} onChangeText={this.handleChange} editable={true} placeholder="CODE" />
            </View>
            <View style={styles.rightAlign}>
              <TouchableOpacity style={styles.bouton}
                disabled={this.state.confirmClicked}
                onPress={() => {
                  if(NormalizeStrings(this.state.code) == NormalizeStrings(this.state.input)) {
                    this.handleConfirmClicked();
                    this.props.navigation.navigate("GamePage", { parcours: this.props.parcours });
                  }
                  else {
                    Alert.alert("Mauvais code !");
                  }
                }}>
                <Text style={styles.boutonText}> {"Valider"} </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default function (props) {
    const navigation = useNavigation();
    return <CodeGame {...props} navigation={navigation} />
}