import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { links } from "../store/links";

async function getLinksFromDB(uid) {

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

    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      try {
          var storedLinks = docSnap.data().links;
        let i = 0;
        storedLinks.forEach(element => {
            storedLinks[i] = [storedLinks[i]]
            i++;
        });
        links.set(storedLinks);
      }catch (error) {
          console.log(error)
      }
          

       


    } else {
        // doc.data() will be undefined in this case

    }
}

export { getLinksFromDB };