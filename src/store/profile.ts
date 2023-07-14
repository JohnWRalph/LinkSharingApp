import { writable } from "svelte/store";

const username = writable<string>("");
const email = writable<string>("");
const password = writable<string>("");
const password2 = writable<string>("");
const token = writable<string>("");
const image = writable<string>("");
const links = writable<string[]>([]);
export { username, email, password, password2, token, image,links };