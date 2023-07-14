import { writable } from "svelte/store";

const alertState = writable<string>("");
const alertMessage = writable<string>("");

export { alertState, alertMessage };