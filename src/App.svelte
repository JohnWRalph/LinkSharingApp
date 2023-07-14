<script lang="ts">
  import Router from "svelte-spa-router";
  import { push } from "svelte-spa-router";
  import Home from "./pages/Home.svelte";

  import Navbar from "./components/Navbar.svelte";
  import Profile from "./pages/Profile.svelte";
  import EditProfile from "./pages/EditProfile.svelte";

  import LoginExisting from "./pages/LoginExisting.svelte";
  import CreateAccount from "./pages/CreateAccount.svelte";
  import { alertState, alertMessage } from "./store/alert";
  import MyProfile from "./pages/MyProfile.svelte";

  const routes = {
    "/": Home,
    "/login": LoginExisting,
    "/myProfile": MyProfile,
    "/editProfile": EditProfile,
    "/createAccount": CreateAccount,
    "/loginUser": LoginExisting,
    "/profile/:id": Profile,
  };
</script>

<main>
  <Navbar />
  <Router {routes} />
</main>
{#if $alertState === "error"}
  <div
    style="position:absolute; left:5%; bottom:20px; width:90%;"
    class="alert alert-error"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span>{$alertMessage}</span>
  </div>
{/if}
{#if $alertState === "success"}
  <div
    style="position:absolute; left:5%; bottom:20px; width:90%;"
    class="alert alert-success"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span>{$alertMessage}</span>
  </div>
{/if}

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
