window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    /* -----------
        Timer
    -------------*/

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

    /* -----------
        Menu
    -------------*/

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

    /* -----------
        Pop-up
    -------------*/

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

    /* -----------
        Tabs
    -------------*/
    
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

    /* -----------
        Slider
    -------------*/    

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

    /* --------------
        Img-toggle
    ----------------*/

    const toggleTeamImg = () => {
        let storage;
        const teamBlock = document.getElementById('command');

        teamBlock.addEventListener('mouseover', (event) => {
            let target = event.target;
            if (target.matches('.command__photo')) {
                storage = target.src;
                target.src = target.dataset.img;
            }
        });
        teamBlock.addEventListener('mouseout', (event) => {
            let target = event.target;

            if (target.matches('.command__photo')) {
                target.src = storage;
                storage = '';
            }
        });

    };
    toggleTeamImg();

    /* --------------
        Calculator
    ----------------*/

     const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
        let total = 0;
                
        const animateNum = (duration = 1500) => {
            const timing = timeFraction => Math.sqrt(1 - Math.pow(timeFraction - 1, 2));
            const draw = (progress) => {
                totalValue.textContent = Math.ceil(total * progress);
            }; 
            let start = performance.now();
            
            requestAnimationFrame(function animate (time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                let progress = timing(timeFraction);
            
                draw(progress);    
            
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            
            });
        }
        const countSum = () => {
            let countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            };

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } else {
                total = 0;
            }
                
            animateNum();
        }

        calcBlock.addEventListener('change', (event) => {
            let target = event.target;
             if (target.matches('.calc-type') || target.matches('.calc-square') ||
                target.matches('.calc-day') || target.matches('.calc-count')) {
                    countSum();
            }
        })


        const validateCalcInput = () => {
            const calc = document.getElementById('calc');
   
            calc.addEventListener('input', (event) => {
                let target = event.target;
   
                if (target.matches('input')) {
                    let validation = /\D/;
                    target.value = target.value.replace(validation, '');
                }
            })
        };
        validateCalcInput();
     };
     calc(100);
});