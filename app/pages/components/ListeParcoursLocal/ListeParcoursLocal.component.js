import React, { Component, useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import ParcoursCard from './../../../components/ParcoursCard/ParcoursCard.component';
import theme from './../../../styles/theme.style';
import styles from './ListeParcoursLocal.component.style'
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getParcoursFromCommuneLocally } from "../../../utils/loadParcoursLocally";
import { useFocusEffect } from "@react-navigation/native";

/** Composant de la liste des parcours téléchargés
 */
class ListeParcoursLocal extends Component {
    constructor(props) {
        super(props);
        this.state = { refresh: false };
    }

    render() {
        const allDataSource = this.props.allDataSource;
        const loading = this.props.loading;
        let refreshFunc = () => {
            this.props.setRefresh(this.props.refresh);
        }
        if (loading) {
            // Affiche l'indicateur de chargement (loader)
            return (
                <SafeAreaView style={styles.outsideSafeArea}>
                    <View style={styles.globalContainer}>
                        <TopBarre name="Parcours téléchargés" />
                        <Text style={styles.description}>Retrouvez ici tous les parcours déjà téléchargés et disponibles hors-ligne et vos scores.</Text>
                        <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
                    </View>
                </SafeAreaView>
            );
        }
        //Si il n'y a rien de retourné, on affiche un petit message d'erreur
        else if (allDataSource.length === 0) {
            return (
                <SafeAreaView style={styles.outsideSafeArea}>
                    <View style={styles.globalContainer}>
                        <TopBarre name="Parcours téléchargés" />
                        <Text style={styles.description}>Retrouvez ici tous les parcours déjà téléchargés et disponibles hors-ligne et vos scores.</Text>
                        <Text style={{ paddingTop: 20, padding: 10, fontSize: theme.FONT_SIZE_LARGE }}>Désolé, aucun
                            parcours n'est téléchargé.
                        </Text>
                    </View>
                </SafeAreaView>
            );

        }
        //S'il y a des parcours disponibles, on les affiches dans une liste défilante.
        else {
            return (
                <SafeAreaView style={styles.outsideSafeArea}>
                    <TopBarre name="Parcours téléchargés" />
                    <View style={styles.globalContainer}>
                    <Text style={styles.description}>Retrouvez ici tous les parcours déjà téléchargés et disponibles hors-ligne et vos scores.</Text>
                        <FlatList
                            extraData={this.props.refresh}
                            data={allDataSource}
                            keyExtractor={(item, index) => index.toString()}
                            // Pour tous les parcours de la commune, on affiche la carte du parcours
                            renderItem={({ item }) => { // Un parcours
                                return (
                                    <ParcoursCard parcours={item} reload={this.props.reload}
                                        refresh={refreshFunc} />
                                );
                            }}
                        />
                    </View>
                </SafeAreaView>
            );
        }
    }
}
export default function (props) {
    const [refresh, setRefresh] = useState(true);
    const [allDataSource, setAllDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    const recupererListeCommunes = async () => {
        setLoading(true);

        let communeList = await AsyncStorage.getItem('commune');

        if (communeList !== null) {
            let communes = JSON.parse(communeList);

            let allParcours = [];

            for (let i = 0; i < communes.length; i++) {
                let parcoursCommune = await getParcoursFromCommuneLocally(communes[i]);
                allParcours = allParcours.concat(parcoursCommune);
            }

            allParcours.sort((item1, item2) => {
                let str1 = JSON.stringify(item1);
                let str2 = JSON.stringify(item2);
                if (str1 < str2) {
                    return -1;
                }
                if (str1 > str2) {
                    return 1;
                }
                return 0;
            });

            setAllDataSource(allParcours);
        } else {
            console.log("Aucune commune enregistrée localement.");
        }

        setLoading(false);
    };

    useEffect(() => {
        recupererListeCommunes();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // Rechargez les données lorsque la page prend le focus
            recupererListeCommunes();
        }, [])
    );

    const reload = () => {
        recupererListeCommunes();
    };
    return <ListeParcoursLocal
        {...props}
        allDataSource={allDataSource}
        setAllDataSource={setAllDataSource}
        reload={reload}
        refresh={refresh}
        setRefresh={setRefresh}
        loading={loading}
    />;
}