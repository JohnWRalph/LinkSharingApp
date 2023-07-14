<script lang>
  import { push } from "svelte-spa-router";
  import isLoggedIn from "../store/isLoggedIn";
  import { loginCheck } from "../utils/loginCheck";
  import { getAuth, signOut } from "firebase/auth";
  import { initializeApp } from "firebase/app";

  loginCheck($isLoggedIn);

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
</script>


{#if $isLoggedIn}
  <div class="flex flex-col w-full">
    <button on:click={() => push("/myProfile")} class="btn btn-primary"
      >Go To Profile</button
    >
    <div style="width:250px;" class="divider" />
    <button
      on:click={() =>
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log("signout successful");
            isLoggedIn.set(false);
            //reload window
            window.location.reload();
          })
          .catch((error) => {
            // An error happened.
            console.log("signout error");
          })}
      style="width:250px;"
      class="btn btn-primary">Logout</button
    >
  </div>
{:else}
  <div>
    <h1 class="text-5xl font-bold">Welcome to devLinks!</h1>
    <p class="py-6">Manage all your social media links in one place. Generate a profile to share with others.</p>
  </div>
  <div class="flex flex-col w-full">
    <div>
      <button
        style="width:250px;"
        class="btn btn-primary"
        on:click={() => push("/login")}
      >
        Login To Existing Account
      </button>
    </div>
    <div class="divider" />
    <div>
      <button
        style="width:250px;"
        class="btn btn-primary"
        on:click={() => push("/createAccount")}
      >
        Create New Account
      </button>
    </div>
  </div>
 
  
{/if}

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
