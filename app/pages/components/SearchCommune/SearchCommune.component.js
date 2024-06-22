import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { getAllCommunes } from './../../../utils/queries';
import styles from './SearchCommune.component.style';
import NormalizeStrings from './../../../utils/normalizeStrings';
import databaseService from '../../../utils/localStorage';

/*
*/
class SearchCommune extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const filteredDataSource = this.props.filteredDataSource;
        const search = this.props.search;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Recherchez la commune où vous souhaitez effectuer un parcours</Text>
                <View style={styles.searchBar}>
                    <Feather name="search" size={24} color="black" />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Rechercher une commune'
                        onChangeText={(text) => searchFilterFunction(text, this.props)}
                        value={search}
                    />
                </View>
                <View style={styles.parcoursSeparator}>
                    <FlatList
                        data={filteredDataSource} // Communes affichées en résultat de recherche
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => { return (<View style={styles.parcoursSeparator} />) }}
                        style={styles.searchStyle}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                        style={styles.touchableItem}
                                        onPress={() => { this.props.navigation.navigate("ParcoursChoicePage", { commune: item, mapRequestId: "" }); }}
                                    >
                                        <Text style={styles.textAreaStyle}> {item} </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}

// Filtre le nom de commune retourné
const searchFilterFunction = (text, props) => {
    if (text) {
        const newData = props.allDataSource.filter(function (item) {
            const itemData = item
                ? NormalizeStrings(item).replace('ST', 'SAINT')
                : ''.toUpperCase(); // Rend insensible à la casse
            const textData = NormalizeStrings(text).replace('ST', 'SAINT');
            return itemData.indexOf(textData) > -1;
        }).filter((item, i) => (i < 20)); // Limite du nombre de commune affichées en même temps "filtrées"
        props.setFilteredDataSource(newData); // Applique le filtre
        props.setSearch(text); // Remplit le champs
    } else {
        props.setFilteredDataSource(props.allDataSource); // Réaffiche toute les communes
        props.setSearch(text); // Remplit le champ
    }
};

/** Barre de recherche de commune, pour accéder à la page de choix de parcours de cette commune.
 * 
*/
export default function (props) {

    // initialisation des variables d'état
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [allDataSource, setAllDataSource] = useState([]);
    const [internetAvailable, setInternetAvailable] = useState(false);

    // gère le changement de page
    const navigation = useNavigation();

    // vérifie la connection à internet
    useEffect(() => {
        const checkInternetAvailability = async () => {
            const netInfoState = await NetInfo.fetch();
            if (netInfoState.isInternetReachable != internetAvailable) {
                setInternetAvailable(netInfoState.isInternetReachable);
            }

            if (!netInfoState.isInternetReachable) {
                Alert.alert("Connexion Internet indisponible", "Merci de réessayer une fois qu'Internet sera disponible");
            }
        };
        checkInternetAvailability();
    }, []);

    // eventListener qui surveille la connection internet
    const handleConnectivityChange = (state) => {
        if (state.isInternetReachable != internetAvailable) {
            setInternetAvailable(state.isInternetReachable);
        }
    };
    NetInfo.addEventListener(handleConnectivityChange);

    // charge les communes, par internet si possible, en local sinon
    async function chargeCommunes() {
        var temp;

        // si internet on prend les communes de la firebase
        if (internetAvailable) {
            temp = await getAllCommunes();
        }
        if (temp == undefined || temp.length == 0) {
            // si on n'a pas accès à la firebase, on regarde les communes disponibles en local
            databaseService.getAllCommunes(
                (communes) => {
                    temp = communes ?? new Array();
                },
                (errorMessage) => {
                    console.error(errorMessage);
                    temp = new Array();
                }
            );
        }

        // attribution des communes aux bonnes variables
        setAllDataSource(temp);
        setFilteredDataSource(temp);
    }

    // recharge les communes quand la connectivité internet change
    useEffect(() => {
        chargeCommunes();
    }, [internetAvailable])

    // wrapper du component dans une fonction
    return <SearchCommune {...props}
        navigation={navigation}
        search={search}
        filteredDataSource={filteredDataSource}
        allDataSource={allDataSource}
        setSearch={setSearch}
        setFilteredDataSource={setFilteredDataSource}
        setAllDataSource={setAllDataSource}
    />;
}