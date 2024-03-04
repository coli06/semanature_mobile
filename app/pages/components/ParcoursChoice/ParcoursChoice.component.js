import React, { Component, useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { getParcoursFromCommune } from './../../../utils/queries'
import ParcoursCard from './../../../components/ParcoursCard/ParcoursCard.component';
import { getParcoursFromCommuneLocally } from '../../../utils/loadParcoursLocally';
import theme from './../../../styles/theme.style';
import styles from './ParcoursChoice.component.style'
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";

/** Composant de recherche de la page de recherche de parcours
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
                        <ActivityIndicator size="large" color={theme.COLOR_PRIMARY} />
                    </View>
                </SafeAreaView>
            );
        }
        //Si il n'y a rien de retourné pour la commune, on affiche un petit message d'erreur
        else if (allDataSource.length == 0) {
            return (
                <SafeAreaView style={styles.outsideSafeArea}>
                    <View style={styles.globalContainer}>
                        <TopBarre name="Choix du parcours" />
                        <Text style={{ paddingTop: 20, padding: 10, fontSize: theme.FONT_SIZE_LARGE }}>Désolé, aucun parcours n'est encore disponible pour cette commune.
                        </Text>
                    </View>
                </SafeAreaView>
            );

        }
        //S'il y a des parcours disponibles, on les affiches dans une liste défilante.
        else {
            return (
                <SafeAreaView style={styles.outsideSafeArea}>
                    <TopBarre name="Choix du parcours" />
                    <View style={styles.globalContainer}>
                        <FlatList
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
    console.log("commune : " + commune);
    const [internetAvailable, setInternetAvailable] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true);
    let tmp = NetInfo.fetch()
    let lastInternetState = false;
    tmp.then((state) => {
        if (internetAvailable != state.isInternetReachable) {
            setInternetAvailable(state.isInternetReachable);
        }
    })
    NetInfo.addEventListener(state => {
        if (internetAvailable != state.isInternetReachable) {
            setInternetAvailable(state.isInternetReachable);
        }
    })
    async function f() {
        if (internetAvailable == lastInternetState) {
            return;
        } else {
            lastInternetState = internetAvailable;
        }

        setLoading(true);

        var temp;
        if (internetAvailable) {
            temp = await getParcoursFromCommune(commune);
        }
        if (temp == undefined || temp.length == 0) {

            temp = await getParcoursFromCommuneLocally(commune);
        }
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
    }
    useEffect(() => {
        f(); // Permet d'appeller une fonction asynchrone
    }, [internetAvailable])
    function reload() {
        f();
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