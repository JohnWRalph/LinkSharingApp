import { push } from "svelte-spa-router";

function loginCheck(token) {
    if (token === true) {  
    } else {
        push("/");
    }
}

export { loginCheck };