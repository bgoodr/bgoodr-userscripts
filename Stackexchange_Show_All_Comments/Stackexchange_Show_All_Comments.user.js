// ==UserScript==
// @name           StackExchange Always Show All Comments
// @version        0.0.2
// @namespace      https://github.com/bgoodr/bgoodr-userscripts/tree/master/firefox/gm_scripts
// @description    Alway show all comments each time a stackexchange site page is loaded
// @include        http://*.stackexchange.com/*
// @include        https://stackoverflow.com/*
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

    // Click the "js-show-link" elements:
    //
    //   Problem: Clicking on the "js-show-link" elements does expand them, but
    //   does not keep the relative position of the page intact.  e.g.,
    //   if you navigate to:
    //
    //      https://stackoverflow.com/questions/1425892/how-do-you-merge-two-git-repositories/1425914#
    //
    //   This script then runs but then shows the top of the page, not
    //   the place right at the answer "1425914" in the URL above.
    //
    //   This also occurs on:
    //
    //     https://stackoverflow.com/questions/55895012/python-3-script-using-relative-imports-on-standard-input-gives-error-no-module/55895684#comment98633410_55895684
    //
    //   So, for now, I'm going to have to give up on this script, as
    //   I do need to have direct links to specific comments working.
    //
    //
    var elems = document.getElementsByClassName("js-show-link");
    console.log("debug: ", elems.length)
    for (var i = 0; i < elems.length; i++)
        elems[i].click();

    // Old code I'm keeping around that originated in https://greasyfork.org/en/scripts/3642-comment-separator-fix/code :
    //
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
