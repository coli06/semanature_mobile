//import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, DEFAULT_USER_EMAIL, OBFUSCATED_DEFAULT_USER_PASSWORD} from '@env';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      firebaseApiKey: process.env.API_KEY,
      firebaseAuthDomain: process.env.AUTH_DOMAIN,
      firebaseProjectId: process.env.PROJECT_ID,
      firebaseStorageBucket: process.env.STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.MESSAGING_SENDER_ID,
      firebaseAppId: process.env.APP_ID,
      firebaseDefaultUserEmail: process.env.DEFAULT_USER_EMAIL,
      firebaseObfuscatedDefaultUserPassword: process.env.OBFUSCATED_DEFAULT_USER_PASSWORD,
      eas: {
        projectId: "8caa5721-b096-47e9-b4b1-abdc4b019ed5"
      }
    },
  };
};