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

    setInterval(countTimer, 1000, '05 Septemper 2020')

    //Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => menu.classList.toggle('active-menu');

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.closest('ul>li')) {
                handlerMenu();
            } 

        });

    };
    toggleMenu();

    //Pop-up
    const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn');

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
        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('.popup-close')) {
                popUp.style.display = 'none';
            } else {

                target = target.closest('.popup-content');
                
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        })
    };
    togglePopUp();

    //Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }

        }

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab')

            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, index) => {

                    if (item === target) {
                        toggleTabContent(index);
                    }
                })
            }
                
        });

    };    
    tabs();

    //Slider

    const slider = () => {
        const dots = document.querySelectorAll('.dot'),
            slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };
        startSlide(2000);

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                };
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = slide.length - 1;
                };
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
                 if (elem === target) {
                     currentSlide = index;
                 }
                });
            };

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });
        
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide(2000);
            }
        });
    };
    const addDots = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        portfolioDots = document.querySelector('.portfolio-dots');

        slide.forEach(() => {
            const newDot = document.createElement("li");
            newDot.classList.add("dot");
            portfolioDots.appendChild(newDot);
          });
        
        portfolioDots.children[0].classList.add("dot-active");
    };
    addDots();
    slider();
});