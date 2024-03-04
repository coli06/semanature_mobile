import React, { Component, useEffect, useState } from 'react';
import { View, Image, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getParcoursContents } from './../../../utils/queries';
import loadParcoursLocally from '../../../utils/loadParcoursLocally';
import TopBarre from './../../../components/TopBarre/TopBarre.component'
import styles from './ParcoursBegin.component.style'
import NextPage from './../NextPage/NextPage.component'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';

const windowWidth = Dimensions.get('window').width;

class ParcoursBegin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const imageWidth = windowWidth * 0.8; // 80% of the window width
        const identifiant = this.props.identifiant;
        const generalData = this.props.generalData;
        const etapesData = this.props.etapesData;
        const parcoursEtapes = [];
        etapesData.forEach((element) => {
            parcoursEtapes.push(element.etape);
        });
        parcoursEtapes.sort((a, b) => a.ordre - b.ordre);
        const icone = require('./../../../assets/parcours_begin_icone.png');

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Début du parcours" />
                <View style={styles.globalContainer}>
                    <View style={styles.card}>
                        <MainTitle title="C'est parti !!!" />
                        <Image
                            source={require('./../../../assets/parcours_begin_icone.png')}
                            style={[styles.image, { width: imageWidth }]}
                        />
                    </View>

                    {!this.props.isInit ? ( // Affiche le loader si l'état 'loading' est vrai
                    <TouchableOpacity style={styles.bouton2}>
                            <ActivityIndicator size="small" color="#ffffff" />
                    </TouchableOpacity>
                        

                    ) : (
                        <NextPage pageName="GamePage" parameters={{ parcours: parcoursEtapes, parcoursId: identifiant }} blockButton={true} text="Commencer" />

                    )}

                    {/*{(this.props.isInit) && (
                        <NextPage pageName="GamePage" parameters={{ parcours: parcoursEtapes, parcoursId: identifiant }} blockButton={true} text="Commencer" />
                    )}*/}
                </View>
            </SafeAreaView>
        );
    };
}

export default function (props) {
    const navigation = useNavigation();
    const identifiant = props.identifiant;
    const [generalData, setGeneralData] = useState([]);
    const [etapesData, setEtapesData] = useState([]);
    const [isInit, setIsInit] = useState(false);
    useEffect(() => {
        var temp;
        async function f() {
            temp = await loadParcoursLocally(identifiant);
            if (temp == undefined) {
                temp = await getParcoursContents(identifiant);
            }
            setIsInit(true);
            setGeneralData(temp.general);
            setEtapesData(temp.etapes);
            //console.log(temp.etapes)
        }
        f();

    }, [])
    return <ParcoursBegin {...props} generalData={generalData} setGeneralData={setGeneralData} etapesData={etapesData} setEtapesDataa={setEtapesData} navigation={navigation} isInit={isInit} />;
}