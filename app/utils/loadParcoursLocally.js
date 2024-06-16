import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getParcoursFromCommuneLocally(cityName) {
	let temp = await AsyncStorage.getItem('commune.' + cityName);
	temp = (temp == null) ? new Array() : JSON.parse(temp);
	return temp;
}

/**
 * Load the circuit from the disk, return null if there is a problem to get it
 * @param identifiant 
 * @returns {promise<{ general: parcours, etapes: etapes } | null>}
 */
export default async function loadParcoursLocally(identifiant) {
	console.log("Loading circuit with id " + identifiant);
	try {
		let temp = await loadObject(identifiant);
		if (temp != "") {
			return JSON.parse(temp);
		} else {
			console.log("vide");
			return null;
		}
	} catch (error) {
		console.error("Error while loading circuit :", error);
	}
}

/**
 * Load an object from the disk
 * @param {String} key 
 * @returns {String}
 */
async function loadObject(key) {

	let nbCuts = parseInt(await AsyncStorage.getItem(key));

	// clés de tous les morceaux de l'objet
	let keys = new Array();
	for (let i = 0; i < nbCuts; i++) {
		keys.push(key + '.' + i);
	}

	// récupération des morceaux de l'objet
	let cuts = await AsyncStorage.multiGet(keys);
	console.log(cuts);
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
