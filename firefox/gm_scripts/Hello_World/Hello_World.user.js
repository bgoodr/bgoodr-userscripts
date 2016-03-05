// ==UserScript==
// @name        Hello World
// @namespace   http://hayageek.com
// @include     https://greasyfork.org/*
// @include     http://www.google.com/*
// @include     https://www.google.com/*
// @grant       none
// @version     1
// ==/UserScript==



var input = document.createElement('input');
input.type = 'button';
input.value = 'GreaseMonkey Button';
input.onclick = showAlert;
document.body.appendChild(input);
function showAlert()
{
  alert('Hello World');
}
