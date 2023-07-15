import axios from "axios";
import {

    signInWithEmailAndPassword,
} from "firebase/auth";
import { push } from "svelte-spa-router";
import { userAccount } from "../store/account";
import errorMessage from "../store/errorMessage";

async function signInExistingUserByEmailAndPassword(
    auth,
    emailAddress,
    password
) {
    return signInWithEmailAndPassword(auth, emailAddress, password)

        //return promise of user creditionals
        .then(async (userCredential) => {
            // Signed in
            console.log("userCredential", userCredential);
            userAccount.set(userCredential.user);
            push("/myProfile");


        })
        .catch((error) => {
            const errorCode = error;
            if (errorCode === "auth/wrong-password") {
                
                errorMessage.set("Invalid email/password combination.");
                setTimeout(() => {
                    errorMessage.set("");
                }, 3000);
            } else if (errorCode === "auth/invalid-email") {
                // errorState.set("error");
                errorMessage.set("Invalid email/password combination.");
                setTimeout(() => {
                    errorMessage.set("");
                }, 3000);
            } else if (errorCode === "auth/missing-email") {
                errorMessage.set("Missing email.");
                setTimeout(() => {
                    errorMessage.set("");
                }, 3000);
            } else if (errorCode === "auth/missing-password") {
                errorMessage.set("Missing password");
                setTimeout(() => {
                    errorMessage.set("");
                }, 3000);
            } else {
                errorMessage.set("Error logging in.");
                setTimeout(() => {
                    errorMessage.set("");
                }, 3000);
            }
        });
}

export default signInExistingUserByEmailAndPassword;