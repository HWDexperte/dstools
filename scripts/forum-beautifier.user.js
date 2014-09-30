// ==UserScript==
// @name        forum-beautifier
// @namespace   forum-beautifier
// @include     http://de110.die-staemme.de/game.php?*&screen=forum*
// @updateURL   https://github.com/HWDexperte/dstools/raw/master/storage_coloaar.user.js
// @downloadURL https://github.com/HWDexperte/dstools/raw/master/storage_coloaar.user.js
// @version     1.0
// @grant       none
// ==/UserScript==

elements = document.getElementsByClassName('forum');

for (i=0; i < elements.length; i++) {
  tag = elements[i];
  tag.style.padding = '0px 4px 0px 4px';
  tag.style.borderRadius = '4px';
}


elements = document.getElementsByTagName('img');

for (i=0; i < elements.length; ) {
  image = elements[i];
  if (image.title.search(/Neuer\ Beitrag/) > -1) {
    image.parentNode.parentNode.style.backgroundColor = "#ff0000";
    image.remove();
  } else {
    i++;
  }
}

function main() {

}

main();