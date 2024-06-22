import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import { getParcoursFromCommune } from './../../../utils/queries';
import ParcoursCard from './../../../components/ParcoursCard/ParcoursCard.component';
import databaseService from '../../../utils/localStorage';
import theme from './../../../styles/theme.style';
import styles from './ParcoursChoice.component.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect } from "@react-navigation/native";

const ParcoursChoice = (props) => {
    const [allDataSource, setAllDataSource] = useState([]);
    const communepluscode = props.commune;
    const mapRequestId = props.mapRequestId;
    const commune = communepluscode.endsWith(')') ? communepluscode.substring(0, communepluscode.length - 8) : communepluscode;
    const [internetAvailable, setInternetAvailable] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to check initial internet connectivity
        const checkInitialInternetState = async () => {
            try {
                const state = await NetInfo.fetch();
                setInternetAvailable(state.isInternetReachable);
            } catch (error) {
                console.error("Error while looking for Internet connection", error);
            }
        };

        checkInitialInternetState();

        const unsubscribe = NetInfo.addEventListener(state => {
            setInternetAvailable(state.isInternetReachable);
        });

        return () => unsubscribe();
    }, []);

    const renderResults = useCallback(async () => {
        setLoading(true);

        let temp;
        if (internetAvailable) {
            temp = await getParcoursFromCommune(commune, mapRequestId || undefined);
        } else {
            temp = await new Promise((resolve) => {
                databaseService.getParcoursFromCommuneLocally(commune, resolve);
            });
        }

        if (temp) {
            temp.sort((item1, item2) => {
                let str1 = JSON.stringify(item1);
                let str2 = JSON.stringify(item2);
                return str1.localeCompare(str2);
            });

            setAllDataSource(temp);
        }
        setLoading(false);
    }, [internetAvailable, commune, mapRequestId]);

    useFocusEffect(
        useCallback(() => {
            renderResults();
        }, [renderResults])
    );

    useEffect(() => {
        renderResults();
    }, [internetAvailable, renderResults]);

    if (loading) {
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
    } else if (allDataSource.length === 0) {
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
    } else {
        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Choix du parcours" />
                <View style={styles.globalContainer}>
                    <FlatList
                        contentContainerStyle={styles.parcoursCardList}
                        extraData={refresh}
                        data={allDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <ParcoursCard parcours={item} reload={renderResults} internetAvailable={internetAvailable} refresh={() => setRefresh(!refresh)} />
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }
};

export default ParcoursChoice;
