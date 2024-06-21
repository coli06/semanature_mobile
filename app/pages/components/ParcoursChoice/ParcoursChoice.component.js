import React, { Component, useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { getParcoursFromCommune } from './../../../utils/queries'
import ParcoursCard from './../../../components/ParcoursCard/ParcoursCard.component';
import databaseService from '../../../utils/localStorage';
import theme from './../../../styles/theme.style';
import styles from './ParcoursChoice.component.style'
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect } from "@react-navigation/native";

/** Composant de sélection de parcours pour la ville sélectionnée
*/
class ParcoursChoice extends Component {
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
                        <TopBarre name="Choix du parcours" />
                        <View style={styles.activityIndicatorContainer}>
                            <ActivityIndicator size="large" color={styles.activityIndicator.color} />
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
        //S'il n'y a rien de retourné pour la commune, on affiche un petit message d'erreur
        else if (allDataSource.length == 0) {
            return (
                <SafeAreaView style={styles.outsideSafeArea}>
                    <View style={styles.globalContainer}>
                        <TopBarre name="Choix du parcours" />
                        <Text style={{ paddingTop: 20, padding: 10, fontSize: theme.FONT_SIZE_LARGE }}>
                            Désolé, aucun parcours n'est encore disponible pour cette commune.
                        </Text>
                    </View>
                </SafeAreaView>
            );

        }
        // S'il y a des parcours disponibles, on les affiche dans une liste défilante.
        else {
            return (
                <SafeAreaView style={styles.outsideSafeArea}>
                    <TopBarre name="Choix du parcours" />
                    <View style={styles.globalContainer}>
                        <FlatList
                            contentContainerStyle={styles.parcoursCardList}
                            extraData={this.props.refresh}
                            data={allDataSource}
                            keyExtractor={(item, index) => index.toString()}
                            // Pour tous les parcours de la commune, on affiche la carte du parcours
                            renderItem={({ item }) => { // Un parcours
                                return (
                                    <ParcoursCard parcours={item} reload={this.props.reload} internetAvailable={this.props.internetAvailable} refresh={refreshFunc} />
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
    const [allDataSource, setAllDataSource] = useState([]);
    const communepluscode = props.commune;
    const commune = communepluscode.endsWith(')') ? communepluscode.substring(0, communepluscode.length - 8) : communepluscode;
    const [internetAvailable, setInternetAvailable] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true);

    let lastInternetState = false;
    
    useEffect(() => {
        // Function to check initial internet connectivity
        const checkInitialInternetState = async () => {
            NetInfo.fetch().then((state) => {
                if (internetAvailable != state.isInternetReachable) {
                    setInternetAvailable(state.isInternetReachable);
                }
            }).catch((error) => {
                console.error("Error while looking for Internet connection", error);
            });
        };

        checkInitialInternetState();

        // Subscribe to internet connectivity changes
        const unsubscribe = NetInfo.addEventListener(state => {
            if (internetAvailable !== state.isInternetReachable) {
                setInternetAvailable(state.isInternetReachable);
            }
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    async function renderResults() {
        if (internetAvailable == lastInternetState) {
            return;
        } else {
            lastInternetState = internetAvailable;
        }

        setLoading(true);

        var temp;
        if (internetAvailable) {
            temp = await getParcoursFromCommune(commune);
            processResults(temp);
        } else if (temp == undefined || temp.length == 0) {
            databaseService.getParcoursFromCommuneLocally(
                commune,
                (results) => {
                    processResults(results);
                }
            );
        }        

        function processResults(temp) {
            temp.sort((item1, item2) => {
                let str1 = JSON.stringify(item1);
                let str2 = JSON.stringify(item2);
                if (str1 < str2) {
                    return -1;
                }
                if (str1 > str2) {
                    return 1;
                }
                return 0;
            })        
    
            setAllDataSource(temp);
            setLoading(false);
        };
    }

    useEffect(() => {
        renderResults(); // Permet d'appeller une fonction asynchrone
    }, [internetAvailable])

    useFocusEffect(
        React.useCallback(() => {
            // Recharger les données lorsque la page prend le focus
            reRender = async () => {await renderResults()};
            reRender();
        }, [])
    );

    function reload() {
        renderResults();
    }

    return <ParcoursChoice
        {...props} commune={commune}
        allDataSource={allDataSource}
        setAllDataSource={setAllDataSource}
        reload={reload}
        internetAvailable={internetAvailable}
        refresh={refresh}
        setRefresh={setRefresh}
        loading={loading}
    />;
}