import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './ParcoursCard.component.style'
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import databaseService from '../../utils/localStorage';
import InfoLogoText from '../InfoLogoText/InfoLogoText.component';

const ParcoursCard = (props) => {
    const [score, setScore] = useState(null);
    const [scoreMax, setScoreMax] = useState(null);
    const [loading, setLoading] = useState(false);

    async function checkLocalSave() {
        try {
            const parcours = await databaseService.checkParcours(props.parcours.identifiant);
            if (!parcours || parcours.rows.length === 0) {
                props.setDataLoaded(false);
                props.setScore(null);
                props.setScoreMax(null);
            } else {
                props.setDataLoaded(true);
                if (parcours.length > 0 && props.image !== parcours[0].image_url) {
                    props.setImage(parcours[0].image_url);
                    props.refresh();
                }
            }
        } catch(error) {
            console.error("Error while checking local save", error);
        };
    };

    async function updateScores() {
        databaseService.getScores(
            props.parcours.identifiant,
            (scores) => {
                const { localScore, localScoreMax } = scores;
                setScore(localScore);
                setScoreMax(localScoreMax);
                props.refresh();
            },
            (errorMessage) => {
                console.error(errorMessage);
            }
        )
    }

    // données du parcours à afficher
    const titre = props.parcours.titre;
    const image_url = props.parcours.image_url;

    useEffect(() => {
        if (image_url !== '') {
            props.setImage(image_url);
        }
        updateScores();
    },[])

    useFocusEffect(
        React.useCallback(() => {
            // Rechargez les données lorsque la page prend le focus
            checkLocalSave();
        }, [])
    );

    const { commune, difficulte, duree, description, identifiant } = props.parcours;
    const internetAvailable = props.internetAvailable;
    
    return (
        // Affichage du titre, illustrations, difficulté, durée, nom de la commune et description du parcours
        // Puis dans la vue rowFlex on a le(s) bouton(s) pour télécharger le parcours puis pour le commencer ou le supprimer
        <View style={styles.card}>
            <Text style={styles.title}>{titre}</Text>
            {props.image !== '' && <Image source={{ uri: props.image }} style={styles.imagecontainer} />}
            <View style={styles.infoRowFlex}>
                <InfoLogoText text={duree} iconName="clock" iconCollection="MaterialCommunityIcons" />
                <InfoLogoText text={difficulte} iconName="barbell" iconCollection="Ionicons" />
                <InfoLogoText text={commune} iconName="place" iconCollection="MaterialIcons" />
            </View>
            {score !== null && scoreMax !== null && (
                <Text style={styles.texte}>Score : {score} / {scoreMax}</Text>
            )}
            {(score === null || scoreMax === null) && (
                <Text style={styles.texte}>Le score sera disponible une fois le parcours réalisé</Text>
            )}
            <Text style={styles.texte}>{description}</Text>
            {loading && (
                <ActivityIndicator size="small" color={styles.activityIndicator.color} style={styles.activityIndicator}/>
            )}
            {!loading && props.dataLoaded && (
                <>
                    <View style={styles.rowFlex}>
                        <TouchableOpacity
                            onPress={() => {
                                    props.navigation.navigate("ParcoursBeginPage", { identifiant: identifiant });
                                }}
                            style={styles.bouton2}
                        >
                            <Text style={styles.boutonText}>Commencer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true);
                                databaseService.deleteParcours(
                                    identifiant,
                                    () => {
                                        ToastAndroid.show("Parcours supprimé", ToastAndroid.SHORT);
                                        setLoading(false);
                                        props.setDataLoaded(false);
                                        props.setScore(null);
                                        props.setScoreMax(null);
                                        props.reload();
                                    },
                                    (error) => {
                                        console.error(error);
                                    },
                                );
                            }}
                            style={styles.bouton2}
                        >
                            <Text style={styles.boutonText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {!loading && !props.dataLoaded && (
                <View style={styles.rowFlex}>
                    <TouchableOpacity
                        onPress={() => {
                            setLoading(true); // Affiche le loader au début du téléchargement
                            databaseService.telechargerParcoursContents(
                                props.parcours,
                                () => {
                                    setLoading(false); // Cache le loader après le téléchargement
                                    props.setDataLoaded(true);
                                    ToastAndroid.show("Parcours téléchargé avec succès", ToastAndroid.SHORT);
                                },
                                (error) => {
                                    setLoading(false); // Cache le loader en cas d'erreur
                                    console.error(error);
                                },
                                () => {
                                    Alert.alert("Connexion Internet indisponible", "Merci de réessayer une fois qu'Internet sera disponible");
                                }
                            );
                        }}
                        style={styles.bouton2}
                    >
                        <Text style={styles.boutonText}>Télécharger</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default function (props) {
    // pour changer de page
    const navigation = useNavigation();
    
    // state variables liées à si une sauvegarde du parcours est sur le disque ou pas
    [dataLoaded, setDataLoaded] = useState(false);
    [image, setImage] = useState('');

    // wrapper du component dans une fonction
    return <ParcoursCard {...props}
                         navigation={navigation}
                         reload={props.reload}
                         refresh={props.refresh}
                         internetAvailable={props.internetAvailable}
                         score={score}
                         setScore={setScore}
                         scoreMax={scoreMax}
                         setScoreMax={setScoreMax}
                         dataLoaded={dataLoaded}
                         setDataLoaded={setDataLoaded}
                         image={image}
                         setImage={setImage}
    />;

}