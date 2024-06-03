import AsyncStorage from "@react-native-async-storage/async-storage";
import loadParcoursLocally from "./loadParcoursLocally";

/**
 * delete the parcours from disk
 * @param identifiant 
 * @returns 
 */
export default async function deleteLocalParcours(identifiant) {
	console.log("deleting the id " + identifiant);
	let temp = await loadParcoursLocally(identifiant);
	if (temp == null) {// le parcours n'est pas sur le disque
		console.log("Parcours already gone...")
		return undefined;
	} else {

		// obtention des informations générales
		let parcours = temp.general;

		// suppression du parours et de ses étapes
		deleteObject(identifiant);

		//suppression de l'id dans la commune
		let commune = parcours.commune;
		temp = await AsyncStorage.getItem("commune." + commune);
		if (temp != null) {
			let walks = JSON.parse(temp);
			walks = walks.filter((item) => item.identifiant != identifiant);
			if (walks.length > 0) {
				AsyncStorage.setItem("commune." + commune, JSON.stringify(walks));
			} else {

				// suppression de la commune si plus de parcours
				AsyncStorage.removeItem("commune." + commune);
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
	await AsyncStorage.getItem(key);
}