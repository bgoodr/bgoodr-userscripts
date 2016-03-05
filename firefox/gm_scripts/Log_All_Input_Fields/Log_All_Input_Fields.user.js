// ==UserScript==
// @name        Log All Input Fields 
// @namespace   https://github.com/bgoodr/bgoodr-userscripts
// @include     http://www.google.*
// @include     https://www.google.*
// @version     1
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
for(var i=0;i<inputs.length;i++)
{
    if(inputs[i].type == "text")
    {
        console.log("Found input field: ", inputs[i]);
    }
}
