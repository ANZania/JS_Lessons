window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    //Timer
    function countTimer (deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'); 

        function getTimeRemaining () {
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

        function addZero (number) {
            if (number < 10) {
                number = '0' + number;
            }
            return number;
        };

        function updateClock () {
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

    //countTimer ('01 Septemper 2020');
    setInterval(countTimer, 1000, '01 Septemper 2020')
});