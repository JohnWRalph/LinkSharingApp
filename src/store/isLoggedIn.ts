import { writable } from "svelte/store";

const isLoggedIn = writable<boolean>(false);

export default isLoggedIn;