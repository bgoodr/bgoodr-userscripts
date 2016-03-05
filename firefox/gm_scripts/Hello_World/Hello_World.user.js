// ==UserScript==
// @name        Hello World
// @namespace   http://hayageek.com
// @include     https://greasyfork.org/*
// @include     http://www.google.com/*
// @include     https://www.google.com/*
// @grant       none
// @version     1
// ==/UserScript==

// Attribution: Original version of this script was from http://hayageek.com/greasemonkey-tutorial/

// TODO: The button shows up in both the hayageek.com and the
// www.google.com page, but clicking on the button in the
// www.google.com page does nothing.

var input = document.createElement('input');
input.type = 'button';
input.value = 'GreaseMonkey Button';
input.onclick = showAlert;
document.body.appendChild(input);
function showAlert()
{
  alert('Hello World');
}
