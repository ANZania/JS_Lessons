window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    //Timer
    const countTimer = (deadline) => {
        let timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');

        const getTimeRemaining = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor((timeRemaining / 60) / 60);

                if (seconds < 0) {
                    seconds = 0;
                }
                if (minutes < 0) {
                    minutes = 0;
                }
                if (hours < 0) {
                    hours = 0;
                }

                return {timeRemaining, hours, minutes, seconds};
        }

        const addZero = (number) => {
            if (number < 10) {
                number = '0' + number;
            }
            return number;
        };

        const updateClock = () => {
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining < 0) {
                clearInterval(IntUpdateClock);
            }
        }

        const IntUpdateClock = setInterval(updateClock, 1000); 
        updateClock();
    }

    setInterval(countTimer, 1000, '02 Septemper 2020')

    //Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            closeBtn = document.querySelector('.close-btn'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => menu.classList.toggle('active-menu');

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((element) => element.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //Pop-up
    const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpCloseBtn = document.querySelector('.popup-close');

    const togglePopUp = () => {
        
        popUpBtn.forEach((element) => {
            element.addEventListener('click', () => { 
                   
                popUp.style.display = 'block'; 
                let width = document.documentElement.clientWidth;              

                if (width > 768) {
                    popUp.style.opacity = '0%';           
                        
                    let opacityCounter = 0;
                    let duration = 1000;
                    
                    const animatePopUp = () => {                   
                        
                        let start = performance.now();

                        const draw = () => {
                            opacityCounter += 10;
                            popUp.style.opacity = opacityCounter + '%';
                        };

                        let requestId = requestAnimationFrame(function animate (time) {
                            let timeFraction = (time - start) / duration;
                            if (timeFraction > 1) timeFraction = 1;

                            let progress = timeFraction;

                            draw(progress);

                            if (timeFraction < 1) {
                                requestAnimationFrame(animate);
                            }
                        });
                    
                    };
                    animatePopUp();
                }              
            });            
        });
        popUpCloseBtn.addEventListener('click', () => {
            popUp.style.display = 'none';
        }); 
    };
    togglePopUp();
});