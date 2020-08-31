'use strict'

const greeting = document.querySelector('#greeting');
const currentDay = document.querySelector('#current-day');
const currentTime = document.querySelector('#current-time');
const newYearTimer = document.querySelector('#new-year-timer');


const strDay = ['День', 'Дня', 'Дней'];
const options = {
    weekday: 'long'
}

const start = () => {
    const date = new Date();
    let days = getTimeRemaining();

    greeting.textContent = getGreeting();
    currentDay.textContent = date.toLocaleString('ru', options)[0].toUpperCase() + date.toLocaleString('ru', options).substr(1);
    currentTime.textContent = format(date);
    newYearTimer.textContent = days + ' ' + dayFormat(days, strDay);

    function getGreeting () {
        if (date.getHours() > 5 && date.getHours() < 11) {
            return 'Доброе утро!';

          } else if (date.getHours() >= 11 && date.getHours() < 17) {
            return 'Добрый день!';

          } else if (date.getHours() >= 17 && date.getHours() < 21) {
            return 'Добрый вечер!';

          } else {
            return 'Доброй ночи!';
          }
    }

    function addZero (number) {
        if (number < 10) {
            number = '0' + number;
        };
        return number;
    }

    function format(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        const strTime = addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + ' ' + ampm;

        return strTime;
    }

    function getTimeRemaining () {
        let dateStop = new Date('1 Jan 2021').getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            days = Math.floor(((timeRemaining / 60) / 60) / 24);
        return days;
    }
     
    function dayFormat(num, textForms) {
        num = Math.abs(num) % 100; 
        let newNum = num % 10;

        if (num > 10 && num < 20) { return textForms[2]; }
        if (newNum > 1 && newNum < 5) { return textForms[1]; }
        if (newNum == 1) { return textForms[0]; }
        
        return textForms[2];
    }
    
};

setInterval(start, 1000);