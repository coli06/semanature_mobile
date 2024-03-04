import React, { Component } from 'react';
import { View, Text, Image, BackHandler, ScrollView } from 'react-native';
import styles from './GameOutcome.component.style';
import { useNavigation } from '@react-navigation/native';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import common from './../../../styles/common.style'
import NextPage from './../NextPage/NextPage.component'
import { SafeAreaView } from 'react-native-safe-area-context';
import { parseText } from '../../../utils/parseText';


class GameOutcome extends Component {
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
    var win = this.props;
    var paragraph = this.props;
    var illustration = this.props;
    var winText = this.props;
    var loseText = this.props;

    var TopBarreName = "";
    if (this.props.currentGame.type == "jeu_pyramide"
      || this.props.currentGame.type == "jeu_qcm"
      || this.props.currentGame.type == "jeu_intrus"
      || this.props.currentGame.type == "jeu_cesar"
      || this.props.currentGame.type == "jeu_charade"
      || this.props.currentGame.type == "jeu_compterimage"
      || this.props.currentGame.type == "jeu_rebus"
      || this.props.currentGame.type == "jeu_silhouette"
    ) {
      win = this.props.win;
      paragraph = parseText(this.props.currentGame.texteApresReponse);
      illustration = this.props.currentGame.image_url;
      winText = this.props.currentGame.titreSiBonneReponse;
      loseText = this.props.currentGame.titreSiMauvaiseReponse;
    }
    if (this.props.currentGame.type == "jeu_intrus") {
      win = this.props.win;
      paragraph = parseText(this.props.currentGame.texteApresReponse);
      illustration = this.props.currentGame.images_tab[this.props.currentGame.index_bonneReponse];
      winText = this.props.currentGame.titreSiBonneReponse;
      loseText = this.props.currentGame.titreSiMauvaiseReponse;
    }
    this.props.parcours[this.props.parcours.length - 1].score_max++;
    if (win) {
      this.props.parcours[this.props.parcours.length - 1].score++;
    }

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name={TopBarreName} />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={common.card}>
                            {(win == 1) && (
                                <Text style={common.title}>{winText}</Text>
                            )}
                            {(win != 1) && (
                                <Text style={common.title}>{loseText}</Text>
                            )}
                            {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                            <Text style={common.description}>{paragraph}</Text>
                        </View>
                        <NextPage pageName="GamePage" parameters={{ parcours: this.props.parcours }}></NextPage>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <GameOutcome {...props} navigation={navigation} />
}