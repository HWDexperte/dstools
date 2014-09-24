// ==UserScript==
// @name        dsreal-playerpoints
// @namespace   dsreal-playerpoints
// @description Show a player points graph in his Profile from dsreal.de
// @include     *.die-staemme.de/game.php?village=*&id=*&screen=info_player*
// @updateURL   https://github.com/HWDexperte/dstools/raw/master/dsreal_playerpoints.user.js
// @downloadURL https://github.com/HWDexperte/dstools/raw/master/dsreal_playerpoints.user.js
// @version     1.0
// @grant       none
// ==/UserScript==

function get_world() {
    return document.location.href.match(/de([0-9]+)\.die-staemme/)[1];
}

function build_column(content) {
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.colSpan = 2;
    td.appendChild(content);
    tr.appendChild(td);
    return tr;
}

function build_link(image) {
    p_id = image[1];
    world = get_world();

    a = document.createElement('a');
    a.target='dsreal';
    a.href = 'http://www.dsreal.de/index.php?screen=file&mode=player&id='+p_id+'&world=de'+world;
    a.appendChild(image[0]);

    return a;
}

function build_image(p_id) {
    world = get_world();

    img = document.createElement('img');
    img.src = 'http://www.dsreal.de/charts/playerPoints.php?id='+p_id+'&world=de'+world;

    return [img, p_id];
}

function insert_chart() {
    var i;

    for (i=0; i < document.links.length; i++) {
        link = document.links[i];
        if (link.href.search(/player=([0-9]+)&/) > -1) {
            p_id = link.href.match(/player=([0-9]+)&/)[1];
            link.parentNode.parentNode.parentNode.appendChild(build_column(build_link(build_image(p_id))));
            break;
        }
    }
}

insert_chart();