'use strict'

const calculateButton = document.getElementById('start');
const cancelButton = document.getElementById('cancel');
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

let expencesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

let counter = 0;

const AppData = function () {
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expences = {};
    this.addExpenсes = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expencesMonth = 0;
};

AppData.prototype.start = function () {
    this.budget = salaryAmount.value;

    this.getExpences();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getTargetMonth();
    this.getAddExpences();
    this.getAddIncome();
    this.showResult();

    this.blockTextInputs();
    this.toggleButton();
    
};
AppData.prototype.reset = function () {
    [...document.querySelectorAll('section.main input[type="text"]')]
    .forEach( element => element.value = '' );
    [...document.querySelectorAll('section.main input[type="text"]')]
    .forEach( element => element.disabled = false );

    plusExpences.style.display = 'block';
    plusIncome.style.display = 'block';

    let incomeBlocks = document.querySelectorAll('.income-items');
    for (let i = 0; i < incomeBlocks.length; i++) {
        if (i > 0) {
            incomeBlocks[i].remove();
        };
    };

    let expensesBlocks = document.querySelectorAll('.expenses-items');
    for (let i = 0; i < expensesBlocks.length; i++) {
        if (i > 0) {
            expensesBlocks[i].remove();
        };
    };
    
    this.resetAppDataProp();
    this.toggleButton();
};
AppData.prototype.toggleButton = function () {
    if (counter % 2 === 0) {
        calculateButton.style.display = 'none';
        cancelButton.style.display = 'block';
    } else if (counter % 2 === 1) {
        calculateButton.style.display = 'block';
        cancelButton.style.display = 'none';
        getStartDisabled();            
    }
    counter++;
};
AppData.prototype.blockTextInputs = function () {
    [...document.querySelectorAll('section.main input[type="text"]')]
    .forEach( element => element.disabled = true );
    plusExpences.style.display = 'none';
    plusIncome.style.display = 'none';

};
AppData.prototype.getExpensesMonth = function () {    

    let expencesSum = 0;
  
    for ( let key in this.expences ) {        
        expencesSum += +this.expences[ key ];
    };
    this.expencesMonth = expencesSum;     
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = +this.budget + this.incomeMonth - +this.expencesMonth;
    this.budgetDay = Math.floor( this.budgetMonth / 30 );
};
AppData.prototype.getTargetMonth = function () {
    this.period = Math.ceil( targetAmount.value / this.budgetMonth );
};
AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.addExpencesBlock = function () {        
    let expencesItems = document.querySelectorAll('.expenses-items');
    if (expencesItems.length < 3) {
        let cloneExpencesItem = expencesItems[0].cloneNode(true);
        cloneExpencesItem.querySelectorAll('input')[0].value = '';
        cloneExpencesItem.querySelectorAll('input')[1].value = '';
        plusExpences.before(cloneExpencesItem);
        expencesItems = document.querySelectorAll('.expenses-items');

        
        expencesItems.forEach( element => {
            element.children[0].addEventListener( 'keypress', () => {validate( element.children[0] )} );
            element.children[1].addEventListener( 'keypress', () => {validate( element.children[1] )} );
        });
        if (expencesItems.length === 3) {
            plusExpences.style.display = 'none';
        };
    };
};
AppData.prototype.addIncomeBlock = function () {
    let incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length < 3) {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        
        cloneIncomeItem.querySelectorAll('input')[0].value = '';
        cloneIncomeItem.querySelectorAll('input')[1].value = '';
        plusIncome.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');

        incomeItems.forEach( element => {
            element.children[0].addEventListener( 'keypress', () => {validate( element.children[0] )} );
            element.children[1].addEventListener( 'keypress', () => {validate( element.children[1] )} );
        });

        if (incomeItems.length === 3) {
            plusIncome.style.display = 'none';
        }
    }
};
AppData.prototype.getExpences = function () {
    let _this = this;
    expencesItems.forEach( function (item) {
        let itemExpences = item.querySelector('.expenses-title').value;
        let cashExpences = item.querySelector('.expenses-amount').value;

        if (itemExpences !== '' && cashExpences !== '') {
            _this.expences[itemExpences] = cashExpences;
        }
    });
};
AppData.prototype.getIncome = function () {
    let _this = this;
    incomeItems.forEach( function (item) {
        let titleIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (titleIncome !== '' && cashIncome !== '') {
            _this.income[titleIncome] = cashIncome;
        };

        for (let key in _this.income) {
            _this.incomeMonth += +_this.income[key];
        };
    });

};
AppData.prototype.showResult = function () {
    periodSelect.addEventListener( 'input', () => {
        incomePeriodValue.value = this.calcSavedMoney();
    });
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expencesMonthValue.value = this.expencesMonth; 
    additionalExpensesValue.value = this.addExpenсes.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.period;
    incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.getAddExpences = function () {
    let _this = this;
    let addExpenсes = additionalExpensesItem.value.split(', ');
    addExpenсes.forEach( function (item) {
        item = item.trim();
        if ( item !== '' ) {
            _this.addExpenсes.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    let _this = this;
    additionalIncomeItem.forEach( function (item) {
        let itemValue = item.value.trim();
        if ( itemValue !== '' ) {
            _this.addIncome.push( itemValue );
        }
    });
};
AppData.prototype.changePeriodAmount = function () {
    let periodValue = +periodSelect.value;
    periodAmount.textContent = periodValue;
};
AppData.prototype.checkSalaryAmount = function () {
    let inputValue = salaryAmount.value;
    inputValue = inputValue.trim();
    if (inputValue === '') {
        calculateButton.disabled = true;
    } else {
        calculateButton.disabled = false;
    }
};
AppData.prototype.resetAppDataProp = function () {
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expences = {};
    this.addExpenсes = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expencesMonth = 0;
};

AppData.prototype.eventListeners = function () {
    let _this = this;
    calculateButton.addEventListener( 'click', _this.start.bind(appData) );
    cancelButton.addEventListener('click', _this.reset.bind(appData) );
    plusExpences.addEventListener( 'click', _this.addExpencesBlock );
    plusIncome.addEventListener( 'click', _this.addIncomeBlock );22
    periodSelect.addEventListener( 'input', _this.changePeriodAmount );
    salaryAmount.addEventListener( 'input', _this.checkSalaryAmount );
    
    
    salaryAmount.addEventListener( 'keypress', () => {validate( salaryAmount )} );
    additionalIncomeInput1.addEventListener( 'keypress', () => {validate( additionalIncomeInput1 )} );
    additionalIncomeInput2.addEventListener( 'keypress', () => {validate( additionalIncomeInput2 )} );
    targetAmount.addEventListener( 'keypress', () => {validate( targetAmount )} );
    incomeItems.forEach( element => {
            element.children[0].addEventListener( 'keypress', () => {validate( element.children[0] )} );
            element.children[1].addEventListener( 'keypress', () => {validate( element.children[1] )} );
    });
    expencesItems.forEach( element => {
            element.children[0].addEventListener( 'keypress', () => {validate( element.children[0] )} );
            element.children[1].addEventListener( 'keypress', () => {validate( element.children[1] )} );
    });
};

const getStartDisabled  = function() {
    calculateButton.disabled = true;
};
const textValidate = function ( element ) {
    setTimeout(function() {
        let result = /[^а-яА-Я.,:;/' ]/g.exec(element.value);
        element.value = element.value.replace(result, '');
      }, 0);
}
const numValidate = function ( element ) {
    setTimeout(function() {
        let result = /[^0-9]/g.exec(element.value);
        element.value = element.value.replace(result, '');
      }, 0);
}
const validate = function ( element ) {
    if (element.placeholder === 'Сумма') {
        numValidate(element);
    } else if (element.placeholder === 'Наименование') {
        textValidate(element);
    }
    
}
getStartDisabled();

const appData = new AppData();
appData.eventListeners();