<script>
    import { push } from "svelte-spa-router";
    import urlSliced from "../store/url";
    import isLoggedIn from "../store/isLoggedIn";
    // Function to handle URL change
    function handleUrlChange() {
        const url = window.location.href;
        const urlSlice = url.slice(url.length - 11, url.length);
        urlSliced.set(urlSlice);
    }
    onload = handleUrlChange;
    window.onhashchange = handleUrlChange;
</script>

<div class="navbar bg-base-100">
    <div class="navbar-start">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => push("/")} class="btn btn-ghost normal-case text-xl"
            ><img src="../Chain_link_icon.svg"/>devLinks
        </a>
    </div>
    <div class="navbar-center hidden lg:flex" />

    <div class="navbar-end">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if $isLoggedIn}
            {#if $urlSliced === "editProfile"}
                <a on:click={() => push("/myProfile")} class="btn"
                    >Preview Profile</a
                >
            {:else}
                <a on:click={() => push("/editProfile")} class="btn"
                    >Edit Profile</a
                >
            {/if}
        {:else}{/if}
    </div>
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .navbar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
</style>
