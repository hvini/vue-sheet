import firebase from 'firebase'

const config = {
    /* Firestore config */
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();

export { db }