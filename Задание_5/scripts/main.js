'use strict'

let money = start();
let addExpenses = prompt( 'Перечислите возможные статьи расходов за рассчитываемый период через запятую:' ),
    deposit = confirm( 'Есть ли у вас депозит в банке?' );

let income = 'фриланс',
    mission = 100000,
    expences1,
    expences2;

let expencesAmount = getExpencesMounth();
let accumulatedMonth = getAccumulatedMonth( money, expencesAmount );
let budgetDay = Math.floor( accumulatedMonth / 30 );
let period = getTargetMonth( accumulatedMonth, mission );



function isNumber ( n ) {
    return !isNaN(parseFloat( n )) && isFinite( n );
};

function showTypeOf ( data ) {
    console.log( data, typeof( data ) );
};

function start () {
    let money;
    do {
        money = prompt( 'Введите ваш ежемесячный доход:' );
    }   while ( !isNumber( money ) );

    return money;
};

function getExpencesMounth () {
    let expensesSum = 0;
    let amount;

    for ( let i = 0; i < 2; i++ ) {
        if ( i === 0 ) {
            expences1 = prompt( 'Введите обязательную статью расходов:' )
        } else if ( i === 1 ) {
            expences2 = prompt( 'Введите обязательную статью расходов:' )
        };

        do {
            amount = prompt( 'Во сколько это обойдётся?' );
        }   while ( !isNumber( amount ) );
        
        expensesSum += +amount;
    };

    return expensesSum;
};

function getAccumulatedMonth ( incomes, expences ) {
    let accumulations = incomes - expences;
    return accumulations;
};

function getTargetMonth ( accumulatedMonth, mission ) {
    let targetPeriod = Math.ceil( mission / accumulatedMonth );
    return targetPeriod;
};

function getStatusIncome ( budgetDay ) {
    if ( budgetDay < 0 ) {
        return( 'Что-то пошло не так' );
    } else if ( budgetDay >= 1200 ) {
        return( 'У вас высокий уровень дохода' );
    } else if ( budgetDay < 600 ) {
        return( 'К сожалению, ваш уровень дохода ниже среднего' );
    } else {
        return( 'У вас средний уровень дохода' );
    }
};


showTypeOf( money );
showTypeOf( income );
showTypeOf ( deposit );

console.log( addExpenses.toLowerCase().split(', ') );
console.log( 'Расходы за месяц составляют: ' + expencesAmount );
console.log( 'Бюджет на день: ' + budgetDay );

if ( period < 0 ) {
    console.log( 'Цель не будет достигнута' );
} else {
    console.log( 'Цель будет достигнута за ' + period + ' месяцев' );
};

console.log( getStatusIncome(budgetDay) );