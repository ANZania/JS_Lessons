'use strict'

let week = [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение' ];

const now = new Date(); 
const currentDay = now.getDay() - 1;

const main = function () {
    for ( let day in week ) {
        console.log(day);
        if ( week[day] === week[currentDay] && ( day === '5' || day === '6' + '\n') ) {
            document.write ( '<pre>' +  week[day].italics().bold()  + '\n' + '<\/pre>');
        } else if ( week[day] === week[currentDay] ) {
            document.write ('<pre>' +   week[day].bold()  + '\n' + '<\/pre>');
        } else if ( day === '5' || day === '6' ) {
            document.write ('<pre>' +   week[day].italics() + '\n' + '<\/pre>' );
        } else {
            document.write('<pre>' +  week[day] + '\n' + '<\/pre>');
        };
    };
};
main()