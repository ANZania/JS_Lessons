'use strict'

const startBtn = document.querySelector('.start'),
    stopBtn = document.querySelector('.stop'),
    car = document.querySelector('.car'),
    audio = document.querySelector('audio');


let animStartCounter = -1;
let counter = 0;

const toggleAnimation = () => {
    animStartCounter++; 

    let start = performance.now();

    const startAnimate = (duration) => {

        const draw = () => {
            counter += 5;
            car.style.left = counter + 'px';
        }

        requestAnimationFrame(function animate(time) {
            audio.play();
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            draw(timeFraction); 

            if (timeFraction < 1 && animStartCounter % 2 === 0) {
                requestAnimationFrame(animate);
            } else {
                audio.pause();
            }

        });


    };

    if (animStartCounter % 2 === 0) {
        startAnimate(11000);
    } else {
        return;
    }
};

const resetAnimation = () => {
    counter = 0;
    car.style.left = counter + 'px';
    audio.pause();
    audio.currentTime = 0;
     if (animStartCounter % 2 === 0) {
         animStartCounter++;
     };
}


startBtn.addEventListener('click', toggleAnimation);
stopBtn.addEventListener('click', resetAnimation);
