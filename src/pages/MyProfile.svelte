<script lang="ts">
    import { push } from "svelte-spa-router";
    import isLoggedIn from "../store/isLoggedIn";
    import { loginCheck } from "../utils/loginCheck";
    import { deletedLinks, links } from "../store/links";
    import { getLinksFromDB } from "../utils/getLinksFromDB";
    import { email } from "../store/profile";
    import { getAccountSettingsfromDB } from "../utils/getAccountSettingsFromDB";
    import { displayNameStore, userAccount, userPhotoStore } from "../store/account";

    loginCheck($isLoggedIn);
  

    if ($userAccount.uid) {
        getAccountSettingsfromDB($userAccount.uid);
    }
  
    if ($links.length == 0) {
        getLinksFromDB($userAccount.uid);
    }
    let showAccountSettings: boolean = false;
    setTimeout(() => {
        showAccountSettings = true;
    }, 3000);
</script>

<div class="card w-96 bg-base-100 shadow-xl">
    {#if $userPhotoStore}
        <div>
            <img
                class="bg-neutral-focus text-neutral-content rounded-full w-24"
                src={$userPhotoStore}
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
                    src="src/assets/avatar.svg"
                    alt=""
                />
            </div>
        </div>
    {/if}
    {#if $userAccount.displayName}
        {$userAccount.displayName}
        <br />
        {$userAccount.email}
    {:else if showAccountSettings === false}
        loading...
    {:else}
        No Account Information found
        <button class="btn btn-primary" on:click={() => push("/editProfile")}
            >Set Up Account</button
        >
    {/if}
    <div class="linkButtons">
        {#await $links && $links.length}
            No links found.
            <button
                class="btn btn-primary"
                on:click={() => push("/editProfile")}>Create Link</button
            >
        {:then}
            {#each $links as link, i}
                <div style="display:flex;flex-direction:row;">
                    <button
                        on:click={() => window.open(link[0].url)}
                        style="justify-content: space-between; border:1px solid black; color:white;"
                        class="btn btn-wide join-item {link[0].platform}"
                    >
                        <div
                            style="display:flex; align-items:center; gap:10px;"
                        >
                            <img
                                class="linkLogo"
                                src="src/assets/{link[0].platform}.svg"
                            />{link[0].platform}
                        </div>
                        <img style="width:20px; height:20px;"
                            src="src/assets/Arrow-002.svg"
                        /></button
                    >

                </div>
            {/each}
        {/await}
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
