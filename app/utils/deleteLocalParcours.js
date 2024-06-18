import AsyncStorage from "@react-native-async-storage/async-storage";
import loadParcoursLocally, { getParcoursFromCommuneLocally } from "./loadParcoursLocally";

/**
 * delete the parcours from disk
 * @param identifiant 
 * @returns 
 */
export default async function deleteLocalParcours(identifiant, commune) {
	console.log("deleting the id " + identifiant);
	let temp = await getParcoursFromCommuneLocally(commune);
	temp = temp.filter((item) => item.identifiant === identifiant);
	if (temp == null) { // le parcours n'est pas sur le disque
		console.log("Circuit not in storage...")
		return undefined;
	} else { //suppression de l'id dans la commune
		temp = await AsyncStorage.getItem("commune." + commune);
		if (temp != null) {
			let walks = JSON.parse(temp);
			walks = walks.filter((item) => item.identifiant != identifiant);
			console.log(walks);
			if (walks.length > 0) {
				AsyncStorage.setItem("commune." + commune, JSON.stringify(walks));
			} else {
				AsyncStorage.removeItem("commune." + commune);
				// suppression de la commune si plus de parcours
				temp = await AsyncStorage.getItem("commune");
				if (temp != null) {
					let communes = JSON.parse(temp);
					communes = communes.filter((item) => item != commune);
					AsyncStorage.setItem("commune", JSON.stringify(communes));
				}
			}
		}
	}
	return Promise.resolve();
}

/**
 * Suprimme un objet du stockage
 * @param {String} key 
 * @returns void
 */
async function deleteObject(key) {

	// Base64-encoded data -> str.length = espace occupé par l'objet en Mo
	const cutSize = 1000000;
	let nbCuts = parseInt(await AsyncStorage.getItem(key));

	// clés de tous les morceaux de l'objet
	let keys = new Array();
	for (let i = 0; i < nbCuts; i++) {
		keys.push(key + '.' + i);
	}

	// Supression des morceaux de l'objet
	await AsyncStorage.multiRemove(keys);
	await AsyncStorage.removeItem(key);
}