'use strict'

let money = start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expences: {},
    addExpenсes: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expencesMonth: 0,
    asking: function () {
        let dialogCall = 0;
        let addExpencesInput,
            expenceName,
            expenceValue;

        if ( confirm( 'Есть ли у вас дополнительный доход?' ) ) {
            let itemIncome,
                cashIncome;

            do {
                itemIncome = prompt( 'Какой у вас дополнительный источник дохода?' );
            }   while ( !isText( itemIncome ) );

            do {
                cashIncome = prompt( 'Какой доход это приносит?' );
            } while ( !isNumber( cashIncome ));

            appData.income[ itemIncome ] = +cashIncome;
        }

        do {
            addExpencesInput = prompt( 'Перечислите возможные статьи расходов за рассчитываемый период через запятую:' );
        } while ( !isText( addExpencesInput ) );

        appData.addExpenсes = addExpencesInput.toLowerCase().split(', ');
        appData.deposit = confirm( 'Есть ли у вас депозит в банке?' );

        if ( appData.deposit ) {
            appData.getInfoDeposit();
        };

        if ( dialogCall === 0 ) {
            for ( let i = 0; i < 2; i++ ) {
                do {
                    expenceName = prompt( 'Введите обязательную статью расходов:' );
                } while ( !isText(expenceName ));

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
    },
    getInfoDeposit: function () {
        if ( appData.deposit ) {
            let cashDeposit;
            do {
                appData.percentDeposit = prompt( 'Под какой процент годовых?' );
            } while ( !isNumber( appData.percentDeposit ));

            do {
                cashDeposit = prompt( 'Какова его сумма в рублях?' );
            } while ( !isNumber( cashDeposit ));
            appData.moneyDeposit = +cashDeposit;
        };
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
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
function isText ( n ) {
    if ( ('' + n).trim().length == 0 ) {
        return false;
    } else {
        if ( isNumber( n ) ) {
            return false;
        };
    } if ( typeof n === 'string' ) {
        return true;
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
objectOutput( appData );
for ( let i in appData.addExpenсes ) {
    let element = appData.addExpenсes[i];
    element = element.charAt(0).toUpperCase() + element.substr(1);
    appData.addExpenсes[i] = element;
};
console.log( appData.addExpenсes.join( ', ' ) );