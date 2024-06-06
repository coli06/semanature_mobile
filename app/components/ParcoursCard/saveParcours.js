import AsyncStorage from "@react-native-async-storage/async-storage";
import { getParcoursContents } from "../../utils/queries";
import NetInfo from "@react-native-community/netinfo";

/**
 * sauvegarde le parcours en local si nécaissaire
 * @param {*} parcours 
 */
export default async function saveParcours(parcours) {
	try {
        const state = await NetInfo.fetch();
        if (!state.isInternetReachable) {
            return Promise.reject("internet indisponible");
        }
    } catch (error) {
        return Promise.reject("Erreur lors de la vérification de la connexion Internet");
    }

	// ajoute la commune aux communes connues en local
	const temp = await AsyncStorage.getItem('commune');
	if (temp == null) {
		await AsyncStorage.setItem('commune', JSON.stringify([parcours.commune]));
	} else {
		const communes = JSON.parse(temp);
		if (!communes.includes(parcours.commune)) {
			communes.push(parcours.commune);
			await AsyncStorage.setItem('commune', JSON.stringify(communes));
		}
	}

	// ajoute le parcours
	temp = await AsyncStorage.getItem(parcours.identifiant);
	if (temp == null || temp != 0) {
		let etapes;
		etapes = await getParcoursContents(parcours.identifiant);
		if (etapes == null || etapes == {}) {
			return Promise.reject("Couldn't get parcours from firebase");
		}
		etapes.general.length = etapes.etapes.length;
		await saveObject(parcours.identifiant, JSON.stringify(etapes));
	}

	// ajoute le parcours à la commune
	temp = await AsyncStorage.getItem('commune.' + parcours.commune);
	if (temp == null) {
		await AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify([parcours]));
	} else {
		let ids = JSON.parse(temp);
		if (ids.find((item) => item.identifiant == parcours.identifiant) == undefined) {
			ids.push(parcours);
		}
		await AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify(ids));
	}
	saveGameHistory(parcours, parcours.general.score);
	return Promise.resolve();
}

export async function telechargerParcours(parcours) {
	try {
        const state = await NetInfo.fetch();
        if (!state.isInternetReachable) {
            return Promise.reject("Internet connection unavailable");
        }
    } catch (error) {
        return Promise.reject("Error during Internet connection verification");
    }

	// ajoute la commune aux communes connues en local
	let temp = await AsyncStorage.getItem('commune');
	if (temp == null) {
		await AsyncStorage.setItem('commune', JSON.stringify([parcours.commune]));
	} else {
		let communes = JSON.parse(temp);
		if (!communes.includes(parcours.commune)) {
			communes.push(parcours.commune);
			await AsyncStorage.setItem('commune', JSON.stringify(communes));
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
		await (parcours.identifiant, JSON.stringify(etapes));
	}

	// ajoute le parcours à la commune
	temp = await AsyncStorage.getItem('commune.' + parcours.commune);
	if (temp === null) {
		await AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify([parcours]));
	} else {
		const parcoursIds = JSON.parse(temp);
		if (!parcoursIds.find(item => item.identifiant === parcours.identifiant)) {
			parcoursIds.push(parcours);
			await AsyncStorage.setItem('commune.' + parcours.commune, JSON.stringify(parcoursIds));
		}
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
	await AsyncStorage.setItem('gameHistory', JSON.stringify(history));
}

/**
 * Sauvegarde un objet en le découpant en plusieurs morceaux pour ne pas
 * dépasser la taille limite de 2Mo par objet stocké
 * @param {String} key 
 * @param {String} object 
 */
export async function saveObject(key, object) {
	// Base64-encoded data -> str.length = espace occuper par l'objet en Mo
	const cutSize = 1000000;
	let nbCuts = Math.ceil(object.length / cutSize);

	// clé + morceau de l'objet dans une case du tableau
	let cuts = new Array();
	for (let i = 0; i < nbCuts; i++) {
		cuts.push([key + '.' + i, object.slice(i * cutSize, (i + 1) * cutSize)])
	}

	// stockage
	await AsyncStorage.setItem(key, nbCuts.toString())
	await AsyncStorage.multiSet(cuts);
}

