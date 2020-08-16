'use strict'

let money = start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expences: {},
    addExpenсes: [],
    deposit: false,
    mission: 100000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expencesMonth: 0,
    asking: function () {
        let dialogCall = 0;
        let expenceName,
            expenceValue;

        let addExpencesInput = prompt( 'Перечислите возможные статьи расходов за рассчитываемый период через запятую:' );
        appData.addExpenсes = addExpencesInput.toLowerCase().split(', ');
        appData.deposit = confirm( 'Есть ли у вас депозит в банке?' );

        if ( dialogCall === 0 ) {
            for ( let i = 0; i < 2; i++ ) {
                expenceName = prompt( 'Введите обязательную статью расходов:' );
                expenceValue = undefined;

                if ( appData.expences[ expenceName ] ) {
                    expenceValue = appData.expences[ expenceName ];
                };

                do {
                    appData.expences[ expenceName ] = prompt( 'Во сколько это обойдётся?' );
                } while ( !isNumber( appData.expences[ expenceName ] ) );

                appData.expences[ expenceName ] = +appData.expences[ expenceName ];

                if ( expenceValue ) {
                    appData.expences[ expenceName ] += expenceValue;
                };

                dialogCall = 1;
            };
        };
    },
    getExpensesMonth: function () {        
        let expencesSum = 0;
      
        for ( let key in appData.expences ) {        
            expencesSum += +appData.expences[ key ];
        };
        appData.expencesMonth = expencesSum;     
    },
    getBudget: function () {
        appData.budgetMonth = +appData.budget - +appData.expencesMonth;
        appData.budgetDay = Math.floor( appData.budgetMonth / 30 );
    },
    getTargetMonth: function () {
        appData.period = Math.ceil( appData.mission / appData.budgetMonth );
    },
    getStatusIncome: function () {
        if ( appData.budgetDay < 0 ) {
            return( 'Что-то пошло не так' );

        } else if ( appData.budgetDay >= 1200 ) {
            return( 'У вас высокий уровень дохода' );

        } else if ( appData.budgetDay < 600 ) {
            return( 'К сожалению, ваш уровень дохода ниже среднего' );
            
        } else {
            return( 'У вас средний уровень дохода' );
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

function start () {
    let money;
    do {
        money = prompt( 'Введите ваш ежемесячный доход:' );
    }   while ( !isNumber( money ) );

    return +money;
};
function isNumber ( n ) {
    if ( ('' + n).trim().length == 0 ) {
        return false;
    } else {
        return !isNaN( parseInt( n ) ) && isFinite( n );
    };
};

const objectOutput = function (objectName) {
    console.log( 'Наша программа включает в себя данные: ' );

    for ( let key in objectName ) {
        console.log( key + ': ' + objectName[key] );
    };
};

console.log( 'Расходы за месяц составляют: ' + appData.expencesMonth );
console.log( 'Бюджет на день: ' + appData.budgetDay );

if ( appData.period < 0 ) {
    console.log( 'Цель не будет достигнута' );

} else {
    console.log( 'Цель будет достигнута за ' + appData.period + ' месяцев' );

};

console.log( appData.getStatusIncome( appData.budgetDay ) );
objectOutput(appData);