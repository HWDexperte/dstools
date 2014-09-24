// ==UserScript==
// @name        storage-colors
// @namespace   storage-colors
// @description Colors the storage values in the overview
// @include     *.die-staemme.de/game.php*
// @updateURL   https://github.com/HWDexperte/dstools/raw/master/storage_color.user.js
// @downloadURL https://github.com/HWDexperte/dstools/raw/master/storage_color.user.js
// @version     1.1
// @grant       none
// ==/UserScript==

function get_capacity() {
    return document.getElementById('storage').innerHTML;
}

function get_value(element) {
    return element.innerHTML;
}

function calc_percentage(value, capacity) {
    return Math.floor(value / capacity * 100);
}

function get_colorized_percentage_span(percentage) {
    label = document.createTextNode(percentage + '%'); 
    label_span = document.createElement('span');
    label_span.className = 'res';
    label_span.appendChild(label);
    if (percentage < 30) {
        label_span.style.color = '#007A00';
    } else if (percentage < 60) {
        label_span.style.color = '#B24700';
    } else {
        label_span.style.color = 'red';
    }
    return label_span;
}

function append_percentage(element, percentage) {
    sepchar = document.createTextNode('- ');
    sepchar_span = document.createElement('span');

    label_span = get_colorized_percentage_span(percentage);

    label_td = document.createElement('td');
    label_td.className = 'box-item';

    wrapper_span = document.createElement('span');
    wrapper_span.style.whiteSpace = 'nowrap';

    sepchar_span.appendChild(sepchar);
    wrapper_span.appendChild(sepchar_span);
    wrapper_span.appendChild(label_span);
    label_td.appendChild(wrapper_span);

    element.parentNode.parentNode.insertBefore(label_td, element.parentNode.nextSibling);
}

function main() {
    text = document.createTextNode('Hallo');

    wood  = document.getElementById('wood');
    stone = document.getElementById('stone');
    iron  = document.getElementById('iron');

    capacity = get_capacity();
    append_percentage(wood, calc_percentage(get_value(wood), capacity));
    append_percentage(stone, calc_percentage(get_value(stone), capacity));
    append_percentage(iron, calc_percentage(get_value(iron), capacity));
}

window.setInterval(main(), 5000);