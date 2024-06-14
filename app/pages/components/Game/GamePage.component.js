import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function (props) {
    const navigation = useNavigation();
    const currentGame = props.parcours[0]; // étape en cours
    var size = props.parcours.length;
    if (props.parcours[size - 1].type != "score_data") {
        props.parcours.push({ type: "score_data", score: 0, score_max: 0, parcoursId: props.parcoursId });
        size = size + 1;
    }

    const parcoursInfo = props.parcoursInfo; // nom et informations du parcours
    const parcours = props.parcours.slice(1); // reste du parcours
    
    /*if (parcours.type.find((item) => item == parcours.type) === "fin_parcours") {
      currentGame.sizeleft = size - 3;
      parcours.length = size - 1;
    }*/

    currentGame.sizeleft = size - 2;

    useEffect(() => {
        switch (currentGame.type) {
            case ("jeu_info"): {
                navigation.navigate("LeSaviezVousPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }
            
            case ("jeu_blague"): {
                navigation.navigate("JokePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_qcm"): {
                navigation.navigate("QcmPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_intrus"): {
                navigation.navigate("FindIntruderPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_pyramide"): {
                navigation.navigate("PyramidPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("transi_gps"): {
                navigation.navigate("TransitionGPSPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_code"): {
                navigation.navigate("CodeGamePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_cesar"): {
                navigation.navigate("CodeCesarPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_compterimage"): {
                navigation.navigate("CompterImagePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("transi_info"): {
                navigation.navigate("TransitionInfoPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_charade"): {
                navigation.navigate("CharadePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_rebus"): {
                navigation.navigate("RebusPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_silhouette"): {
                navigation.navigate("FindSilhouettePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            case ("jeu_ecogeste"): {
                navigation.navigate("EcoGestePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGame });
                break;
            }

            /*case ("fin_parcours"): {
              props.parcours[size - 1].type = "fin_parcours";
              props.parcours[size - 1].info = currentGame;
            }*/

            default:
                navigation.navigate("FinParcoursPage", { parcours: parcours, currentGame: props.parcours[size - 1] });
                break;
        }
    })
}