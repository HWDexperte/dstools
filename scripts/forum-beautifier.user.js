// ==UserScript==
// @name        forum-beautifier
// @namespace   forum-beautifier
// @include     http://de110.die-staemme.de/game.php?*&screen=forum*
// @updateURL   https://github.com/HWDexperte/dstools/raw/master/scripts/forum-beautifier.user.js
// @downloadURL https://github.com/HWDexperte/dstools/raw/master/scripts/forum-beautifier.user.js
// @version     1.2
// @grant       none
// ==/UserScript==


// === HERE YOU CAN MODIFY THE SETTINGS ===
var new_post_color = "#88ACDB";
var box_radius     = "3px";
// ========================================


function modify_boxes() {
    elements = document.getElementsByClassName('forum');
    for (i=0; i < elements.length; i++) {
        tag = elements[i];
        tag.style.padding = '0px 4px 0px 4px';
        tag.style.borderRadius = box_radius;
    }
}
function highlight_new() {
    elements = document.getElementsByTagName('img');
    for (i=0; i < elements.length; ) {
        image = elements[i];
        if (image.title.search(/Neuer\ Beitrag/) > -1) {
            image.parentNode.parentNode.style.backgroundColor = new_post_color;
            image.remove();
        } else { i++; }
    }
}
function main() {
    modify_boxes();
    highlight_new();
}

main();