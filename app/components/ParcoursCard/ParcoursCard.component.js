import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import styles from './ParcoursCard.component.style'
import {telechargerParcours} from './saveParcours';
import {useNavigation} from '@react-navigation/native';
import deleteLocalParcours from '../../utils/deleteLocalParcours';
import loadParcoursLocally, {getParcoursFromCommuneLocally} from '../../utils/loadParcoursLocally';
import { ToastAndroid } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

const ParcoursCard = (props) => {
    const [loading, setLoading] = useState(false);
    const [loadingChoix, setLoadingChoix] = useState(false);

    useEffect(() => {
        // regarde si on a une sauvegarde du parcours ou pas
        checkLocalSave();
    }, [props.parcours.identifiant]);

    const checkLocalSave = () => {
        getParcoursFromCommuneLocally(props.parcours.commune)
            .then((parcours) => {
                parcours = parcours.filter((item) => item.identifiant === props.parcours.identifiant);
                if (parcours === null || parcours.length === 0) {
                    props.setDataLoaded(false);
                    props.setScore(null);
                    props.setScoreMax(null);
                } else {
                    props.setDataLoaded(true);
                    if (parcours.length > 0) {
                        props.setScore(parcours[0].score);
                        props.setScoreMax(parcours[0].score_max);
                        if (props.image !== parcours[0].image_url) {
                            props.setImage(parcours[0].image_url);
                            props.refresh();
                        }
                    }
                }
            })
            .catch((error) => {
                console.error("Error while checking local save", error);
            })
    };

    // données du parcours à afficher
    const titre = props.parcours.titre;
    const image_url = props.parcours.image_url;

    useEffect(() => {
        if (image_url !== '') {
            props.setImage(image_url);
        }
    },[])

    useFocusEffect(
        React.useCallback(() => {
            // Rechargez les données lorsque la page prend le focus
            checkLocalSave();
        }, [])
    );

    const { commune, difficulte, duree, description, identifiant } = props.parcours;
    const internetAvailable = props.internetAvailable;
    
    /*{props.score !== null && props.scoreMax !== null && (
        <Text style={styles.texte}>Score : {props.score} / {props.scoreMax}</Text>
    )}
    {(props.score === null || props.scoreMax === null) && (
        <Text style={styles.texte}>Le score sera disponible une fois le parcours réalisé</Text>
    )}*/

    return (
        // Affichage du titre, illustrations, difficulté, durée, nom de la commune et description du parcours
        // Puis dans la vue rowFlex on a le bouton pour télécharger le parcours puis pour le commencer ou le supprimer
        <View style={styles.card}>
            <Text style={styles.title}>{titre}</Text>
            {props.image !== '' && <Image source={{ uri: props.image }} style={styles.imagecontainer} />}
            <Text style={styles.texte_imp}>Durée : {duree}; Difficulté : {difficulte}</Text>
            <Text style={styles.texte}>{commune}</Text>
            <Text style={styles.texte}>{description}</Text>
            <View style={styles.rowFlex}>
                {loading && (
                    <ActivityIndicator size="small" color={styles.activityIndicator.color} />
                )}
                {!loading && props.dataLoaded && (
                    <>
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
                                deleteLocalParcours(identifiant, commune).finally(() => {
                                    ToastAndroid.show("Parcours supprimé", ToastAndroid.SHORT);
                                    setLoading(false);
                                    props.setDataLoaded(false);
                                    props.setScore(null);
                                    props.setScoreMax(null);
                                    props.reload();
                                });
                            }}
                            style={styles.bouton2}
                        >
                            <Text style={styles.boutonText}>Supprimer</Text>
                        </TouchableOpacity>
                    </>
                )}
                {!loading && !props.dataLoaded && (
                    <TouchableOpacity
                        onPress={() => {
                            //if (internetAvailable) {
                                setLoading(true); // Affiche le loader au début du téléchargement
                                telechargerParcours(props.parcours)
                                    .then(() => {
                                        setLoading(false); // Cache le loader après le téléchargement
                                        ToastAndroid.show("Parcours téléchargé avec succès", ToastAndroid.SHORT);
                                        props.setDataLoaded(true);
                                    })
                                    .catch((error) => {
                                        setLoading(false); // Cache le loader en cas d'erreur
                                        console.error(error);
                                    });
                            /*} else {
                                Alert.alert("Connexion Internet indisponible", "Merci de réessayer une fois qu'Internet sera disponible");
                            }*/
                        }}
                        style={styles.bouton2}
                    >
                        <Text style={styles.boutonText}>Télécharger</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default function (props) {
    // pour changer de page
    const navigation = useNavigation();

    // state variables liées à si une sauvegarde du parcours est sur le disque ou pas
    [score, setScore] = useState(null);
    [scoreMax, setScoreMax] = useState(null);
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