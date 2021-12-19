'use strict'
var gNextId = 3;
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

function updateLinesPos() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].x = gCanvas.getBoundingClientRect().width / 2 + gMeme.lines[i].changeX;
        gMeme.lines[i].y = gCanvas.getBoundingClientRect().height / 5 + (gMeme.lines[i].size * i) + gMeme.lines[i].changeY;
        if (i == 1) gMeme.lines[i].y = gCanvas.getBoundingClientRect().height / 5 * 4 + gMeme.lines[i].changeY;
    }
}

function updateGimgs(img) {
    gImgs.push(img)
}

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
            txt: 'I LoVe FalAfEL',
            size: 40,
            align: 'center',
            color: 'white',
            stColor: 'black',
            font: 'impact',
            x: null,
            y: null,
            width: null,
            height: null,
            changeX: 0,
            changeY: 0,
            id: 1
        },
        {
            txt: 'TwiCe A WEEk',
            size: 40,
            align: 'center',
            color: 'white',
            stColor: 'black',
            font: 'impact',
            x: null,
            y: null,
            width: null,
            height: null,
            changeX: 0,
            changeY: 0,
            id: 2
        },
    ]
}

function checkLines(ev) {
    var ratioW = gCanvas.width / gCanvas.getBoundingClientRect().width;
    var ratioH = gCanvas.height / gCanvas.getBoundingClientRect().height;
    var foundLine = false;
    gMeme.lines.forEach((line, idx) => {
        // if (idx === 1)  {
        //     console.log(ev.offsetX + 'ssss' + line.x + line.width / 2 / ratioW);
        //     gMeme.selectedLineIdx = idx;
        //      renderMeme();
        //     // console.log(ev.offsetY);
        //     // console.log(line.y + line.size / 2 / ratioH);
        //     // console.log(line.y - line.size / 2 / ratioH);
        // }
        if ((ev.offsetX <= line.x + line.width / 2 / ratioW && ev.offsetX >= line.x - line.width / 2 / ratioW) &&
         (ev.offsetY <= line.y + line.size / 2 / ratioH && ev.offsetY >= line.y - line.size / 2 / ratioH)) {
            console.log(idx);
            gMeme.selectedLineIdx = idx;
             renderMeme();
             foundLine = true;
         }
         if (!foundLine) {
             gMeme.selectedLineIdx = -1;
            renderMeme();
         } 
})
}

function setMemeLinesPos() {
    var { x, y } = getLinesFirstPos();
    gMeme.lines[0].x = x;
    gMeme.lines[0].y = y;
    gMeme.lines[1].x = x;
    gMeme.lines[1].y = y * 4;
    gfirstX = x;
    gfirstY = y;
    updateLinesPos();
    switchLine();
}

function trash() {
    if (!gMeme.lines.length) return
    var shure = confirm('Are you sure ?');
    if (!shure) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderMeme();
    if (!gMeme.selectedLineIdx) return;
    gMeme.selectedLineIdx--;
}

function addLine() {
    var firstLine = gMeme.lines[0];
    if (!firstLine) firstLine = { x: gfirstX, y: gfirstY, id: 1 }
    var line = {
        txt: 'This Is A FaLaFel',
        size: 40,
        align: 'center',
        color: 'white',
        stColor: 'black',
        font: 'impact',
        x: gfirstX,
        y: gfirstY + (gMeme.lines.length -1) * 40,
        width: null,
        height: null,
        changeX: 0,
        changeY: 0,
        id: gNextId
    }
    gNextId++;
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
    var currImg = gImgs.find(img => img.id === id);
    if (!currImg) return id;
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
    gMeme.lines[gMeme.selectedLineIdx].changeX += +value;
    renderMeme();
}

function changeY(value) {
    gMeme.lines[gMeme.selectedLineIdx].changeY += +value;
    renderMeme();
}

function setFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value;
    renderMeme();
}

function drawRect() {
    var currMeme = gMeme.lines[gMeme.selectedLineIdx];
    if (!currMeme || !currMeme.txt) return
    var x = currMeme.x + currMeme.changeX;
    var y = currMeme.y + currMeme.changeY;
    var sizing = document.querySelector('.sizing');
    sizing.innerText = currMeme.txt;
    sizing.style.fontSize = currMeme.size + 'px'
    var xSize = sizing.clientWidth;
    var ySize = sizing.clientHeight;
    gMeme.lines[gMeme.selectedLineIdx].width = xSize;
    gMeme.lines[gMeme.selectedLineIdx].height = ySize;
    var ratioW = gCanvas.width / gCanvas.getBoundingClientRect().width;
    var ratioH = gCanvas.height / gCanvas.getBoundingClientRect().height;
    gCtx.lineWidth = 5;
    gCtx.beginPath()
    gCtx.strokeStyle = 'white';
    gCtx.rect(x * ratioW - xSize / 2, y * ratioH - ySize / 2, xSize, ySize);
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
    var ratioW = gCanvas.width / gCanvas.getBoundingClientRect().width;
    var ratioH = gCanvas.height / gCanvas.getBoundingClientRect().height;
    gCtx.fillText(txt, x * ratioW, y * ratioH);
    gCtx.strokeText(txt, x * ratioW, y * ratioH);
}

function setLineText(text) {
    if (!gMeme.lines.length) return addLine();
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function setImg(id, memeIdx) {
    gMeme.selectedImgId = id;
    var imgs = getImgs();
    if (id >= imgs.length) {
        setCanvasSize(imgs[id - 1].url)
    }
    else setCanvasSize(id);
    if (`number` === typeof memeIdx) {
        var myMemes = loadFromStorage('imgsDB')[memeIdx];
        console.log(id,myMemes);
        gMeme.lines = myMemes[memeIdx].lines;
        switchLine(true);
    }
    renderMeme();
}

function resetGmeme() {
    gMeme =
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I LoVe FalAfEL',
                size: 40,
                align: 'center',
                color: 'white',
                stColor: 'black',
                font: 'impact',
                x: null,
                y: null,
                width: null,
                height: null,
                changeX: 0,
                changeY: 0,
                id: 1
            },
            {
                txt: 'TwiCe A WEEk',
                size: 40,
                align: 'center',
                color: 'white',
                stColor: 'black',
                font: 'impact',
                x: null,
                y: null,
                width: null,
                height: null,
                changeX: 0,
                changeY: 0,
                id: 2
            },
        ]
    }
}