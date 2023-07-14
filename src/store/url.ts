import { writable } from "svelte/store";

const urlSliced = writable<string>("");

export default urlSliced;