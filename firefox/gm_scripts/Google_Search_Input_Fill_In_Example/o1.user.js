// ==UserScript==
// @name        Log All Input Fields 
// @namespace   http://bgoodr.com
// @include     http://www.google.*
// @include     https://www.google.*
// @version     1
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
for(var i=0;i<inputs.length;i++)
{
    if(inputs[i].type == "text")
    {
        console.log(inputs[i])
        // inputs[i].value = "hayageek.com";
    }
}
// //Submit form
// document.forms[0].submit();
