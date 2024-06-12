// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import Constants from 'expo-constants';
import unOffuscate from "./unOffuscate";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: Constants.expoConfig.extra.firebaseApiKey,
	authDomain: Constants.expoConfig.extra.firebaseAuthDomain,
	projectId: Constants.expoConfig.extra.firebaseProjectId,
	storageBucket: Constants.expoConfig.extra.firebaseStorageBucket,
	messagingSenderId: Constants.expoConfig.extra.firebaseMessagingSenderId,
	appId: Constants.expoConfig.extra.firebaseAppId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const autoSignIn = async () => {
	try {
		const email = Constants.expoConfig.extra.firebaseDefaultUserEmail;
		const password = Constants.expoConfig.extra.firebaseObfuscatedDefaultUserPassword;
		await signInWithEmailAndPassword(auth, email, unOffuscate(password));
		console.log("Utilisateur connecté avec succès !");
		// Vous pouvez exécuter d'autres actions après la connexion réussie ici
	} catch (error) {
		console.log("Erreur lors de la connexion :", error);
	}
};


// Initialize Firebase

export const db = getFirestore(app);
