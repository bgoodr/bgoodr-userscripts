// ==UserScript==
// @name           StackExchange Always Show All Comments
// @version        0.0.2
// @namespace      https://github.com/bgoodr/bgoodr-userscripts/tree/master/firefox/gm_scripts
// @description    Alway show all comments each time a stackexchange site page is loaded
// @include        http://*.stackexchange.com/*
// @include        http://stackoverflow.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://meta.serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.superuser.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://stackapps.com/*
// ==/UserScript==

function fix() {

    // Based upon https://greasyfork.org/en/scripts/3642-comment-separator-fix/code
    
    var elems = document.getElementsByClassName("js-link-separator");
    for (var i = 0; i < elems.length; i++)
        elems[i].click();
    
    // var separators = document.getElementsByClassName("js-link-separator");
    // for (var i = 0; i < separators.length; i++) {
    //     if (separators[i].className === "js-link-separator dno") {
    //         separators[i].style.visibility = "hidden";
    //     } else {
    //         separators[i].style.visiblity = "visible";
    //     }
    //     separators[i].className += "lsep ";
    //     separators[i].innerHTML = "|";
    // }
}

fix();

var observer = new MutationObserver(fix);
observer.observe(document.getElementsByTagName("body")[0], {
    attributes: true,
    childList: true,
    characterData: true
});
