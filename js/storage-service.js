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
    var canvas = getCanvas();
    canvas.classList.add('fade');
    console.log(canvas);
    setTimeout(() => canvas.classList.remove('fade'),500);
    var imgs = loadFromStorage('imgsDB');
    if (!imgs || !imgs.length) imgs = [];
    var memes = getMeme();
    var imgIdx = memes.selectedImgId;
    var lines = memes.lines;
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
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        var imgs = getImgs();
        saveToStorage('userImg',img.src);
        var userImg = { id: imgs.length, url:img.src, keywords: [] };
        updateGimgs(userImg);
        setImg(imgs.length);
        var imgsDB = loadFromStorage('gImgsDB');
        if (imgsDB) imgsDB.push(userImg);
        else imgsDB = [userImg]
        saveToStorage('gImgsDB', imgsDB);
    }
    reader.readAsDataURL(ev.target.files[0]);
}