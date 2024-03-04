<div align="center">
    <img src="./assets/icon.png" alt="Logo" width="200" height="200">
    <h3 align="center">Scrute la Nature</h3>
    <p align="center">Une application pour la protection de la Nature</p>
</div>

<details>
	<summary>Sommaire</summary>
	<ol>
		<li><a href="#le-projet">Le Projet</a></li>
		<li><a href="#nom-de-lapplication">Nom de l'application</a></li>
		<li><a href="#auteurs">Auteurs</a></li>
	</ol>
</details>

## Le Projet

Ce projet s'inscrit dans le cadre du Projet Recherche et Innovation de 2023. Il fait suite à un Projet Ingénierie 2023 et un PRI 2022.

## Nom de l'application

Le nom de l'application peut se changer à tout moment en modifiant les fichiers suivants : 
- `app.json`
- `package.json` et `package-lock.json`
- `android/app/src/main/res/values/strings.xml`

## Auteurs

- Sarah-Marie Jules
- Houda Sbai
- Chems Jouaiti
- Mariam Khanfri
- Mathis Thuel-Chassaigne
- Tibo Preher
- Valentin Pontiggia
- Matthieu d'Hoop


# Fonctinalité pour le devellopement futur

## Stockage local

Le système actuel de stockage fonctionne avec AsyncStorage. Cette technologie est limité en terme de stockage max (uniquement sur Android). 2MB par insert et 6MB par transaction. 
Le bug est actuelement que sur les Androids, le téléchargement des parcours volumineux sont impossibles. Le parcours reste utilisable hors connection après le lancement de celui-ci mais on ne peut pas le telecharger.

Les pistes à explorer pour l'instant (01/2024) sont les librairies ExpoFileSystem et MMKV.

- La librairie ExpoFileSyteme à déja une implémentation dans la branche Bug/Stockage_Interne. Cette implémentation est incomplète : Il manque l'initialisation des fichiers et surement des bugs simples.

- La librairie MMKV est très bien mais pour l'instant c'est un enfer à implémenté avec Expo. Elle possède une compatibilité quasi totale avec AsyncStorage.

## Realease et déploiement mobile

Pour déployer l'application, il est nécessaire de générer un .aab avec la même clé que le projet. 

Pour cela, nous utilisons un compte ExpoGo combiné avec eas.

Étapes à suivre :
- Installer le module eas.
```bash
$ npm install -g eas-cli
```
- Se connecter au compte develloper de la lpo sur expo avec eas (demander à béatrice les logins mdp de l'app mobile, sinon demander à Tibo Preher).
```bash
$ eas login
```
- Builder le projet sur Expo : 
```bash
$ eas build --platform android
```

L'utilisateur obtient alors un lien pour télécharger le .aab qu'il faudra mettre en ligne sur le compte 
Google PlayStore. Il est important que chaque version mise en ligne ai un numéro de build 
différent:
- Connexion a la google playstore console avec le compte devlpo : https://play.google.com/console/u/1/developers/7483810268087091411/app-list
- Choisir l'application Scrute la Nature
- Production -> Realease -> Modifier la version
- Uploader le fichier .aab telecharger aver le lien a la fin du build expo.
- Pousser la realease en prod, google va l'examinner(2 jours).
- Pousser la realease sur le playstore en confirmant.

