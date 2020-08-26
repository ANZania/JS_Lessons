const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector; 
    this.height = height;  
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.createNewElement = function () {
    let newElement;

    if (this.selector[0] = '.') {
        newElement = document.createElement('div');
        newElement.classList.add(this.selector.substr(1));

    } else if (this.selector[0] = '#') {
        newElement = document.createElement('p');
        newElement.id = this.selector.substr(1);
    };

    newElement.style.height = this.height;
    newElement.style.width = this.width;
    newElement.style.background = this.bg;
    newElement.style.fontSize = this.fontSize;

    newElement.textContent = 'Text';

    document.body.append(newElement);
};

let element = new DomElement('.block', '40px', '100px', 'green', '24');
element.createNewElement();