import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

async function setLinksToDB(uid, links) {
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
    //get doc
    // const docRef = doc(db, "profiles", uid);
    // //log doc
    // console.log(docRef)
    console.log(uid)
    const docRef = doc(db, "profiles", uid,);

    await updateDoc(docRef, {
        links: links,
    }).then(() => {
       console.log("links updated")
        let status = "success";
        return status;
    });
    //set doc
    
   
    // Add a new document in collection, then log promise
//     await setDoc(doc(db,"profiles", uid), {
//         links: links,
//     }).then(() => {
       
//         let status = "success";
//         return status;
//     });
// }
}
export { setLinksToDB };