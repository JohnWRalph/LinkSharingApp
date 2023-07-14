import { writable } from "svelte/store"; 


const emailAddress = writable<string> ();

const displayNameStore = writable<string> ()
const emailVerifiedStore = writable<boolean> (false);
const userPhotoStore = writable<string>()
const hashStore = writable<string> ();

const userAccount = writable<any>(null);

const displayedProfile = writable({
    displayName: null,
    email: null,
    emailVerified: false,
    photoURL: null,
    isPublic: false,
    shareLink: null,
    
    links: [],

});
export { emailAddress,  displayNameStore,emailVerifiedStore, userPhotoStore,userAccount,displayedProfile,hashStore};