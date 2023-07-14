<!-- <script lang="ts">
  
    import {
        collection,
        query,
        where,
     
        getFirestore,
    } from "firebase/firestore";
    import { initializeApp } from "firebase/app";
    let profile = "yahoo";

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    };
console.log("hello")
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();
    const profileRef = collection(db, profile);
    
    console.log("profileRef", profileRef);
</script>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
    }
    .linkButtons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
    .Youtube {
        background-color: red;
    }
    .Twitter {
        background-color: #2daae2;
    }
    .Github {
        background-color: black;
    }
    .LinkedIn {
        background-color: #0077b5;
    }
    .linkLogo {
        height: 30px;
    }
</style> -->
<script lang="ts">
    import { initializeApp } from "firebase/app";
    import {
        collection,
        doc,
        setDoc,
        query,
        where,
        getDocs,
        QueryDocumentSnapshot,
    } from "firebase/firestore";
    import { getFirestore } from "firebase/firestore";
    import { displayedProfile } from "../store/account";
    import { push } from "svelte-spa-router";

    const url = window.location.href;
    const profile = url.split("/").pop();
    console.log("url", url);
    console.log("profile", profile);
    //return yahoo from url example.com/profile/yahoo
    const profilehash = profile.split("-").pop();
    console.log("profilehash", profilehash);

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();

    const profilesRef = collection(db, "profiles");
    console.log("profilesRef", profilesRef);

    async function setProfiles() {
        await setDoc(doc(profilesRef, "yahoo"), {
            hash: "yahoo123",
            email: "yahoo@gamil.com",
            links: [
                {
                    platform: "Youtube",
                    url: "https://www.youtube.com/",
                },
                {
                    platform: "Twitter",
                    url: "https://twitter.com/",
                },
                {
                    platform: "Github",
                    url: "",
                },
            ],
        });
        await setDoc(doc(profilesRef, "google"), {
            hash: "google123",
            email: "google@gmail.com",
            links: [
                {
                    platform: "Youtube",
                    url: "https://www.youtube.com/",
                },
                {
                    platform: "Twitter",
                    url: "https://twitter.com/",
                },
                {
                    platform: "Github",
                    url: "",
                },
            ],
        });
        await setDoc(doc(profilesRef, "facebook"), {
            hash: "facebook123",
            email: "facebokk@gmail.com",
            links: [
                {
                    platform: "Youtube",
                    url: "https://www.youtube.com/",
                },
                {
                    platform: "Twitter",
                    url: "https://twitter.com/",
                },
                {
                    platform: "Github",
                    url: "",
                },
            ],
        });
    }

    // setProfiles();

    const q = query(profilesRef);

    async function queryDocs(): Promise<any> {
        const querySnapshot = await getDocs(q);
        // console.log("querySnapshot", querySnapshot,where("hash", "==", profilehash));

        querySnapshot.forEach((doc) => {
            if (doc.data().hash === profilehash) {
                console.log("doc.data()", doc.data());
                const userProfile = {
                    displayName: doc.data().displayName,
                    email: doc.data().email,
                    emailVerified: doc.data().emailVerified,
                    photoURL: doc.data().photoURL,
                    isPublic: doc.data().isPublic,
                    shareLink: doc.data().shareLink,
                    links: doc.data().links,
                };
                displayedProfile.set(userProfile);
            }
        });
    }

    queryDocs();

    let showAccountSettings: boolean = false;
    setTimeout(() => {
        showAccountSettings = true;
    }, 3000);
</script>

<div class="card w-96 bg-base-100 shadow-xl">
    {#if $displayedProfile.photoURL}
        <div>
            <img
                class="bg-neutral-focus text-neutral-content rounded-full w-24"
                src={$displayedProfile.photoURL}
                alt="avatar"
            />
        </div>
    {:else}
        <div class="avatar placeholder">
            <div
                class="bg-neutral-focus text-neutral-content rounded-full w-24"
            >
                <img
                    class="bg-neutral-focus text-neutral-content rounded-full w-24"
                    src="../avatar.svg"
                    alt=""
                />
            </div>
        </div>
    {/if}
    {#if $displayedProfile.email}
        {$displayedProfile.email}
    {/if}
    <br />
    {#if $displayedProfile.displayName}
        {$displayedProfile.displayName}
      
    {/if}
    <div class="linkButtons">
        <!-- {#await $displayedProfile.links && $displayedProfile.links.length}
           -->
        {#if $displayedProfile.links && $displayedProfile.links.length}
            {#each $displayedProfile.links as link, i}
                <div style="display:flex;flex-direction:row;">
                    <button
                        on:click={() => window.open(link.url)}
                        style="justify-content: space-between; border:1px solid black; color:white;"
                        class="btn btn-wide join-item {link.platform}"
                    >
                        <div
                            style="display:flex; align-items:center; gap:10px;"
                        >
                            <img
                                class="linkLogo"
                                src="../{link.platform}.svg"
                            />{link.platform}
                        </div>
                        <img
                            style="width:20px; height:20px;"
                            src="../Arrow-002.svg"
                        /></button
                    >
                </div>
            {/each}
        {:else if showAccountSettings === false}
            loading...
        {:else}
            No links found.
            <button
                class="btn btn-primary"
                on:click={() => push("/editProfile")}>Create Link</button
            >
        {/if}
    </div>
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
    }
    .linkButtons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
    .Youtube {
        background-color: red;
    }
    .Twitter {
        background-color: #2daae2;
    }
    .Github {
        background-color: black;
    }
    .LinkedIn {
        background-color: #0077b5;
    }
    .linkLogo {
        height: 30px;
    }
</style>
