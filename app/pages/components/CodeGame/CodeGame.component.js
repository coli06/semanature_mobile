import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling
import styles from './CodeGame.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';

class CodeGame extends Component {
    constructor(props) {
        super(props);
        // par défaut on utilise blockConfirm pour empêcher de passer à la page suivante
        this.state = {
            code: this.props.currentGame.code,
            blockConfirm: true,
            input: '',
            isSoundLoaded: false,
            sound: null,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.loadSound();
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.unloadSound();
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
        this.setState({ input: input });
    }

    async loadSound() {
        const { audio_url } = this.props.currentGame;
        if (audio_url && audio_url !== '') {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audio_url },
                { shouldPlay: false }
            );
            this.setState({ sound, isSoundLoaded: true });
        }
    }

    async unloadSound() {
        if (this.state.sound) {
            await this.state.sound.unloadAsync();
        }
    }

    async playSound() {
        try {
            await this.state.sound.playAsync();
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    }

    render() {
      const paragraph = this.props.currentGame.texte;
      const etapeMax = this.props.parcoursInfo.etape_max;
      if (etapeMax === undefined) {
          var topBarreName = "";
      } else {
          var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
      }
      const title = this.props.currentGame.nom;
      const icone = require('./../../../assets/code_paysage_icone.png');
      const illustration = this.props.currentGame.image_url;
      return (
        <SafeAreaView style={styles.outsideSafeArea}>
          <TopBarre name={topBarreName} />
          <View style={styles.globalContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
              <View style={styles.card}>
                <MainTitle title={title} icone={icone} />
                {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                <Text style={styles.description}>{paragraph}</Text>
                <TextInput style={styles.inputTextField} onChangeText={this.handleChange} editable={true} placeholder="CODE" />
              </View>
              <View style={styles.rightAlign}>
                <TouchableOpacity
		  style={styles.bouton}
                  disabled={this.state.confirmClicked}
                  onPress={() => {
                    if (NormalizeStrings(this.state.code) == NormalizeStrings(this.state.input)) {
                      this.handleConfirmClicked();
                      this.props.navigation.navigate("GamePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours });
                    }
                    else {
                      Alert.alert("Mauvais code !");
                    }
                  }}>
                  <Text style={styles.boutonText}> {"Valider"} </Text>
                </TouchableOpacity>
                {this.state.isSoundLoaded && (
                   <TouchableOpacity
                     style={styles.audioButton}
                     onPress={() => this.playSound()}
                   >
                     <Text style={styles.audioButtonText}>Play Sound</Text>
                   </TouchableOpacity>)}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <CodeGame {...props} navigation={navigation} />;
}
