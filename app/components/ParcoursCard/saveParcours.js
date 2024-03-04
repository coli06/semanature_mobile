import AsyncStorage from "@react-native-async-storage/async-storage";
import { getParcoursContents } from "../../utils/queries";
import NetInfo from "@react-native-community/netinfo";

/**
 * sauvegarde le parcours en local si nécaissaire
 * @param {*} parcours 
 */
export default async function saveParcours(parcours) {
	let tmp = NetInfo.fetch()
	let connexionAvailable;
	tmp.then((state) => connexionAvailable = state.isInternetReachable)
	await tmp;
	if (!connexionAvailable) {
		return Promise.reject("internet indisponible");
	}

	// ajoute la commune aux communes connues en local
	let temp = await AsyncStorage.getItem('commune');
	if (temp == null) {
		AsyncStorage.setItem('commune', JSON.stringify([parcours.commune]));
	} else {
		let communes = JSON.parse(temp);
		if (communes.find((item) => item == parcours.commune) === undefined) {
			communes.push(parcours.commune);
			AsyncStorage.setItem('commune', JSON.stringify(communes));
		}
	}

	// ajoute le parcours
	temp = await AsyncStorage.getItem(parcours.identifiant);
	if (temp == null || temp != 0) {
		let etapes;
		etapes = await getParcoursContents(parcours.identifiant);
		if (etapes == null || etapes == {}) {
			return Promise.reject("Couldn't get parcours from fireBase");
		}
		etapes.general.length = etapes.etapes.length;
		saveObject(parcours.identifiant, JSON.stringify(etapes));
	}

	// ajoute le parcours à la commune
	temp = await AsyncStorage.getItem('commune.' + parcours.commune);
	if (temp == null) {
		AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify([parcours]));
	} else {
		let ids = JSON.parse(temp);
		if (ids.find((item) => item.identifiant == parcours.identifiant) == undefined) {
			ids.push(parcours);
		}
		AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify(ids));
	}
	saveGameHistory(parcours, parcours.general.score);
	return Promise.resolve();

}

export async function telechargerParcours(parcours) {
	let tmp = NetInfo.fetch()
	let connexionAvailable;
	tmp.then((state) => connexionAvailable = state.isInternetReachable)
	await tmp;
	if (!connexionAvailable) {
		return Promise.reject("internet indisponible");
	}

	// ajoute la commune aux communes connues en local
	let temp = await AsyncStorage.getItem('commune');
	if (temp == null) {
		AsyncStorage.setItem('commune', JSON.stringify([parcours.commune]));
	} else {
		let communes = JSON.parse(temp);
		if (communes.find((item) => item == parcours.commune) === undefined) {
			communes.push(parcours.commune);
			AsyncStorage.setItem('commune', JSON.stringify(communes));
		}
	}

	// ajoute le parcours
	temp = await AsyncStorage.getItem(parcours.identifiant);
	if (temp == null || temp != 0) {
		let etapes;
		etapes = await getParcoursContents(parcours.identifiant);
		if (etapes == null || etapes == {}) {
			return Promise.reject("Couldn't get parcours from fireBase");
		}
		etapes.general.length = etapes.etapes.length;
		saveObject(parcours.identifiant, JSON.stringify(etapes));
	}

	// ajoute le parcours à la commune
	temp = await AsyncStorage.getItem('commune.' + parcours.commune);
	if (temp == null) {
		AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify([parcours]));
	} else {
		let ids = JSON.parse(temp);
		if (ids.find((item) => item.identifiant == parcours.identifiant) == undefined) {
			ids.push(parcours);
		}
		AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify(ids));
	}
	return Promise.resolve();

}

export async function saveGameHistory(parcours, myscore) {
	let history = await AsyncStorage.getItem('gameHistory');
	history = history ? JSON.parse(history) : [];

	// Ajoute le jeu actuel à l'historique
	history.push({
		parcoursId: parcours.identifiant,
		commune: parcours.general.commune,
		name: parcours.general.titre,
		score: myscore,
		scoreMax: parcours.general.score_max,
		date: new Date().toISOString(),
	});

	// Sauvegarde de l'historique mis à jour
	AsyncStorage.setItem('gameHistory', JSON.stringify(history));
}

/**
 * sauvegarde un objet en la découpant en plusieurs morceau pour ne pas
 * dépasser la taille limite de 2Mo par objets stocké
 * @param {String} key 
 * @param {String} object 
 */
export function saveObject(key, object) {


	// Base64-encoded data -> str.length = espace occuper par l'objet en Mo
	const cutSize = 1000000;
	let nbCuts = Math.ceil(object.length / cutSize);

	// clé + morceau de l'objet dans une case du tableau
	let cuts = new Array();
	for (let i = 0; i < nbCuts; i++) {
		cuts.push([key + '.' + i, object.slice(i * cutSize, (i + 1) * cutSize)])
	}

	// stockage
	AsyncStorage.setItem(key, nbCuts.toString())
	AsyncStorage.multiSet(cuts);
}

