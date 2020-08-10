'use strict'

let lang = 'en';
let namePerson = 'Максим';
 
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

// Решение через switch
const desicionB = (lang) => {
    switch (lang) {
        case 'ru':
            console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота');
            break;
        case 'en':
            console.log('Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday');
            break;
        default:
            console.log('Что-то пошло не так');
            break;
    };
};

// Решение через многомерный массив
const desicionC = (lang) => {
    const arrayLang = [];
    let stringLang;
    arrayLang['ru'] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    arrayLang['en'] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
   
    // arrayLang[lang].forEach(element=>{
    //     console.log(element);
    // });

    stringLang = arrayLang[lang].join(', ');
    console.log(stringLang);
}


// Второй пункт
namePerson == 'Артем' ? console.log('директор') : namePerson == 'Максим' ? console.log('преподаватель') : console.log('студент');


desicionA(lang);
desicionB(lang);
desicionC(lang)