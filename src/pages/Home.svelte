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
    <div style="margin-top:100px">
      <h1 class="text-5xl font-bold">Welcome to devLinks!</h1>
      <p class="py-6">
        Manage all your social media links in one place. Generate a profile to
        share with others.
      </p>
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
  </div>

  <div style="margin-top:40px;" class="tooltip tooltip-open" data-tip="View Example Profile">
    <div
      on:click={() =>
        window.open("https://link-sharing-app.vercel.app/#/profile/jerryreid")}
      style="width:250px;cursor:pointer;"
      class="mockup-phone"
    >
      <div class="camera" />
      <div class="display">
        <div style="position:relative;" class="phone-1">
          <img
            class="finger"
            style=" position: absolute;
        height: 75px;
        bottom: 50px;
        left: 30%;
        "
            src="../finger.png"
            alt="finger"
          />"
          <img
            style="height:100%; margin-top:25px;"
            src="../phone.jpg"
            alt="phone"
          />"
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- <img style="width:300px; margin-top:20px;" src="src/assets/phone.jpg" alt="phone" />"   -->
<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
.mockup-phone{
  /* add shadow*/
 margin-bottom: 40px;
  box-shadow: 14px 14px 4px rgba(0, 0, 0, .5);

  transition:transform .2s ease;
}
.mockup-phone:active{
  transform:scale(.95);
}
  /* Define the animation */
  @keyframes translateUpDown {
    0%,
    100% {
      /* Start and end positions */
      transform: translateY(0); /* Initial position - no translation */
    }
    50% {
      /* Middle position */
      transform: translateY(-10px); /* Move 10px up */
    }
  }

  /* Apply the animation to the image */
  .finger {
    
    animation: translateUpDown 3s infinite; /* 5 seconds duration, infinite loop */
  }
  
</style>
