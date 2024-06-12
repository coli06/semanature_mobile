import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './ParcoursCard.component.style'
import {telechargerParcours} from './saveParcours';
import {useNavigation} from '@react-navigation/native';
import deleteLocalParcours from '../../utils/deleteLocalParcours';
import loadParcoursLocally, {getParcoursFromCommuneLocally} from '../../utils/loadParcoursLocally';

const ParcoursCard = (props) => {
    const [loading, setLoading] = useState(false);
    const [loadingChoix, setLoadingChoix] = useState(false);

    useEffect(() => {
        // regarde si on a une sauvegarde du parcours ou pas
        checkLocalSave();
    }, [props.parcours.identifiant]);

    const checkLocalSave = () => {
        loadParcoursLocally(props.parcours.identifiant).then((parcours) => {
            if (parcours === null) {
                props.setDataLoaded(false);
                props.setScore(null);
                props.setScoreMax(null);
            } else {
                const infoGeneral = parcours.general;
                props.setScore(infoGeneral.score);
                props.setScoreMax(infoGeneral.score_max);
                props.setDataLoaded(true);
                getImageLocally();
            }
        });
    };

    const getImageLocally = () => {
        getParcoursFromCommuneLocally(props.parcours.commune).then((parcours) => {
            parcours = parcours.filter((item) => item.identifiant === props.parcours.identifiant);
            if (parcours.length > 0) {
                if (props.image !== parcours[0].image_url) {
                    props.setImage(parcours[0].image_url);
                    props.refresh();
                }
            }
        });
    };

    // données du parcours à afficher
    const titre = props.parcours.titre;
    const image_url = props.parcours.image_url;

    useEffect(() => {
        if (image_url !== '') {
            props.setImage(image_url);
        }
    },[])


    const { commune, difficulte, duree, description, identifiant } = props.parcours;
    const internetAvailable = props.internetAvailable;

    return (
        // Affichage du titre, illustrations, difficulté, durée, nom de la commune et description du parcours
        // Puis dans la vue rowFlex on a les deux boutons pour commencer le parcours ou pour le télécharger
        <View style={styles.card}>
            <Text style={styles.title}>{titre}</Text>
            {props.image !== '' && <Image source={{ uri: props.image }} style={styles.imagecontainer} />}
            <Text style={styles.texte_imp}>Durée : {duree}; Difficulté : {difficulte}</Text>
            {props.score !== null && props.scoreMax !== null && (
                <Text style={styles.texte}>Score : {props.score} / {props.scoreMax}</Text>
            )}
            <Text style={styles.texte}>{commune}</Text>
            <Text style={styles.texte}>{description}</Text>
            <View style={styles.rowFlex}>
                <TouchableOpacity
                    onPress={() => {
                            setLoadingChoix(true);
                            props.navigation.navigate("ParcoursBeginPage", { identifiant: identifiant });
                        }}
                    style={styles.bouton2}
                >
                    {loadingChoix ? ( // Affichage du loader si l'état 'loading_choix' est vrai
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="small" color="#ffffff" />
                        </View>
                    ) : (
                        <Text style={styles.boutonText}>Commencer ce parcours</Text>
                    )}
                </TouchableOpacity>
                {props.dataLoaded && (
                    <TouchableOpacity
                        onPress={() => {
                            deleteLocalParcours(id).finally(() => {
                                props.setDataLoaded(false);
                                props.setScore(null);
                                props.setScoreMax(null);
                                //props.reload();
                                props.refresh();
                            });
                        }}
                        style={styles.bouton2}
                    >
                        <Text style={styles.boutonText}>Supprimer</Text>
                    </TouchableOpacity>
                )}
                {!props.dataLoaded && (
                    <TouchableOpacity
                        onPress={() => {
                            setLoading(true); // Affiche le loader au début du téléchargement
                            telechargerParcours(props.parcours)
                                .then(() => {
                                    setLoading(false); // Cache le loader après le téléchargement
                                    props.refresh();
                                })
                                .catch((error) => {
                                    setLoading(false); // Cache le loader en cas d'erreur
                                    console.error(error);
                                });
                            props.setDataLoaded(true);
                        }}
                        style={styles.bouton2}
                    >
                        {loading ? ( // Affiche le loader si l'état 'loading' est vrai
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="small" color="#ffffff" />
                            </View>
                        ) : (
                            <Text style={styles.boutonText}>Télécharger</Text>
                        )}
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
    [dataLoaded, setDataLoaded] = useState(null);
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