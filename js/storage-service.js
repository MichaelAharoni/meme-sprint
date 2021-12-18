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
    var lines = memes.lines;
    console.log(imgIdx,lines.length);
    if (imgs.length === 6) imgs.pop();
    imgs.unshift({img,imgIdx,lines});
    saveToStorage('imgsDB', imgs);
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('#my-canvas').innerHTML = '';
    var reader = new FileReader()
    reader.onload = (event) => {
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        setImg(img.src);
        saveToStorage('userImg',img.src);
    }
    reader.readAsDataURL(ev.target.files[0]);
    renderEditor();
}

// function renderUserImg(img) {
//     gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
// }