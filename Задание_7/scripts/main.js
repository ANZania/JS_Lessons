'use strict'

let week = [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение' ];

const now = new Date(); 
const currentDay = now.getDay() - 1;
const block = document.querySelector('.text-block');

const main = function () {
    for ( let day in week ) {
        console.log( week[day]);
        if ( week[day] == week.slice(currentDay) && ( day === '5' || day === '6')) {
            let content = '<pre>' +  (week[day].italics()).bold()  + '\n' + '<\/pre>';
            block.insertAdjacentHTML('beforeend', content);
        } else if ( (week[day] === week[currentDay]) ) {
            let content = '<pre>' +   week[day].bold()  + '\n' + '<\/pre>'
            block.insertAdjacentHTML('beforeend', content);
        } else if ( day === '5' || day === '6' ) {
            let content = '<pre>' +   week[day].italics() + '\n' + '<\/pre>';
            block.insertAdjacentHTML('beforeend', content);
        } else {
            let content = '<pre>' +  week[day] + '\n' + '<\/pre>';
            block.insertAdjacentHTML('beforeend', content);
        };
    };
};
main()
