'use strict'
var gCanvas;
var gCtx;
var gFillColor = 'white';
var gToggleShare = true;

function onInit() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    loadImgs();
    uploadImg();
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
function loadImgs() {
    var imgs = getImgs();
    var elHelper = document.querySelector('.sizing');
    imgs.forEach(function (img) {
        elHelper.innerHTML = `<img src="${img.url}">`
    })
    elHelper.innerHTML = '';
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
    document.querySelector('.my-meme').classList.remove('active-nav');
}

function toggleShareNav() {
    if (gToggleShare) {
        updateGlineIdx();
        pureCanvas();
        renderMeme();
        uploadImg();
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

function toggleHeaderNav() {
    if (window.innerWidth <= 780) {
        document.querySelector('.nav').classList.toggle('show');
        document.querySelector('.gallery-nav').classList.toggle('show');
        document.querySelector('.about-nav').classList.toggle('show');
        document.querySelector('.my-meme').classList.toggle('show');
        document.querySelector('.main-screen-header').classList.toggle('menu-open');
    }
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

function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL();
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        document.querySelector('.do-share').innerHTML = `<a class="btn fb-share"
       href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" 
       title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.
       php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">Share On FaceBook!</a>`;
    }
    doUploadImg(imgDataUrl, onSuccess);
}


function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl);
    fetch('//ca-upload.com/here/upload.php', {  //That link is doing errors...
        method: 'POST',
        body: formData,
    })
        .then((res) => res.text())
        .then((url) => {
            onSuccess(url);
        })
        .catch((err) => {
        });
}

addEvents()
function addEvents() {
    var elements = document.querySelectorAll('.nav>*:not(hr,.hamburger)');
    elements.forEach(element => {
        element.addEventListener('mouseover',() => element.classList.add('hover-nav'));
        element.addEventListener('mouseout',() =>  element.classList.remove('hover-nav'));
    })
}