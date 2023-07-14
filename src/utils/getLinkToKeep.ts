import { push } from "svelte-spa-router";
import { displayNameStore } from "../store/account";
import { alertMessage, alertState } from "../store/alert";
import { getLinksFromDB } from "./getLinksFromDB";
import { setLinksToDB } from "./setLinksToDB";

function getLinktoKeep(uid) {
    //get platforms to keep
    var platformsToKeepContainer = document.getElementsByClassName("platformToKeep");

    //get url input values
    var urlsToKeepcontainer = document.getElementsByClassName("urlToKeep");
    let newLink;
    let links = [];

    for (let i = 0; i < platformsToKeepContainer.length; i++) {
        var platform = platformsToKeepContainer[i].innerHTML;


        // get div elements
        var urls = urlsToKeepcontainer[i].innerHTML;
        newLink = { platform: platform, url: urls, id: i }
        links.push(newLink);
    }
    setLinksToDB(uid, links).then(() => {
        alertState.set("success")
        alertMessage.set("Settings updated successfully")
        setTimeout(() => {
            alertState.set("")
            alertMessage.set("")
        }, 3000);
        getLinksFromDB(uid)
        //reload page
        push("/myProfile")
    });

}

export { getLinktoKeep };