// ==UserScript==
// @name        storage-colors
// @namespace   storage-colors
// @description Colors the storage values in the overview
// @include     *.die-staemme.de/game.php*
// @updateURL   https://github.com/HWDexperte/dstools/raw/master/storage_color.user.js
// @downloadURL https://github.com/HWDexperte/dstools/raw/master/storage_color.user.js
// @version     1.2.1
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
    } else if (percentage < 55) {
        label_span.style.color = '#6BB224';
    } else if (percentage < 75) {
        label_span.style.color = '#B24700';
    } else {
        label_span.style.color = 'red';
    }
    return label_span;
}

function get_table(element, element_name, percentage) {
    sepchar = document.createTextNode('- ');
    sepchar_span = document.createElement('span');

    label_span = get_colorized_percentage_span(percentage);

    wrapper_span = document.createElement('span');
    wrapper_span.style.whiteSpace = 'nowrap';

    sepchar_span.appendChild(sepchar);
    wrapper_span.appendChild(sepchar_span);
    wrapper_span.appendChild(label_span);

    label_td = document.createElement('td');
    label_td.className = 'box-item';
    label_td.id = element_name;

    label_td.appendChild(wrapper_span);

    return label_td;
}

function append_percentage(element, element_name, percentage) {
    label_td = get_table(element, element_name, percentage);

    element.parentNode.parentNode.insertBefore(label_td, element.parentNode.nextSibling);
}

function update_percentage(element, element_name, percentage) {
    label_td = get_table(element, element_name, percentage);

    old_label_td = document.getElementById(element_name);

    old_label_td.parentNode.replaceChild(label_td, old_label_td);
}

function main() {
    wood  = document.getElementById('wood');
    stone = document.getElementById('stone');
    iron  = document.getElementById('iron');

    capacity = get_capacity();
    append_percentage(wood, 'sc_wood', calc_percentage(get_value(wood), capacity));
    append_percentage(stone, 'sc_stone', calc_percentage(get_value(stone), capacity));
    append_percentage(iron, 'sc_iron', calc_percentage(get_value(iron), capacity));
}

function update() {
    wood  = document.getElementById('wood');
    stone = document.getElementById('stone');
    iron  = document.getElementById('iron');

    capacity = get_capacity();
    update_percentage(wood, 'sc_wood', calc_percentage(get_value(wood), capacity));
    update_percentage(stone, 'sc_stone', calc_percentage(get_value(stone), capacity));
    update_percentage(iron, 'sc_iron', calc_percentage(get_value(iron), capacity));
}

main();
window.setInterval(update, 2500);