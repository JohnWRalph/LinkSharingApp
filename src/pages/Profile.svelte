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
    const profilehash = profile.split("-").pop();
  

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
    const q = query(profilesRef);

    async function queryDocs(): Promise<any> {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().hash === profilehash) {
                
                const userProfile = {
                    displayName: doc.data().displayName,
                    email: doc.data().email,
                    emailVerified: doc.data().emailVerified,
                    photoURL: doc.data().userPhoto,
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

<div style="gap:20px;box-shadow: 8px 18px 16px 0" class="card w-96 bg-base-100 shadow-xl">
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
