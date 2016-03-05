// ==UserScript==
// @name        Google Search Input Fill In Example
// @namespace   http://hayageek.com
// @include     http://www.google.*
// @include     https://www.google.*
// @version     1
// ==/UserScript==

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
