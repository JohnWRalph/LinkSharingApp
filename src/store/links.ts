import { writable } from "svelte/store";


type link = {

    platform: string;
    url: string;
    id: number;
};

const links = writable([]);
const deletedLinks = writable<link[]>([]);
const updatedMenu = writable<boolean>(true);
export {links,deletedLinks,updatedMenu,type link}