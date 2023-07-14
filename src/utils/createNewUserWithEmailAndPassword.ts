import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    sendEmailVerification,
    updateProfile

} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { push } from "svelte-spa-router";
import { emailAddress, hashStore, userAccount } from "../store/account";
import { alertState, alertMessage } from "../store/alert";
import errorMessage from "../store/errorMessage";
import isLoggedIn from "../store/isLoggedIn";


async function createNewUserWithEmailAndPassword(
    auth,
    newEmailAddress,
    newPassword1,
    newPassword2,
    profileHash
): Promise<any> {
    //if no email address set error message
    if (!newEmailAddress) {
        alertState.set("error");
        alertMessage.set("Please enter an email address");
        setTimeout(() => {
            alertState.set("");
            alertMessage.set("");
        }, 3000);
        return;
    }

    //if no password set error message
    if (!newPassword1) {
        alertState.set("error");
        alertMessage.set("Please enter a password");
        setTimeout(() => {
            alertState.set("");
            alertMessage.set("");
        }, 3000);
        return;
    }
    const passwordRegex = /^[^\s]{8,20}$/;
    if (!passwordRegex.test(newPassword1)) {
        alertState.set("error");
        alertMessage.set(
            "Password must be 8-20 characters long and contain no spaces"
        );
        setTimeout(() => {
            alertState.set("");
            alertMessage.set("");
        }, 3000);
        return;
    }
    //if no password set error message
    if (!newPassword2) {
        alertState.set("error");
        alertMessage.set("Please confirm your password");
        setTimeout(() => {
            alertState.set("");
            alertMessage.set("");
        }, 3000);
        return;
    }
    console.log(newPassword1, newPassword2)
    //passwords must match
    if (newPassword1 !== newPassword2) {
        alertState.set("error");
        alertMessage.set("Passwords do not match");
        setTimeout(() => {
            alertState.set("");
            alertMessage.set("");
        }, 3000);
        return;
    }
    console.log(profileHash)
    //if no profile link set error message
    if (!profileHash) {
        alertState.set("error");
        alertMessage.set("Please enter a profile link");
        setTimeout(() => {
            alertState.set("");
            alertMessage.set("");
        }, 3000);
        return;
    }
    //profile link Must be 0-9, a-z, A-Z, no spaces, and 3-20 characters long
    const profileHashRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!profileHashRegex.test(profileHash)) {
        alertState.set("error");
        alertMessage.set(
            "Profile link must be 3-20 characters long and contain only letters and numbers, no spaces"
        );
        setTimeout(() => {
            alertState.set("");
            alertMessage.set("");
        }, 3000);
        return;
    }
    createUserWithEmailAndPassword(auth, newEmailAddress, newPassword1)
        .then(async (userCredential) => {
            // Signed in
            console.log(userCredential)
            userAccount.set(userCredential.user);
            
            const user = userCredential.user;
            const useruid = user.uid;
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    alertMessage.set("Email verification sent to " + user.email);
                })

            emailAddress.set(user.email);
            alertMessage.set(
                "Account Created! Next step: Sign In! User is " + user.email
            );
                isLoggedIn.set(true);
                push("/myProfile");
            //write to firestore database
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
            const firebaseApp = initializeApp(firebaseConfig);

            //create doc in firestore
            const db = getFirestore(firebaseApp);

            // Add a new document in collection, then log promise
            // const docRef = doc(db, profileHash, "profileContent");
            await setDoc(doc(db, "profiles", user.uid), {
                email: user.email,
                hash: profileHash,
            }).then(() => {
                hashStore.set(profileHash);
                let status = "success";
                return status;
            });


            push("/myProfile")
            return new Promise((resolve, reject) => {
                resolve(user);
            });


            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            if (errorCode === "auth/email-already-in-use") {
                errorMessage.set("Email already in use.");
                setTimeout(() => {
                    errorMessage.set("");
                }, 3000);
            }
        });
}
export default createNewUserWithEmailAndPassword;