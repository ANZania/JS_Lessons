'use strict'
function main () {
    const date = new Date();

    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    const currentDay = date.getDay();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const currentHour = date.getHours();
    const currentMinutes = date.getMinutes();
    const currentSeconds = date.getSeconds();

    const getSecondMod = ( number ) => {
        let word;
        if ( number >=11 && number <= 19 ) {
            word = 'секунд';
            return word;

        } else if (( number % 10 ) === 1 ) {
            word = 'секунда';
            return word;

        } else if ((( number % 10 ) > 1 ) && (( number % 10) <= 4) ) {
            word = 'секунды';
            return word;

        } else {
            word = 'секунд';
            return word;
        };
    };
    const getMinuteMod = ( number ) => {
        let word;
        if ( number >=11 && number <= 19 ) {
            word = 'минут';
            return word;

        } else if (( number % 10 ) === 1 ) {
            word = 'минута';
            return word;

        } else if ((( number % 10 ) > 1 ) && (( number % 10) <= 4) ) {
            word = 'минуты';
            return word;

        } else {
            word = 'минут';
            return word;
        };
    };
    const getHourMod = ( number ) => {
        let word;

        if ( number >=11 && number <= 19 ) {
            word = 'часов';
            return word;

        } else if (( number % 10 ) === 1 ) {
            word = 'час';
            return word;

        } else if ((( number % 10 ) > 1 ) && (( number % 10) <= 4) ) {
            word = 'часа';
            return word;

        } else {
            word = 'часов';
            return word;
        };
    };
    const addZero = ( number ) => {
        if (( '' + number ).length === 1 ) {
            number = '0' + number;
            return number;

        } else {
            return number;
        };
    };

    const getOutput = () => {
        console.log( 'Сегодня', weekDays[currentDay], ',', currentDate, months[currentMonth], currentYear, 'года,', 
                currentHour, getHourMod(currentHour), currentMinutes, getMinuteMod(currentMinutes), currentSeconds, getSecondMod(currentSeconds) );

        console.log( addZero(currentDate) + '.' + addZero(currentMonth + 1) + '.' + currentYear + ' -',
                addZero(currentHour) + ':' + addZero(currentMinutes) + ':' + addZero(currentSeconds));
    };

    getOutput();
};

let timerId = setInterval(main, 1000);
setTimeout(() => { clearInterval(timerId); }, 60000);