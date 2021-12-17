'use strict'
var gCanvas;
var gCtx;
var gFillColor = 'white';
var gToggleShare = true;

function onInit() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    document.querySelector('#my-canvas');
}

function setCanvasProps(height, width) {
    gCanvas.width = width;
    gCanvas.height = height;
}

function getCanvas() {
    return gCanvas;
}

function getLinesFirstPos() {
    return { x: gCanvas.width / 2, y: gCanvas.height / 5 };
}

function renderMeme() {
    renderImg();
    setTimeout(function () { renderText() }, 1)
}

function getText(input) {
    setLineText(input);
    renderMeme();
}


function renderText() {
    var currMeme = getMeme();
    currMeme.lines.forEach(function (line) {
        drawText(line.txt, line.x, line.y, line.size, line.align, line.color, line.stColor, line.font, line.id);
    })
}


function renderImg() {
    var currMeme = getMeme();
    var currImg = getCurrImg(currMeme.selectedImgId);
    var img = new Image();
    img.src = currImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawRect();
    };
}

function setInputTxt() {
    var meme = getMeme();
    var txt = meme.lines[gMeme.selectedLineIdx].txt;
    var elInput = document.querySelector('#txt-input');
    elInput.value = txt;
}

function renderEditor() {
    document.querySelector('.imgs-layout').classList.toggle('hide');
    document.querySelector('.meme-editor-container').classList.toggle('hide');
    document.querySelector('.search-container').classList.toggle('hide');
    document.querySelector('.gallery-nav').classList.remove('active-nav');
}

function toggleShareNav() {
    if (gToggleShare) {
        updateGlineIdx();
        pureCanvas();
        renderMeme();
    }
    else if (!gToggleShare) {
        updateMemeIdx();
        drawRect();
        renderMeme();
    }
    gToggleShare = !gToggleShare;
    document.querySelector('.share-nav').classList.toggle('hide');
    document.querySelector('.main-screen').classList.toggle('menu-open');
}

function pureCanvas() {
    var meme = getMeme();
    updateGlineIdx(meme.selectedLineIdx);
    meme.selectedLineIdx = -1;
    renderImg();
    renderMeme();
}

function downloadImg(elLink) {
    const data = gCanvas.toDataURL('img/jpeg');
    elLink.href = data;
    elLink.download = 'my-canvas';
    saveImg();
    toggleShareNav();
}