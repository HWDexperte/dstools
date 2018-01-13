// ==UserScript==
// @name        storage-colors
// @description Fügt eine farbige & prozentuale Anzeige zum Lagerfüllstand der jeweiligen Rohstoffe an
// @namespace   https://github.com/fechnert/dstools
// @include     *.die-staemme.de/game.php*
// @updateURL   https://raw.githubusercontent.com/fechnert/dstools/master/scripts/storage-colors.user.js
// @downloadURL https://raw.githubusercontent.com/fechnert/dstools/master/scripts/storage-colors.user.js
// @version     1.2.3
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

    console.log(percentage);

    var hue=((1-(percentage/100))*120).toString(10);
    label_span.style.color = ["hsl(",hue,",85%,35%)"].join("");

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
window.setInterval(update, 5000);
