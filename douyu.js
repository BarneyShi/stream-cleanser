// ==UserScript==
// @name         Douyu-filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.douyu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyu.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const documentObserver = new MutationObserver((mutations) => {
    if (document.getElementById("js-barrage-list")) {
      documentObserver.disconnect();
      onwatch();
    }
  });

  documentObserver.observe(document, {attributes: false, childList: true, characterData: false, subtree:true})

  function onwatch() {
    // Add click event on danmu
    const comments = document.getElementsByClassName("Barrage-list")[0];
    comments.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.className && e.target.className.includes("blockBtn")) {
        if (!localStorage.getItem("douyu-blocklist")) {
          const str = [e.target.getAttribute("aria-nickname")];
          localStorage.setItem("douyu-blocklist", JSON.stringify(str));
        } else {
          let arr = new Set([
            ...JSON.parse(localStorage.getItem("douyu-blocklist")),
          ]);
          arr.add(e.target.getAttribute("aria-nickname"));
          localStorage.setItem("douyu-blocklist", JSON.stringify([...arr]));
        }
      }
    });

    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("js-barrage-list");
    console.log("Found: ", targetNode);

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: false };

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      let set;
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
        mutation.addedNodes.forEach((e) => {
          const name = findNickname(e);
          if (localStorage.getItem("douyu-blocklist")) {
            set = new Set([
              ...JSON.parse(localStorage.getItem("douyu-blocklist")),
            ]);
          }
          if (localStorage.getItem("douyu-blocklist") && set && set.has(name)) {
            console.log("Removed a danmu!");
            removeLastDanmu();
            removeLastComment();
            console.log("A danmu has been removed.", name);
          } else {
            const span = document.createElement("span");
            span.innerHTML = "&#10006;";
            span.className = "blockBtn";
            span.setAttribute("aria-nickname", name);
            span.style.cssText = "color:red; font-weight:bold; ";
            e.firstElementChild.prepend(span);
          }
        });
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Manually wait for 5s to start the script.
  }

  function findNickname(node) {
    const elements = node.childNodes[1].childNodes;
    for (const e of elements) {
      if (e.className && e.className.includes("Barrage-nickName")) {
        const name = e.childNodes[0].nodeValue.trim().replace(/：$/, "");
        return name;
      }
    }
    return "";
  }

  function removeLastDanmu() {
    const danmus = document.getElementsByClassName(" danmu-e7f029")[0];
    danmus.removeChild(danmus.lastChild);
  }

  function removeLastComment() {
    const comments = document.getElementById("js-barrage-list");
    comments.removeChild(comments.lastChild);
  }
})();
