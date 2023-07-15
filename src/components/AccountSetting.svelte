<script lang="ts">
    import { email } from "../store/profile";
    import { hashStore } from "../store/account";
    import { initializeApp } from "firebase/app";
    import {
        doc,
        getDoc,
        getFirestore,
        setDoc,
        updateDoc,
    } from "firebase/firestore";
    import { alertMessage, alertState } from "../store/alert";
    import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

    async function updateUserProfile(email, avatar, displayedName, hash) {
        if (avatar) {
            avatar = avatar.src;
        }
        console.log("avatar", avatar);
        console.log("displayedName", displayedName);
        console.log("hash", hash);

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (displayedName) {
                    async function updateDisplayName(displayName) {
                        // console.log(userPhoto);
                        const firebaseConfig = {
                            apiKey: import.meta.env.VITE_API_KEY,
                            authDomain: import.meta.env.VITE_AUTH_DOMAIN,
                            projectId: import.meta.env.VITE_PROJECT_ID,
                            storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
                            messagingSenderId: import.meta.env
                                .VITE_MESSAGING_SENDER_ID,
                            appId: import.meta.env.VITE_APP_ID,
                            measurementId: import.meta.env.VITE_MEASUREMENT_ID,
                        };
                        // Initialize Firebase

                        //update hash field
                        const app = initializeApp(firebaseConfig);

                        //set links to firebase
                        const db = getFirestore(app);
                        const docRef = doc(db, "profiles", user.uid);

                        await updateDoc(docRef, {
                            displayName: displayName,
                        }).then(() => {
                            alertState.set("success");
                            alertMessage.set("Profile Updated!");
                        });
                    }
                    updateDisplayName(displayedName);
                }
                if (avatar) {
                    async function updatePhoto(userPhoto) {
                        console.log(userPhoto);
                        const firebaseConfig = {
                            apiKey: import.meta.env.VITE_API_KEY,
                            authDomain: import.meta.env.VITE_AUTH_DOMAIN,
                            projectId: import.meta.env.VITE_PROJECT_ID,
                            storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
                            messagingSenderId: import.meta.env
                                .VITE_MESSAGING_SENDER_ID,
                            appId: import.meta.env.VITE_APP_ID,
                            measurementId: import.meta.env.VITE_MEASUREMENT_ID,
                        };
                        // Initialize Firebase

                        //update hash field
                        const app = initializeApp(firebaseConfig);

                        //set links to firebase
                        const db = getFirestore(app);
                        const docRef = doc(db, "profiles", user.uid);

                        await updateDoc(docRef, {
                            userPhoto: userPhoto,
                        }).then(() => {
                            alertState.set("success");
                            alertMessage.set("Profile Updated!");
                        });
                    }
                    updatePhoto(avatar);
                }
                if (displayedName) {
                    updateProfile(auth.currentUser, {
                        displayName: displayedName,
                    })
                        .then(() => {
                            alertState.set("success");
                            alertMessage.set("Profile Updated!");
                            // ...
                        })
                        .catch((error) => {
                            // An error occurred
                            // ...
                        });
                }
                if (hash) {
                    async function updateHash(hash) {
                        console.log(hash);
                        const firebaseConfig = {
                            apiKey: import.meta.env.VITE_API_KEY,
                            authDomain: import.meta.env.VITE_AUTH_DOMAIN,
                            projectId: import.meta.env.VITE_PROJECT_ID,
                            storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
                            messagingSenderId: import.meta.env
                                .VITE_MESSAGING_SENDER_ID,
                            appId: import.meta.env.VITE_APP_ID,
                            measurementId: import.meta.env.VITE_MEASUREMENT_ID,
                        };
                        // Initialize Firebase

                        //update hash field
                        const app = initializeApp(firebaseConfig);

                        //set links to firebase
                        const db = getFirestore(app);
                        const docRef = doc(db, "profiles", user.uid);

                        await updateDoc(docRef, {
                            hash: hash,
                        }).then(() => {
                            alertState.set("success");
                            alertMessage.set("Profile Updated!");
                        });
                    }
                    updateHash(hash);
                }
            } else {
            }
        });
    }

    let image: any;
    let displayName;
    let hash;
    let input;
    let container;
    let showImage = false;

    function onChange() {
        const file = input.files[0];
        if (file) {
            showImage = true;

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);

            return;
        }
        showImage = false;
    }
