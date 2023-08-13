<script lang="ts">
    import AccountSetting from "../components/AccountSetting.svelte";
    import LinkSettings from "../components/LinkSettings.svelte";
    import { loginCheck } from "../utils/loginCheck";
    import isLoggedIn from "../store/isLoggedIn";
    
    //check if user is logged in
    loginCheck($isLoggedIn);
    let activeTab: string = "links";
</script>

<div class="join hero-tab">
    <input
        on:click={() => (activeTab = "links")}
        class="join-item btn btn-outline settingsTab"
        type="radio"
        name="options"
        aria-label="Edit Links"
        checked
    />
    <input
        on:click={() => (activeTab = "profile")}
        class="join-item btn btn-outline settingsTab"
        type="radio"
        name="options"
        aria-label="Edit Profile"
    />
</div>

<div  style="box-shadow: 8px 18px 16px 0;border-radius:20px;" class="editSettingsBody">
    {#if activeTab === "profile"}
    <div>
          <AccountSetting/>
    </div>   
    {:else if activeTab === "links"}
           <LinkSettings/>
    {/if}
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
    }
    .linkButtons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    .hero-tab {
        margin-top: 75px;
        background-color: #fff;
        width:100%;
    }
    .hero-secondary {
        margin-top: 10px;
        border-radius: 15px;
        position: relative;
    }
    .hero-primary {
        margin-top: 10px;
    }
    .hero-white {
        background-color: #fff;
        border-radius: 15px;
    }
    .nameInput {
        background-color: #f2f2f2;
        border-radius: 15px;
        margin-top: 10px;
    }
    .nameInputChild {
        padding: 0;
    }
    .profileEditLeft {
     
        width: 40%;
        gap: 10px;
    }
    .githubUpdateContainer {
        background-color: rgb(0, 0, 0);
        margin: 10px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        color: white;
    }
    .input {
        color: black;
    }
    .youtubeUpdateContainer {
        background-color: red;
        margin: 10px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        color: white;
    }

    .linkedinUpdateContainer {
        background-color: blue;
        margin: 10px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        color: white;
    }

    #trashContainer {
        height: 150px;
        width: 200px;
        border: 1px solid black;
        margin-left: 50%;
        margin-top: 10px;
        transform: translateX(-50%);
    }

    .sortable_item {
        background-color: #fff;
        border: 1px solid black;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .linkEditTop {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .editSettingsBody {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: white;
        margin-top: 10px;
        padding:30px;
        gap:20px;
    }
    .settingsTab{
        width:50%;
    }
</style>
