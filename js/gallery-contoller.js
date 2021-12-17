'use strict'
var imgs = getImgs();

function renderGallery(keyword) {
    var strHTML = ``;
    for (let i = 1; i <= imgs.length; i++) {
        strHTML += `<div class="gallery-imgs img${i}"onclick="setImg(${i})" data-img="${i}"><img src="./imgs/meme-imgs (square)/${i}.jpg"></div>`;
    }
    if (keyword) {
        strHTML = ``;
        for (let i = 1; i <= imgs.length; i++) {
            if (imgs[i-1].keywords.includes(keyword)) strHTML += `<div class="gallery-imgs img${i}"onclick="setImg(${i})" data-img="${i}"><img src="./imgs/meme-imgs (square)/${i}.jpg"></div>`;
        }
    }
    document.querySelector('.imgs-container').innerHTML = strHTML;
}

function toggleGallery(elment) {
    elment.classList.add('active-nav');
    document.querySelector('.imgs-layout').classList.remove('hide');
    document.querySelector('.meme-editor-container').classList.add('hide');
    document.querySelector('.search-container').classList.remove('hide');
    renderGallery();
}
function setCanvasSize(id) {
    var elDiv = document.querySelector('.sizing2');
    elDiv.innerHTML = `<img class="sizing3" src="./imgs/meme-imgs-canvas/${id}.jpg"}">`;
    var elImg = document.querySelector('.sizing3');
    setTimeout(function () {
        var height = elImg.clientHeight;
        var width = elImg.clientWidth;
        setCanvasProps(height, width);
        renderMeme();
        renderEditor();
        setMemeLinesPos();
    }, 50)
}