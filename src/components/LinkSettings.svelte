<script lang="ts">
    
    import Sortable from "svelte-sortable";
    import { links } from "../store/links";


    import { getLinktoKeep } from "../utils/getLinkToKeep";
    import { options, optionsSelect } from "../domain/sortableOptions";
    import { email } from "../store/profile";
    import { userAccount } from "../store/account";
 
    let platformToAdd;
    let urlToAdd="https://";

    const addToArray = (platform, url) => {
        if (platform && url) {
            $links = [
                ...$links,
                [
                    {
                        platform: platform,
                        url: url,
                        id: $links.length,
                    },
                ],
            ];
        }
    };

    function removeArray(index) {
        $links[index][0].class = "hide";
    }
    let platformSelect = ["Github", "LinkedIn", "Twitter", "Youtube"];
</script>

<div class="settingsHeaderContainer">
    <h1 class="settingsHeader font-bold">Edit Links</h1>
    <p class="">
        Add/edit/remove links below and then share all your profiles with the
        world!
    </p>
</div>

<div class="editSubBody">
    <div class="subBodyPlatform">
        <p class="">(Additional Platforms Coming Soon)</p>
        <select
            bind:value={platformToAdd}
            style="width: 100%;"
            class="select select-primary"
        >
            <option disabled selected>Platform</option>
            {#each platformSelect as platform}
                <option>{platform}</option>
            {/each}
        </select>
    </div>

    <div class="subBodyUrl">
        <input
            bind:value={urlToAdd}
            type="text"
            placeholder="Your URL"
            style="width: 100%;"
            class="input input-bordered input-primary"
        />
    </div>
    <div class="editSubBodyHeader">
        <button
            on:click={() => addToArray(platformToAdd, urlToAdd)}
            class="btn btn-primary btn-block">+ Add new link</button
        >
    </div>
</div>
<p style="line-height:150%">
    Reorder your links by dragging them to a new spot in the list using the <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
        ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
        /></svg
    > icons.
</p>
<p>When finished, click "Save Changes" at the bottom of the screen.</p>

<div style="display:flex; flex-direction:column">
    {#each $links as link, i}
        <Sortable items={link} let:item {options}>
            {#if link[0].class !== "hide"}
                <div style="box-shadow: 8px 18px 16px 0" class="editSubBody linkToKeepBody">
                    <button
                        class="btn btn-square btn-ghost handle handle-bottom"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block w-5 h-5 stroke-current"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            /></svg
                        >
                    </button>
                    <div class="editSubBodyHeader">
                        <div class="linkIndexDiv">
                            Link # {link[0].id + 1}
                        </div>

                      
                        <button
                            style="z-index:100"
                            class="btn btn-outline"
                            on:click={() => removeArray(link[0].id)}
                            on:touchend={() => removeArray(link[0].id)}
                        >
                            Remove
                        </button>
                    </div>
                    <div class="subBodyPlatform">
                        <select
                            class="select select-bordered select-primary"
                            bind:value={link[0].platform}
                        >
                            {#each platformSelect as value}<option {value}
                                    >{value}</option
                                >{/each}
                        </select>
                        <div
                            class="platformDropdown platformToKeep"
                            style="display:none"
                        >
                            {link[0].platform}
                        </div>
                    </div>

                    <div class="subBodyUrl">
                        <input
                            bind:value={link[0].url}
                            type="text"
                            placeholder={link[0].url}
                            class="urlInputValues input input-bordered input-primary w-full"
                        />
                    </div>
                    <div class="urlToKeep" style="display: none">
                        {link[0].url}
                    </div>
                    <button
                        class="btn btn-square btn-ghost handle handle-bottom"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block w-5 h-5 stroke-current"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            /></svg
                        >
                    </button>
                </div>
            {/if}
        </Sortable>
    {/each}

</div>

<button
    class="btn btn-primary"
    on:click={() => getLinktoKeep($userAccount.uid)}
>
    Save Changes
</button>

<style glocal lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

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

    .editSubBody {
        display: flex;
        flex-direction: column;
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

    .subBodyPlatform {
        width: 100%;

        margin-bottom: 1rem;
    }

    .subBodyUrl {
        width: 100%;

        margin-bottom: 1rem;
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

    
  
</style>
