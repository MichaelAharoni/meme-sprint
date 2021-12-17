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

function saveImgToStorage() {
    var canvas = getCanvas();
    updateGlineIdx();
    pureCanvas();
    setTimeout(function() {
        const imgDataUrl = canvas.toDataURL();
        saveImg(imgDataUrl);
        updateMemeIdx();
        drawRect();
        renderMeme();
    },20)
}

function saveImg(img) {
    var imgs = loadFromStorage('imgsDB');
    if (!imgs || !imgs.length) imgs = [];
    var memes = getMeme();
    var imgIdx = memes.selectedImgId;
    console.log(imgIdx);
    var lines = memes.lines;
    if (imgs.length === 6) imgs.pop();
    imgs.unshift({img,imgIdx,lines});
    saveToStorage('imgsDB', imgs);
}

