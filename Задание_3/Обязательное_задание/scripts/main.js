'use strict'

let money = prompt('Введите ваш ежемесячный доход: ');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
let deposit = prompt('Есть ли у вас депозит в банке? ');
let expences1 = prompt('Введите обязательную статью расходов: ');
let amount1 = prompt('Во сколько это обойдётся? ');
let expences2 = prompt('Введите обязательную статью расходов: ');
let amount2 = prompt('Во сколько это обойдётся? ');

let budgetMounth = money - amount1 - amount2;

let mission = 100000;
let period = Math.ceil( mission / budgetMounth );
let budgetDay = Math.floor( budgetMounth / 30 );

if (budgetDay < 0) {
    console.log('Что-то пошло не так');
} else if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay < 600) {
    console.log('К сожалению, ваш уровень дохода ниже среднего');
} else {
    console.log('У вас средний уровень дохода');
}

console.log( 'money is ' + typeof money );
console.log( 'income is ' +typeof income );
console.log( 'deposit is ' +typeof deposit );

console.log( 'addExpenses length: ' + addExpenses.length );

console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );

console.log( addExpenses.toLowerCase().split(', ') );

console.log( 'budgetDay: ' + budgetDay );