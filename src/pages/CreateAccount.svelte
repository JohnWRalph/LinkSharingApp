<script>
    import { push } from "svelte-spa-router";
    import { initializeApp } from "firebase/app";
    import { getAuth, reload } from "firebase/auth";
    import isLoggedIn from "../store/isLoggedIn";
    import createNewUserWithEmailAndPassword from "../utils/createNewUserWithEmailAndPassword";

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

    let profileHash = "";
    let newEmailAddress = "";
    let newPassword1 = "";
    let newPassword2 = "";
</script>

<div style="box-shadow: 8px 18px 16px 0" class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    {#if $isLoggedIn}
        <div class="card-body">
            <div class="form-control mt-6">
                <button class="btn btn-primary">Logout</button>
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
                    bind:value={newEmailAddress}
                    type="text"
                    placeholder="email"
                    class="input input-bordered"
                />
            </div>

            <div class="form-control">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input
                    bind:value={newPassword1}
                    type="text"
                    placeholder="password"
                    class="input input-bordered"
                />
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Retype Password</span>
                </label>
                <input
                    bind:value={newPassword2}
                    type="text"
                    placeholder="password"
                    class="input input-bordered"
                />
                <!-- svelte-ignore a11y-label-has-associated-control -->
            </div>
            <div class="form-control">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <div
                    style="overflow-wrap:anywhere; margin-top:5px; background-color:#f2f2f2;border-radius:20px;"
                >
            
                </div>
                <div class="tooltip" data-tip="Set your profile link. This is how others will be able to
                find and view your profile
                (example.com/profile/JoeSmith123). Must be 0-9, a-z, A-Z, no
                spaces, and 3-20 characters long.">
                  <label class="label">
                    <span class="label-text">Profile Link</span>
                </label>
                <input
                    bind:value={profileHash}
                    type="text"
                    placeholder="Profile Link"
                    class="input input-bordered"
                />
              </div>
              
                <div
                    style="overflow-wrap:anywhere; margin-top:5px; background-color:#f2f2f2;border-radius:20px;"
                >
                    Your Profile Link: example.com/profile/{profileHash}
                </div>
            </div>
           
            <div class="form-control mt-6">
                <button
                    on:click={() =>
                        createNewUserWithEmailAndPassword(
                            auth,
                            newEmailAddress,
                            newPassword1,
                            newPassword2,
                            profileHash
                        ).then((result) => {
                            console.log(result);
                            if (result) {
                                isLoggedIn.set(true);
                                push("/myProfile");
                            } else {
                                console.log("error");
                            }
                        })}
                    class="btn btn-primary">Create account</button
                >
            </div>
        </div>
    {/if}
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