</script>

<div class="settingsHeaderContainer">
    <h1 class="settingsHeader font-bold">Profile Details</h1>
    <p class="">
        Add or edit your details to create a personal touch to your profile.
    </p>
</div>

<div class="editSubBodyContainer">
    <div class="subBodyLeft">
        <p class="">Profile Picture</p>
    </div>

    <div class="subBodyRight">
        <div
            bind:this={container}
            style="position:relative;"
            id="profilePicture"
        >
            {#if showImage}
                <img
                    bind:this={image}
                    style="width:100%; height:100%;border-radius:10px;"
                    class="bg-neutral-focus text-neutral-content"
                    src=""
                    alt="avatar"
                />
            {:else}
                <!-- <span bind:this={placeholder}>Image Preview</span> -->
            {/if}

            <form
                style="position:absolute; top:0; height:150px; display:flex; flex-direction:column; justify-content:center; align-items:center"
            >
                <label
                    style="color:white;    height: 150px;
                width: 150px;
                display: flex;
                flex-direction: column;
                "
                    for="fileInput"
                    ><img
                        style="width:50px;height:50px;"
                        src="../add_image.svg"
                    /></label
                >
                <input
                    style="display:none;"
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    accept="image/*"
                    bind:this={input}
                    on:change={onChange}
                />
            </form>
        </div>
    </div>
</div>

<div style="border-radius: 20px; overflow:hidden;margin-bottom:20px;">
    <div class="editSubBodyNameInput">
        <div class="subBodyLeft">
            <p class="">Display Name</p>
        </div>
        <div class="subBodyRight">
            <input
                bind:value={displayName}
                type="text"
                placeholder="Type here"
                class="input input-bordered input-primary w-full max-w-xs"
            />
        </div>
    </div>
    <div class="editSubBodyNameInput">
        <div class="subBodyLeft">
            <p class="">Change Link</p>
        </div>

        <div class="subBodyRight">
            example.com/profile/<input
                style="width: 100px; margin-right:5px;margin-left:5px;"
                bind:value={hash}
                type="text"
                placeholder="Type here"
                class="input input-bordered input-primary w-full max-w-xs"
            />
        </div>
    </div>
    <div class="editSubBodyNameInput">
        <div class="subBodyLeft">
            <p class="">Current Link</p>
        </div>

        <div class="subBodyRight">
            example.com/profile/{$hashStore}
        </div>
    </div>
</div>

<div />

<button
    class="btn btn-primary"
    style="width:100%; margin-top:20px;"
    on:click={() => updateUserProfile($email, image, displayName, hash)}
>
    Save Changes
</button>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .accountSettingsBody {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: white;
    }

    .settingsHeader {
        display: flex;
        flex-direction: column;
        justify-content: left;
    }
    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f2f2f2;
        width: 100%;
        padding: 1rem;
        margin-bottom: 20px;
    }
    .settingsHeader {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .settingsHeaderContainer {
        text-align: left;
    }

    .editSubBodyContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: #f2f2f2;
        width: 100%;
        padding: 1rem;
        margin-bottom: 20px;
        border-radius: 20px;
    }
    .editSubBodyHeader {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        margin-top: 20px;
        align-items: center;
    }
    .editSubBodyNameInput {
        display: flex;
        flex-direction: row;
        align-items: center;

        background-color: #f2f2f2;
        width: 100%;
        padding: 1rem;
    }
    .subBodyLeft {
        width: 40%;
        text-align: left;
        /* margin-bottom: 1rem; */
    }

    .subBodyRight {
        width: 60%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sortable_item {
        /* display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #f2f2f2;
        width: 90%;
        padding: 1rem;
        margin-bottom: 1rem; */
        margin-bottom: 20px;
    }

    .select {
        width: 100%;
    }
    .handle-bottom {
        /* background-color: rgb(154, 154, 154); */
        border: 1px solid black;
        width: 100%;
        height: 30px;
    }
    .handle-top {
        background-color: black;
    }
    #profilePicture {
        width: 150px;
        height: 150px;
        /* border: 2px solid black; */
        background-color: white;
        border-radius: 10px;
        display: flex;
    }
</style>
