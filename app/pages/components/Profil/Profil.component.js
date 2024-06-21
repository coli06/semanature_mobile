import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { loadGameHistory } from '../../../utils/loadParcoursLocally';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import styles from './Profil.component.style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Profil() {
    const [gameHistory, setGameHistory] = useState([]);

    useEffect(() => {
        // Charger l'historique des jeux au montage du composant
        const fetchGameHistory = async () => {
            const history = await loadGameHistory();
            setGameHistory(history);
        };

        fetchGameHistory();
    }, []);

    const handleDeleteHistory = async () => {
        try {
            // Supprimer l'historique de AsyncStorage
            await AsyncStorage.removeItem('gameHistory');
            // Mettre à jour l'état pour refléter la suppression
            setGameHistory([]);
            // Vous pouvez également afficher un message de confirmation ou effectuer d'autres actions si nécessaire
        } catch (error) {
            console.error("Erreur lors de la suppression de l'historique", error);
        }
    };

    useEffect(() => {
        // Utilisez cet effet pour mettre à jour l'historique chaque fois qu'il change
        const updateHistory = async () => {
            const history = await loadGameHistory();
            setGameHistory(history);
        };

        updateHistory();
    }, [gameHistory]);

    return (
        <SafeAreaView style={styles.outsideSafeArea}>
            <TopBarre name="Mon profil" />
            <View style={styles.globalContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                    <Text style={styles.title}>
                        Profil
                    </Text>
                    <Text style={styles.title_inter}> Nombre de parcours effectués : {gameHistory.length}</Text>
                    <Text style={styles.title_inter}> Historique des derniers parcours :</Text>

                    {gameHistory.map((game, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.iconTextContainer}>
                                <Icon name="pine-tree" color={'#0C8711'} size={20} />
                                <Text style={styles.text}> Parcours : {game.name}</Text>
                            </View>
                            <View style={styles.iconTextContainer}>
                                <Icon name="map-marker" color={'#0C8711'} size={20} />
                                <Text style={styles.text}>  {game.commune}</Text>
                            </View>
                            <View style={styles.iconTextContainer}>
                                <Icon name="seal" color={'#0C8711'} size={20} />
                                <Text style={styles.text}> Score : {game.score}/{game.scoreMax}</Text>
                            </View>
                            <View style={styles.iconTextContainer}>
                                <Icon name="calendar" color={'#0C8711'} size={20} />
                                <Text style={styles.text}> Date : {new Date(game.date).toLocaleDateString()}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity
                            onPress={handleDeleteHistory} style={styles.bouton}>
                            <Text style={styles.boutonText}>Supprimer l'historique</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default Profil;

