'use strict'

let left = 0;
let up = 0;
const DomElement = function (selector, height, width, bg, position, fontSize) {
    this.selector = selector; 
    this.height = height;  
    this.width = width;
    this.bg = bg;
    this.position = position;
    this.fontSize = fontSize;
};

DomElement.prototype.createNewElement = function () {
    let newElement;

    if (this.selector[0] === '.') {
        newElement = document.createElement('div');
        newElement.classList.add(this.selector.substr(1));

    } else if (this.selector[0] === '#') {
        newElement = document.createElement('p');
        newElement.id = this.selector.substr(1);
    };

    newElement.style.height = this.height;
    newElement.style.width = this.width;
    newElement.style.background = this.bg;
    newElement.style.position = this.position;
    newElement.style.fontSize = this.fontSize;

    document.body.append(newElement);
    return newElement;
};

let block = new DomElement('.block', '100px', '100px', 'red', 'absolute', '36');

document.addEventListener('DOMContentLoaded', () => {
    let element = block.createNewElement();
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        switch (key) {
            case 'ArrowRight':
                left += 10;
                element.style.left = left + 'px';
                break;
            case 'ArrowLeft':
                left -= 10;
                element.style.left = left + 'px';
                break;
            case 'ArrowUp':
                up -= 10;
                element.style.top = up + 'px';
                break;
            case 'ArrowDown':
                up += 10;
                element.style.top = up + 'px';
                break;
        }
    });
}, false);