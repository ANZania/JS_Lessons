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

let accumulatedMonth = getAccumulatedMonth( money, getExpensesMonth(amount1, amount2) );
let budgetDay = Math.floor( accumulatedMonth / 30 );


function getExpensesMonth ( amount1, amount2 ) {
    let expensesSum = amount1 + amount2;
    return expensesSum;
};

function getAccumulatedMonth ( income, expences ) {
    let accumulations = income - expences;
    return accumulations;
};

function getTargetMonth ( accumulatedMonth, mission ) {
    let targetPeriod = Math.ceil( mission / accumulatedMonth );
    return targetPeriod;
};

function showTypeOf ( data ) {
    console.log( data, typeof( data ) );
};

function getStatusIncome (budgetDay) {
    if (budgetDay < 0) {
        return( 'Что-то пошло не так' );
    } else if (budgetDay >= 1200) {
        return( 'У вас высокий уровень дохода' );
    } else if (budgetDay < 600) {
        return( 'К сожалению, ваш уровень дохода ниже среднего' );
    } else {
        return( 'У вас средний уровень дохода' );
    }
};

showTypeOf( money );
showTypeOf( income );
showTypeOf ( deposit );

console.log( 'Расходы за месяц составляют: ' + getExpensesMonth( amount1, amount2 ));

console.log( addExpenses.toLowerCase().split(', ') );

console.log( 'Бюджет на день: ' + budgetDay );
console.log( 'Цель будет достигнута за ' + getTargetMonth( accumulatedMonth, mission ) + ' месяцев' );
console.log( getStatusIncome(budgetDay) );