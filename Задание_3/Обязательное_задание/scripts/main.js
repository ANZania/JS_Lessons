'use strict'

let lang = 'ru';
 
// Решение через if
const desicionA = (lang) => {  
    if (lang === 'ru') {
        console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота');
    } else if (lang == 'en') {
        console.log('Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday');
    } else {
        console.log('Что-то пошло не так');
    }
};

desicionA(lang);