'use strict'
var gImgs = [
    { id: 1, url: './imgs/meme-imgs-canvas/1.jpg', keywords: ['funny', 'celeb'] },
    { id: 2, url: './imgs/meme-imgs-canvas/2.jpg', keywords: ['dogs', 'cute', 'animals'] },
    { id: 3, url: './imgs/meme-imgs-canvas/3.jpg', keywords: ['baby', 'dogs', 'animals'] },
    { id: 4, url: './imgs/meme-imgs-canvas/4.jpg', keywords: ['funny', 'cat', 'animals'] },
    { id: 5, url: './imgs/meme-imgs-canvas/5.jpg', keywords: ['baby', 'funny'] },
    { id: 6, url: './imgs/meme-imgs-canvas/6.jpg', keywords: ['celeb', 'funny', 'movies'] },
    { id: 7, url: './imgs/meme-imgs-canvas/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: './imgs/meme-imgs-canvas/8.jpg', keywords: ['love'] },
    { id: 9, url: './imgs/meme-imgs-canvas/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: './imgs/meme-imgs-canvas/10.jpg', keywords: ['celeb', 'funny'] },
    { id: 11, url: './imgs/meme-imgs-canvas/11.jpg', keywords: ['sport', 'funny'] },
    { id: 12, url: './imgs/meme-imgs-canvas/12.jpg', keywords: ['celeb', 'you'] },
    { id: 13, url: './imgs/meme-imgs-canvas/13.jpg', keywords: ['celeb', 'movies'] },
    { id: 14, url: './imgs/meme-imgs-canvas/14.jpg', keywords: ['celeb', 'movies'] },
    { id: 15, url: './imgs/meme-imgs-canvas/15.jpg', keywords: ['celeb', 'movies'] }]
var gfirstY;
var gfirstX;
var gLineIdx;
var gKeywordSearchCountMap = objectMap();

function getKeyWords() {
    return gKeywordSearchCountMap;
}

function objectMap() {
    var map = {};
    gImgs.forEach(function (img) {
        img.keywords.forEach(function (key) {
            map[key] = (map[key]) ? map[key] + 1 : 1;
        })
    })
    return map;
}

function updateMemeIdx() {
    gMeme.selectedLineIdx = gLineIdx;
}

function updateGlineIdx() {
    gLineIdx = gMeme.selectedLineIdx;
}

function getImgs() {
    return gImgs;
}

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'white',
            stColor: 'black',
            font: 'impact',
            x: null,
            y: null,
            id: 1
        },
    ]
}

function setMemeLinesPos() {
    var { x, y } = getLinesFirstPos();
    gMeme.lines[0].x = x;
    gMeme.lines[0].y = y;
    gfirstX = x;
    gfirstY = y;
}

function trash() {
    if (!gMeme.lines.length) return
    var shure = confirm('Are you shure ?');
    if (!shure) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderMeme();
    if (!gMeme.selectedLineIdx) return;
    gMeme.selectedLineIdx--;
}

function addLine() {
    var prevLine = gMeme.lines[gMeme.lines.length - 1];
    if (!prevLine) prevLine = { x: gfirstX, y: gfirstY, id: 1 }
    var line = {
        txt: 'This Is A FaLaFel',
        size: 50,
        align: 'center',
        color: 'white',
        stColor: 'black',
        font: 'impact',
        x: prevLine.x,
        y: prevLine.y + prevLine.size * 1.5,
        id: Math.floor(prevLine.id + 1)
    }
    if (line.id === 2) {
        line.y = gfirstY * 4;
    }
    else if (line.id === 3) {
        line.y = gfirstY + prevLine.size * 1.5;
    }
    gMeme.lines.push(line);
    switchLine(true);
}

function switchLine(newLine) {
    if (!gMeme.lines.length) return
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1;
    if (newLine) gMeme.selectedLineIdx = gMeme.lines.length - 1;
    setInputTxt();
    renderMeme();
}

function getCurrImg(id) {
    var currImg = gImgs.find(img => img.id === id)
    return currImg.url;
}

function getMeme() {
    return gMeme;
}

function setAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
    renderMeme();
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    renderMeme()
}

function setStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].stColor = color;
    renderMeme()
}

function setFontSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size += size;
    renderMeme();
}

function changeX(value) {
    gMeme.lines[gMeme.selectedLineIdx].x += +value;
    renderMeme();
}

function changeY(value) {
    gMeme.lines[gMeme.selectedLineIdx].y += +value;
    renderMeme();
}

function setFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value;
    renderMeme();
}

function drawRect() {
    var currMeme = gMeme.lines[gMeme.selectedLineIdx];
    if (!currMeme || !currMeme.txt) return
    var x = currMeme.x;
    var y = currMeme.y;
    var sizing = document.querySelector('.sizing');
    sizing.innerText = currMeme.txt;
    sizing.style.fontSize = currMeme.size + 'px'
    var xSize = sizing.clientWidth + 75;
    var ySize = sizing.clientHeight;
    gCtx.lineWidth = 5;
    gCtx.beginPath()
    gCtx.strokeStyle = 'white';
    gCtx.rect(x - xSize / 2, y - ySize / 2, xSize, ySize);
    gCtx.stroke();
    gCtx.closePath();
}

function drawText(txt, x, y, size, align, color, stColor, font) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = align;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = stColor;
    gCtx.font = `${size}px ${font}`;
    gCtx.fillStyle = color;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function setLineText(text) {
    if (!gMeme.lines.length) return addLine();
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function setImg(id,memeIdx) {
    gMeme.selectedImgId = id;
    setCanvasSize(id);
    if (memeIdx) {
        var myMemes = loadFromStorage('imgsDB');
        gMeme.lines = myMemes[memeIdx].lines;
        switchLine(true);
    }
    renderMeme();
}