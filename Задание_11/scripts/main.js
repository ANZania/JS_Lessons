'use strict'

const calculateButton = document.getElementById('start');
const plusIncome = document.querySelectorAll('button')[0];
const plusExpences = document.querySelectorAll('button')[1];
const depositCheckButton = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalIncomeInput1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeInput2 = document.querySelectorAll('.additional_income-item')[1];

// Results
const budgetMonthValue = document.querySelectorAll('.budget_month-value')[0];
const budgetDayValue = document.querySelectorAll('.budget_day-value')[0];
const expencesMonthValue = document.querySelectorAll('.expenses_month-value')[0];
const additionalIncomeValue = document.querySelectorAll('.additional_income-value')[0];
const additionalExpensesValue = document.querySelectorAll('.additional_expenses-value')[0];
const incomePeriodValue = document.querySelectorAll('.income_period-value')[0];
const targetMonthValue = document.querySelectorAll('.target_month-value')[0];

// Inputs
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const incomeItem = document.querySelectorAll('.income-items');

let expencesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');


let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expences: {},
    addExpenсes: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expencesMonth: 0,
    start: function () {
        appData.budget = salaryAmount.value;

    
        appData.getExpences();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getTargetMonth();
        appData.getStatusIncome();
        appData.getAddExpences();
        appData.getAddIncome();
        appData.showResult();

        return;
        
    },
    getExpensesMonth: function () {        
        let expencesSum = 0;
      
        for ( let key in appData.expences ) {        
            expencesSum += +appData.expences[ key ];
        };
        appData.expencesMonth = expencesSum;     
    },
    getBudget: function () {
        appData.budgetMonth = +appData.budget + appData.incomeMonth - +appData.expencesMonth;
        appData.budgetDay = Math.floor( appData.budgetMonth / 30 );
    },
    getTargetMonth: function () {
        appData.period = Math.ceil( targetAmount.value / appData.budgetMonth );
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
        return appData.budgetMonth * periodSelect.value;
    },
    addExpencesBlock: function () {
        let cloneExpencesItem = expencesItems[0].cloneNode(true);
        cloneExpencesItem.querySelectorAll('input')[0].value = '';
        cloneExpencesItem.querySelectorAll('input')[1].value = '';
        plusExpences.before(cloneExpencesItem);
        expencesItems = document.querySelectorAll('.expenses-items');

        if (expencesItems.length === 3) {
            plusExpences.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        
        cloneIncomeItem.querySelectorAll('input')[0].value = '';
        cloneIncomeItem.querySelectorAll('input')[1].value = '';
        plusIncome.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            plusIncome.style.display = 'none';
        }
    },
    getExpences: function () {
        expencesItems.forEach( function (item) {
            let itemExpences = item.querySelector('.expenses-title').value;
            let cashExpences = item.querySelector('.expenses-amount').value;

            if (itemExpences !== '' && cashExpences !== '') {
                appData.expences[itemExpences] = cashExpences;
            }
        });
    },
    getIncome: function () {
        incomeItem.forEach( function (item) {
            let titleIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (titleIncome !== '' && cashIncome !== '') {
                appData.income[titleIncome] = cashIncome;
            };

            for (let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
            }
        });
    },
    showResult: function () {
        periodSelect.addEventListener( 'input', appData.showResult);
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expencesMonthValue.value = appData.expencesMonth; 
        additionalExpensesValue.value = appData.addExpenсes.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.period;
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    getAddExpences: function () {
        let addExpenсes = additionalExpensesItem.value.split(', ');
        addExpenсes.forEach( function (item) {
            item = item.trim();
            if ( item !== '' ) {
                appData.addExpenсes.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach( function (item) {
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                appData.addIncome.push( itemValue );
            }
        });
    },
    changePeriodAmount: function () {
        let periodValue = +periodSelect.value;
        periodAmount.textContent = periodValue;
    },
    checkSalaryAmount: function () {
        let inputValue = salaryAmount.value;
        inputValue = inputValue.trim();
        if (inputValue === '') {
            calculateButton.disabled = true;
        } else {
            calculateButton.disabled = false;
        }
    }
};
function getStartDisabled () {
    calculateButton.disabled = true;
};
getStartDisabled();


calculateButton.addEventListener( 'click', appData.start );
plusExpences.addEventListener( 'click', appData.addExpencesBlock );
plusIncome.addEventListener( 'click', appData.addIncomeBlock );
periodSelect.addEventListener( 'input', appData.changePeriodAmount );
salaryAmount.addEventListener( 'input', appData.checkSalaryAmount )
