// ==UserScript==
// @name        Google Search Input Fill In Example
// @namespace   https://github.com/bgoodr/bgoodr-userscripts
// @include     http://www.google.*
// @include     https://www.google.*
// @version     1
// ==/UserScript==

// Attribution: Original version of this script was from http://hayageek.com/greasemonkey-tutorial/

//Change the textbox value
if(window.location.href.indexOf("q=") < 0) //To avoid recursion
{
    var inputs = document.getElementsByTagName("input");
    for(var i=0;i<inputs.length;i++)
    {
        if(inputs[i].type == "text")
        {
            inputs[i].value = "hayageek.com";
        }
    }
    //Submit form
    document.forms[0].submit();
}
