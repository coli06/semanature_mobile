# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2024-06-25

### Added

- Lecture d'au plus un fichier audio par étape (hors résultats de jeu)

- Sélectionner un parcours sur la carte fait apparaître un bouton redirigeant vers un résumé de ce dernier, à partir de laquelle il est possible de le télécharger.

- Téléchargement des données de parcours localement avec le package SQLite d'Expo, qui n'a pas de limite de stockage inhérente (stockage libre du téléphone) et est très flexible grâce à la possibilité d'effectuer differentes requêtes, évitant de stocker plusieurs fois des données similaires à des endroits différents.

### Changed

- La carte dispose maintenant de son écran de chargement, avec message d'erreur si Internet est indisponible. Cette dernière s'affiche tout de même si la position est activée et ajuste l'échelle afin de voir l'ensemble des parcours existants sur l'écran. Si la position est disponible, le comportement est le même à la différence près que la position de l'utilisateur est aussi visible sur l'écran.

- Les scores de chaque parcours sont visibles dans leur résumé, que ces derniers soient téléchargés ou non.

### Removed

- Sauvegarde locale des parcours avec AsyncStorage abandonnée car trop peu de volume disponible par rapport au volume de données que représentent les parcours.

### Fixed

- Résolution du bug d'affichage des communes connues en local pour la recherche de communes hors-ligne.

## [1.5.1] - 2024-06-17

### Fixed

- Ajustement des tags de version (devant être uniques) pour permettre la mise en ligne sur le Play Store

## [1.5.0] - 2024-06-15
(Erreur dans le choix du numéro de version, le changement de SDK aurait justifié le pasage à la version 2.0.0)

### Added

- Affichage de la position de l'utilisateur et des parcours sur la carte.

### Changed

- Mise à niveau du Software Development Kit (SDK) d'Expo depuis la version 48 à la version 50 ainsi que d'autres packages qui en avaient besoin afin de pouvoir exécuter le projet.

- Chargement du contenu d'un parcours une seule fois au début du parcours, et plus à chaque étape du parcours. Ce dernier point étant la cause des plantages en cours de parcours.

- Téléchargement local obligatoire afin de clarifier le fonctionnement de la gestion des parcours.

- Changement, suppression et déplacement de logos.

- Changement du nom de l'application de "Scrute la Nature" à "Scrute la nature" à tout les endroits où on le retrouvait (textes de l'application, code et Play Store).

- Améliorations graphiques mineures, notamment pour l'affichage des caractéristiques d'un parcours (durée, difficulté et commune).

### Removed

- Possibilité de démarrer un parcours avec une connexion Internet sans le télécharger en local.

### Fixed

- Problème de numérotation des étapes dans le bandeau supérieur (incorrecte ou inexistante selon les cas) résolu après la résolution du bug majeur, ayant permis la conservation des mêmes données au long du parcours.

### Security

- Déplacement des liens et identifiants d'accès à la base de données Firebase dans un fichier .env pour l'exécution locale et dans les Secrets du projet Expo pour le build afin de ne les retrouver ni dans le Git ni dans le code de l'application téléchargé depuis le Play Store.
