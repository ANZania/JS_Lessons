'use strict'

const minNum = 0;
const maxNum = 16777215;

const newColorButton = document.querySelector('.new-color');

function chooseRandColor () {
    let randNum = minNum - 0.5 + Math.random() * (maxNum - minNum + 1);
    randNum = Math.round(randNum);

    let color = changeToHex(randNum);
    let h1 = document.querySelector('h1');

    while (color.length < 6) {
        color = '0' + color;
    };

    h1.textContent = '#'+ color;
    document.body.style.backgroundColor = '#'+ color;

};

function changeToHex (number) {
    let hexNum = '';
    while (number > 0) {
        let digit = number % 16;
        if (digit >= 10 && digit <=15) {
            switch (digit) {
                case 10: 
                    digit = 'a';
                    break;
                case 11: 
                    digit = 'b';
                    break;
                case 12: 
                    digit = 'c';
                    break;
                case 13: 
                    digit = 'd';
                    break;
                case 14: 
                    digit = 'e';
                    break;
                case 15: 
                    digit = 'f';
                    break;
            };
        }
        
        hexNum = ('' + digit) + hexNum;
        number = (number - (number % 16)) / 16;
    };
    return hexNum;
} 

newColorButton.addEventListener('click', chooseRandColor)

