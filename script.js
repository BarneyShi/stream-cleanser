// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.douyu.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyu.com
// @grant        none
// ==/UserScript==
// onload event is banned from Douyu.com, so I use setTimeout as an alternative.

(function() {
  'use strict';

setTimeout(()=> {
const player = document.getElementById("__h5player");
alert(player);
},5000)
})();
