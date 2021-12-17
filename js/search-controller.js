'use strict'
var gMore = true;
function boostSize(element, isClicked) {
    var style = window.getComputedStyle(element, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
    element.style.fontSize = fontSize + 2 + 'px';
    if (isClicked) renderGallery(element.innerText);
}
renderKeyWords();
function renderKeyWords() {
    var keywords = getKeyWords();
    var keys = [];
    for (var key in keywords) {
        keys.push(keywords[key]);
    }
    keys.sort((a, b) => b - a);
    var elInputs = document.querySelectorAll('.search-line');
    for (var i = 0; i < elInputs.length - 1; i++) {
        var currKey = Object.keys(keywords).find(key => keywords[key] === keys[i]);
        elInputs[i].innerText = currKey;
        for (var j = 0; j < keys[i]; j++) {
            boostSize(elInputs[i]);
        }
        delete keywords[currKey];
    }
}

function showMoreKeys() {
    var elInputs = document.querySelectorAll('.search-line');
    elInputs.forEach(function (elInput) {
        if (elInput.classList.contains('toggleInput')) elInput.classList.toggle('hide');
    })
    var elBtn = document.querySelector('.more');
    if (gMore) elBtn.innerText = 'Less...';
    else elBtn.innerText = 'More...';
    gMore = !gMore;
}