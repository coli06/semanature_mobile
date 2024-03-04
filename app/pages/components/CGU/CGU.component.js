import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import TopBarre from './../../../components/TopBarre/TopBarre.component';
import styles from './CGU.component.style.js';
import { SafeAreaView } from 'react-native-safe-area-context';

class CGU extends Component {
    render() {
        return (
            // Style titre pour le titre CGU
            // style titre inter pour les titres de paragraphe
            // Style texte pour le texte en lui-même
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Conditions d'Utilisation" />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <Text style={styles.title}>
                            Conditions Générales d'Utilisation
                        </Text>
                        <Text style={styles.title_inter}> Mentions légales</Text>
                        <Text style={styles.text}>
                            <Text style={styles.textBold}>Propriétaire: </Text> LPO AuRA dt Loire - 11 rue René Cassin - 42100 Saint-Etienne
                        </Text>
                        <Text style={styles.textBis}>
                            <Text style={styles.textBold}>Créateur: </Text> École d'ingénieurs Télécom Saint-Etienne
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.textBold}>Responsable Publication: </Text> LPO AuRA dt Loire
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.textBold}>Webmaster: </Text>LPO AuRA dt Loire
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.textBold}>Hebergeur: </Text>Google
                        </Text>
                        <Text style={styles.title_inter}>
                            Objet
                        </Text>
                        <Text style={styles.text}>
                            Les présentes conditions générales d’utilisation (ci-après dénommées « CGU ») ont pour objet de déterminer les règles d’encadrement du jeu « Scrute la Nature », mis en place par la LPO AuRA, Télécom Saint-Etienne et Saint-Etienne-Métropole. Les présentes CGU concernent les règles d’utilisation de l’application mobile.
                        </Text>
                        <Text style={styles.title_inter}>
                            Définitions
                        </Text>
                        <Text style={styles.text}>
                            Les termes employés au sein des présentes CGU auront la signification qui leur est donnée ci-après:
                        </Text>
                        <Text style={styles.text}>
                            •	"Application" désigne l'application mobile "Scrute la Nature" éditée et fournie par la LPO AuRA et l'école d'Ingénieurs Télécom Saint-Etienne, donnant accès au jeu, qui est disponible gratuitement
                            dans le "Google Play Store" de Google pour être téléchargée par l'Utilisateur sur son terminal Android. L'Application comprend également les contenus, les logiciels, les programmes, les outils (de programmation, de navigation, ...),
                            les bases de données, les systèmes d'exploitation, la documentation et tous autres éléments et services qui la composent, les mises à jour et les nouvelles versions qui peuvent être apportées à l'Application par la LPO AuRA et Télécom Saint-Etienne.
                        </Text>
                        <Text style={styles.text}>
                            •	« Utilisateur » ou « Participant » désigne une personne physique majeure (ou mineure ayant préalablement obtenu l’autorisation de ses parents ou de la personne investie de l'autorité parentale et encadrée par elle lors de la participation au jeu), participant au jeu pour ses besoins propres, dans le cadre d’un usage strictement personnel et non commercial, sans but lucratif direct ou indirect.
                        </Text>
                        <Text style={styles.text}>
                            •	« Contenu » : l’ensemble des publications, textes, images, photographies ou autres objets publiées par l’Utilisateur par le biais de l’application.
                        </Text>
                        <Text style={styles.title_inter}>
                            Installation de l'application
                        </Text>
                        <Text style={styles.text}>
                            En installant l’Application sur son terminal et/ou en accédant à l’Application, l’Utilisateur accepte sans condition ni réserve l’intégralité des CGU définies ci-après.
                            Toute utilisation de l’Application doit se faire dans le respect des présentes CGU.
                            Pour accéder à l’Application et l'utiliser, l’Utilisateur doit posséder un téléphone compatible ou un terminal mobile et un accès au réseau Internet.
                            L’Application est téléchargeable gratuitement depuis la plateforme « Google Play Store » sur les terminaux mobiles suivants :
                        </Text>
                        <Text style={styles.text}>
                            •	téléphone mobile disposant du système d’exploitation Android® à partir de la version 5.1.
                        </Text>
                        <Text style={styles.text}>
                            La version du logiciel de l’Application peut être mise à jour régulièrement pour ajouter de nouveaux éléments d’actualisation des données.
                        </Text>
                        <Text style={styles.text}>
                            Le téléchargement de l’application est réservé à l’usage exclusivement personnel de l’Utilisateur pour le bon déroulement du jeu.
                        </Text>
                        <Text style={styles.title_inter}>
                            Obligations de l'Utilisateur relatives à l'utilisation de l'application:
                        </Text>
                        <Text style={styles.text}>
                            L'Utilisateur s'engage expressément à:
                        </Text>
                        <Text style={styles.text}>
                            •	Ne pas reproduire l’Application en tout ou partie, en tout moyen ou en toute forme ;
                        </Text>
                        <Text style={styles.text}>
                            •	Ne pas utiliser de logiciels ou de procédés destinés à copier le contenu de l'application sans l'autorisation de la LPO AuRA;
                        </Text>
                        <Text style={styles.text}>
                            •	Ne pas exporter l'Application ou la fusionner avec d'autres programmes informatiques;
                        </Text>
                        <Text style={styles.text}>
                            •	Ne procéder à aucune adaptation, transcription, modification, arrangement, compilation, décompilation, assemblage, transcodage de tout ou partie de l'Application;
                        </Text>
                        <Text style={styles.text}>
                            •	Ne pas procéder à l'installation de systèmes susceptibles de pirater l'Application;
                        </Text>
                        <Text style={styles.text}>
                            •	Respecter le droit à l'image, le droit d'auteur, le droit à la vie privée et de façon générale tous les droits des personnes pouvant être concernées par les contenus publiés par le biais de l'application;
                        </Text>
                        <Text style={styles.text}>
                            •	S'abstenir de publier tout contenu à caractère diffamatoire, injurieux, discriminatoire, incitant à la haine ou contrevenant d'une quelconque manière aux lois et règlements en vigueur;
                        </Text>
                        <Text style={styles.title_inter}>
                            Données personnelles
                        </Text>
                        <Text style={styles.text}>
                            À ce stade, aucune donnée personnelle n'est recueillie.
                        </Text>
                        <Text style={styles.title_inter}>
                            Limitation de garantie
                        </Text>
                        <Text style={styles.text}>
                            Il appartient à tout Utilisateur de prendre toutes les mesures appropriées de façon à protéger ses propres données et/ou logiciels stockés
                            sur ses équipements informatique et téléphonique contre toute atteinte.
                        </Text>
                        <Text style={styles.text}>
                            L’Utilisateur déclare connaître et accepter les caractéristiques et les limites du réseau Internet et, notamment les caractéristiques fonctionnelles et des performances techniques du réseau internet ;
                            les problèmes liés à la connexion et/ou accès aux sites web ; les problèmes liés à la disponibilité et à l’encombrement des réseaux ;
                            les problèmes liés à la défaillance ou à la saturation des réseaux ; les problèmes liés au transit, à l’accès aux informations mises en ligne, aux temps de réponse pour afficher, consulter, interroger ou autrement transférer des données ;
                            les ruptures d’interruption, l’absence de protection de certaines données contre des détournements éventuels ou piratages, les risques de contamination par d’éventuels virus circulant sur lesdits réseaux, etc. pour lesquelles la responsabilité de la LPO AuRA ne saurait être engagée.
                        </Text>
                        <Text style={styles.text}>
                            Par ailleurs, la LPO AuRA décline toute responsabilité en cas de mauvaise utilisation du terminal et/ou d’incident lié à l’utilisation du terminal lors de l’utilisation de l’Application. Ils déclinent toute responsabilité en cas de dommage de quelque nature que ce soit,
                            causé aux Utilisateurs, à leurs terminaux, à leurs équipements informatiques et téléphoniques et aux données qui y sont stockées ni des conséquences pouvant en découler sur leur activité personnelle.
                            De même, la LPO AuRA n'est pas responsable du fonctionnement des GPS appartenant aux participants.
                            Ils ne sont pas responsables de l’entretien des chemins publics empruntés par les participants à la recherche des caches.
                        </Text>
                        <Text style={styles.title_inter}>
                            Évolution des CGU
                        </Text>
                        <Text style={styles.text}>
                            Les CGU applicables sont celles en vigueur à la date de participation au jeu par le Participant.
                            La LPO AuRA se réservent le droit de modifier, à tout moment, tout ou partie, des dispositions des CGU sans préavis ni information préalable des Participants afin de les adapter aux évolutions techniques, légales ou jurisprudentielles ou lors de la mise en place de nouvelles prestations.
                            Les modifications éventuellement apportées par la LPO AuRA aux CGU seront portées à la connaissance des Participants par leur simple mise en ligne. Elles sont réputées acceptées sans réserve par tout Participant qui participe au jeu postérieurement à ladite mise en ligne.
                        </Text>
                        <Text style={styles.title_inter}>
                            Contact
                        </Text>
                        <Text style={styles.text}>
                            Toute question relative au jeu et/ou aux services doit être adressée par courrier postal à l'adresse suivante: la LPO AuRA dt Loire - 11 rue René Cassin - 42100 Saint-Etienne
                        </Text>
                        <Text style={styles.title_inter}>
                            Loi applicable
                        </Text>
                        <Text style={styles.text}>
                            Les présentes CGU sont soumises à la loi française.
                        </Text>
                        <Text style={styles.text}>
                            La participation au jeu implique l'acceptation sans réserve des dispositions des présentes CGU.
                        </Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default CGU;