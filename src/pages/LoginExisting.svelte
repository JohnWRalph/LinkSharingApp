<script>
    import { push } from "svelte-spa-router";
    import {
    GoogleAuthProvider,
        getAuth,
        signInWithEmailAndPassword,
        signInWithRedirect,
        signOut,
    } from "firebase/auth";
    import isLoggedIn from "../store/isLoggedIn";
    import { initializeApp } from "firebase/app";

    import { email } from "../store/profile";
    import { alertMessage, alertState } from "../store/alert";
    import { userAccount } from "../store/account";

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    };
    initializeApp(firebaseConfig);
    const auth = getAuth();
    let password = "";
    let emailAddress = "";

    async function loginExistingUser(emailAddress, password) {
        //signinwithfirebase
        console.log("emailAddress", emailAddress);
        console.log("password", password)
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log("user", user);
                email.set(user.email);
                isLoggedIn.set(true);
                userAccount.set(user);
                push("/myProfile");
            })
            .catch((error) => {
                const errorCode = error;
                console.log("error", error);
                console.log("error", errorCode.code);
                if (errorCode.code === "auth/wrong-password") {
                    alertState.set("error");
                    alertMessage.set("Wrong password.");
                    setTimeout(() => {
                        alertState.set("");
                        alertMessage.set("");
                    }, 3000);
                } else if (errorCode.code === "auth/invalid-email") {
                    
                    alertState.set("error");
                    alertMessage.set("Invalid email.");
                    setTimeout(() => {
                        alertState.set("");
                        alertMessage.set("");
                    }, 3000);
                } else if (errorCode.code === "auth/missing-email") {
                    alertState.set("error");
                    alertMessage.set("Missing email.");
                    setTimeout(() => {
                        alertState.set("");
                        alertMessage.set("");
                    }, 3000);
                } else if (errorCode.code === "auth/missing-password") {
                    alertState.set("error");
                    alertMessage.set("Missing password.");
                    setTimeout(() => {
                        alertState.set("");
                        alertMessage.set("");
                    }, 3000);
                } else if (errorCode.code === "auth/user-not-found") {
                    alertState.set("error");
                    alertMessage.set("User not found.");
                    setTimeout(() => {
                        alertState.set("");
                        alertMessage.set("");
                    }, 3000);
                } else {
                    console.log("other error");
                }
            });
    }
</script>

<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    {#if $isLoggedIn}
        <div class="card-body">
            <div class="form-control mt-6">
                <button
                    on:click={() =>
                        signOut(auth)
                            .then(() => {
                                // Sign-out successful.
                                isLoggedIn.set(false);
                                alertState.set("success");
                                alertMessage.set("Logged out.");
                                setTimeout(() => {
                                    alertState.set("");
                                    alertMessage.set("");
                                }, 3000);
                            })
                            .catch((error) => {
                                // An error happened.
                            })}
                    style="width:250px;"
                    class="btn btn-primary">Logout</button
                >
            </div>
        </div>
    {:else}
        <div  class="card-body">
            <div class="form-control">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input
                style="border:1px solid black;"
                    bind:value={emailAddress}
                    type="text"
                    placeholder="email"
                    class="input input-bordered"
                />
                Sample email: devlinksapplogin@gmail.com
            </div>
            <div class="form-control">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <form class="form-control mt-6">
                    <input
                        bind:value={password}
                        style="border:1px solid black;"
                        type="text"
                        placeholder="password"
                        class="input input-bordered"
                    />
                    Sample password: password1
                    <label class="label">
                 
                    </label>
                </form>

                <button
                    class="btn btn-primary"
                    on:click={() => loginExistingUser(emailAddress, password)}
                >
                    Login
                </button>
            </div>
        </div>
    {/if}
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
