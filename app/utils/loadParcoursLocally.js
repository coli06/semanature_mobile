import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getParcoursFromCommuneLocally(cityName) {
	let temp = await AsyncStorage.getItem('commune.' + cityName);
	temp = (temp == null) ? new Array() : JSON.parse(temp);
	return temp;
}

/**
 * load the parcours from the disque, return null if there is a problem to get the parcours
 * @param identifiant 
 * @returns {promise<{ general: parcours, etapes: etapes } | null>}
 */
export default async function loadParcoursLocally(identifiant) {
	console.log("load the id " + identifiant);
	let temp = await loadObject(identifiant);
	if (temp != "") {
		return JSON.parse(await loadObject(identifiant));
	} else {
		return null;
	}
}

/**
 * Récuère un objet du stockage
 * @param {String} key 
 * @returns String
 */
async function loadObject(key) {

	// Base64-encoded data -> str.length = espace occuper par l'objet en Mo
	const cutSize = 1000000;
	let nbCuts = parseInt(await AsyncStorage.getItem(key));

	// clés de tous les morceaux de l'objet
	let keys = new Array();
	for (let i = 0; i < nbCuts; i++) {
		keys.push(key + '.' + i);
	}

	// récupération des morceaux de l'objet
	let cuts = await AsyncStorage.multiGet(keys);

	// reconstitution de l'objet
	let object = "";
	for (let i = 0; i < nbCuts; i++) {
		object = object + (cuts[i][1] ?? "");
	}
	return object;
}

export async function loadGameHistory() {
	let history = await AsyncStorage.getItem('gameHistory');
	return history ? JSON.parse(history) : [];
}
