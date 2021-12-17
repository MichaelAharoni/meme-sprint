'use strict'

function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    const val = JSON.parse(json)
    return val
}

function saveImg() {
    var canvases = loadFromStorage('canvasesDB');
    if (!canvases || !canvases.length) canvases = [];
    var elCanvas = getCanvas();
    canvases.push(elCanvas);
    saveToStorage('canvasesDB', canvases);
}
