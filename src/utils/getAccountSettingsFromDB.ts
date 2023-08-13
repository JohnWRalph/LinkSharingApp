import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { push } from "svelte-spa-router";
import { displayNameStore, hashStore, userPhotoStore } from "../store/account";

async function getAccountSettingsfromDB(uid) {
    if (uid === "") {
        push("/")
        return
    }

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    //set links to firebase
    const db = getFirestore(app);

    const docRef = doc(db,"profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        hashStore.set(docSnap.data().hash);
        userPhotoStore.set(docSnap.data().userPhoto);

    } else {
   
    }
}

export { getAccountSettingsfromDB };