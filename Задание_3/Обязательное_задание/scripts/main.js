'use strict'

let money = +prompt('Введите ваш ежемесячный доход: ');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
let deposit = confirm('Есть ли у вас депозит в банке? ', 'да/нет');
let expences1 = prompt('Введите обязательную статью расходов: ');
let amount1 = +prompt('Во сколько это обойдётся? ');
let expences2 = prompt('Введите обязательную статью расходов: ');
let amount2 = +prompt('Во сколько это обойдётся? ');

let income = 'фриланс';
let mission = 100000;

let budgetMounth = money - amount1 - amount2;
let period = Math.ceil( mission / budgetMounth );
let budgetDay = Math.floor( budgetMounth / 30 );


console.log( 'Тип переменной money: ' + typeof money );
console.log( 'Тип переменной income: ' +typeof income );
console.log( 'Тип переменной deposit: ' +typeof deposit );

console.log( 'Длина строки addExpenses: ' + addExpenses.length );
console.log( addExpenses.toLowerCase().split(', ') );

console.log( 'Период равен: ' + period + ' месяцев' );
console.log( 'Цель - заработать ' + mission + ' рублей' );

console.log( 'Бюджет на день: ' + budgetDay );
console.log( 'Бюджет на месяц: ' + budgetMounth );
console.log( 'Цель будет достигнута за ' + period + ' месяцев' );

if (budgetDay < 0) {
    console.log('Что-то пошло не так');
} else if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay < 600) {
    console.log('К сожалению, ваш уровень дохода ниже среднего');
} else {
    console.log('У вас средний уровень дохода');
}