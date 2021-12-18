'use strict'
var imgs = getImgs();

function renderGallery(keyword) {
    resetGmeme();
    var strHTML = `<div class="gallery-imgs input-container img${0}"><input type="file" onchange="onImgInput(event)" class="user-input"><button class="user-img">Upload Image</button></input></div>`;
    for (let i = 1; i <= imgs.length; i++) {
        strHTML += `<div class="gallery-imgs img${i}"onclick="setImg(${i})"><img src="./imgs/meme-imgs (square)/${i}.jpg"></div>`;
    }
    if (keyword) {
        strHTML = ``;
        for (let i = 1; i <= imgs.length; i++) {
            if (imgs[i - 1].keywords.includes(keyword)) strHTML += `<div class="gallery-imgs img${i}"onclick="setImg(${i})"><img src="./imgs/meme-imgs (square)/${i}.jpg"></div>`;
        }
    }
    document.querySelector('.imgs-container').innerHTML = strHTML;
}

function toggleGallery(elment) {
    elment.classList.add('active-nav');
    document.querySelector('.imgs-layout').classList.remove('padding');
    document.querySelector('.my-meme').classList.remove('active-nav');
    document.querySelector('.imgs-layout').classList.remove('hide');
    document.querySelector('.meme-editor-container').classList.add('hide');
    document.querySelector('.search-container').classList.remove('hide');
    renderGallery();
    toggleHeaderNav();
}
function setCanvasSize(id) {
    var elDiv = document.querySelector('.sizing2');
    if (`number` !== typeof id) elDiv.innerHTML = `<img class="sizing3" src="${id}"}">`;
    else elDiv.innerHTML = `<img class="sizing3" src="./imgs/meme-imgs-canvas/${id}.jpg"}">`;
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

function renderMyMeme(element) {
    resetGmeme();
    toggleHeaderNav();
    element.classList.add('active-nav');
    document.querySelector('.imgs-layout').classList.remove('hide');
    document.querySelector('.imgs-layout').classList.add('padding');
    document.querySelector('.gallery-nav').classList.remove('active-nav');
    document.querySelector('.meme-editor-container').classList.add('hide');
    document.querySelector('.search-container').classList.add('hide');
    
    var myMemes = loadFromStorage('imgsDB');
    var strHTML = ``;
    if (!myMemes) return document.querySelector('.imgs-container').innerHTML = strHTML;
    for (var i = 0; i < myMemes.length; i++) {
        strHTML += `<div class="gallery-imgs img${i}"onclick="setImg(${myMemes[i].imgIdx},${i})"><img src="${myMemes[i].img}"}"></div>`;
    }
    document.querySelector('.imgs-container').innerHTML = strHTML;
}
