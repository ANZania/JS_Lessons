'use strict'

const calculateButton = document.getElementById('start');
const cancelButton = document.getElementById('cancel');
const plusIncome = document.querySelectorAll('button')[0];
const plusExpenses = document.querySelectorAll('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalIncomeInput1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeInput2 = document.querySelectorAll('.additional_income-item')[1];
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

// Results
const budgetMonthValue = document.querySelectorAll('.budget_month-value')[0];
const budgetDayValue = document.querySelectorAll('.budget_day-value')[0];
const expensesMonthValue = document.querySelectorAll('.expenses_month-value')[0];
const additionalIncomeValue = document.querySelectorAll('.additional_income-value')[0];
const additionalExpensesValue = document.querySelectorAll('.additional_expenses-value')[0];
const incomePeriodValue = document.querySelectorAll('.income_period-value')[0];
const targetMonthValue = document.querySelectorAll('.target_month-value')[0];

// Inputs
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelectorAll('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

let counter = 0;

class AppData {
    constructor () {
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenсes = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    };

    start() {
        this.budget = salaryAmount.value;
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.getTargetMonth();
        this.getAddItem();
        this.showResult();
    
        this.blockTextInputs();
        this.toggleButton();
        
    };
    reset() {
        [...document.querySelectorAll('section.main input[type="text"]')]
        .forEach( element => element.value = '' );
        [...document.querySelectorAll('section.main input[type="text"]')]
        .forEach( element => element.disabled = false );
        depositCheck.disabled = false;
        depositBank.disabled = false;
    
        plusExpenses.style.display = 'block';
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

        depositCheck.checked = false;
        this.depositHandler();
        
        this.resetAppDataProp();
        this.toggleButton();
    };
    toggleButton() {
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
    blockTextInputs() {
        [...document.querySelectorAll('section.main input[type="text"]')]
        .forEach( element => element.disabled = true );
        plusExpenses.style.display = 'none';
        plusIncome.style.display = 'none';

        depositCheck.disabled = true;
        depositBank.disabled = true;
    
    };
    getExpensesMonth() {    
    
        let expensesSum = 0;
      
        for ( let key in this.expenses ) {        
            expensesSum += +this.expenses[ key ];
        };
        this.expensesMonth = expensesSum;     
    };
    getBudget() {
        const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
        this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor( this.budgetMonth / 30 );
    };
    getTargetMonth() {
        this.period = Math.ceil( targetAmount.value / this.budgetMonth );
    };
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    };
    addNewBlock(item) {
        const _this = this;
        const startStr = item.className.split(' ')[1].split('_')[0];
        let items = document.querySelectorAll(`.${startStr}-items`);

        if (items.length < 3) {
            let clone = items[0].cloneNode(true);

            clone.querySelectorAll('input')[0].value = '';
            clone.querySelectorAll('input')[1].value = '';
            item.before(clone);
            items = document.querySelectorAll(`.${startStr}-items`);

            items.forEach( element => {
                element.children[0].addEventListener( 'keypress', () => {validate( element.children[0] )} );
                element.children[1].addEventListener( 'keypress', () => {validate( element.children[1] )} );
            });

            if (items.length === 3) {
                item.style.display = 'none';
            }
        }
        if (startStr === 'expenses') {
            expensesItems = items;
        } else {
            incomeItems = items;
        }
    };
    getExpInc() {
        
        const _this = this;
        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                _this[startStr][itemTitle] = itemAmount;
            };
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in _this.income) {
            _this.incomeMonth += +_this.income[key];
        };
    };
    showResult() {
        periodSelect.addEventListener( 'input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth; 
        additionalExpensesValue.value = this.addExpenсes.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.period;
        incomePeriodValue.value = this.calcSavedMoney();
    };
    getAddItem() {
        let _this = this;

        const getItem = (element) => {
            const startStr = element[0].className.split('_')[1].split('-')[0];
            let prop;
            if (startStr === 'expenses') {
                prop = 'addExpenсes';
                for (let i = 0; i < element.length; i++) {
                    let itemValue = element[i].value.split(', ');
                    console.log(itemValue);
    
                    itemValue.forEach( function (item) {
                        item = item.trim();
                        if ( item !== '' ) {
                            _this[prop].push(item);
                        }
                    });
                }
            } else {
                console.log(element);
                prop = 'addIncome';
                element.forEach ( (item, index) => {
                    let itemValue = item.value;
                    console.log(itemValue);

                    itemValue = itemValue.trim();
                    if ( itemValue !== '' ) {
                        _this.addIncome.push(itemValue);
                    }
                })
            }
            
        }
        getItem(additionalIncomeItem);
        getItem(additionalExpensesItem);
    }
    changePeriodAmount() {
        let periodValue = +periodSelect.value;
        periodAmount.textContent = periodValue;
    };
    checkSalaryAmount() {
        let inputValue = salaryAmount.value;
        inputValue = inputValue.trim();
        if (inputValue === '') {
            calculateButton.disabled = true;
        } else {
            calculateButton.disabled = false;
        }
    };
    resetAppDataProp() {
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenсes = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    };
    
    eventListeners() {
        let _this = this;
        calculateButton.addEventListener( 'click', _this.start.bind(this) );
        cancelButton.addEventListener('click', _this.reset.bind(this) );
        plusExpenses.addEventListener( 'click', () => {_this.addNewBlock(plusExpenses)} );
        plusIncome.addEventListener( 'click', () => {_this.addNewBlock(plusIncome)} );
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
        expensesItems.forEach( element => {
                element.children[0].addEventListener( 'keypress', () => {validate( element.children[0] )} );
                element.children[1].addEventListener( 'keypress', () => {validate( element.children[1] )} );
        });
        depositAmount.addEventListener('keypress', () => {validate( depositAmount )});

        depositCheck.addEventListener('change', this.depositHandler.bind(this))
    };

    getInfoDeposit(){
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }

    };

    changePercent(){
        const _this = this;
        const valueSelect = this.value;
        depositAmount.disabled = false;

        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', () => {
                if (depositPercent.value < 0 || depositPercent.value > 100 || !isNumber(depositPercent.value)) {
                    alert ('Введите корректное значение процента депозита!');
                    depositPercent.value = '';            
                };
            });
            
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
            depositPercent.removeEventListener('input', () => {
                if (depositPercent.value < 0 || depositPercent.value > 100) {
                    alert ('Введите корректное значение процента депозита!');
                    depositPercent.value = '';            
                };
            });
        }

    }

    depositHandler(){
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';

            this.deposit = true;

            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            
            depositBank.value = '';
            depositAmount.value = '';

            this.deposit = false;

            depositBank.removeEventListener('change', this.changePercent);
        }
    }
};

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const getStartDisabled  = () => {
    calculateButton.disabled = true;
};
const getDepositAmountDisabled = () => {
    depositAmount.disabled = true;
}
const textValidate = ( element ) => {
    setTimeout(function() {
        let result = /[^а-яА-Я.,:;/' ]/g.exec(element.value);
        element.value = element.value.replace(result, '');
      }, 0);
}
const numValidate = ( element ) => {
    setTimeout(function() {
        let result = /[^0-9]/g.exec(element.value);
        element.value = element.value.replace(result, '');
      }, 0);
}
const validate = ( element ) => {
    if (element.placeholder === 'Сумма') {
        numValidate(element);
    } else if (element.placeholder === 'Наименование') {
        textValidate(element);
    }
    
}
getStartDisabled();
getDepositAmountDisabled();

const appData = new AppData();
appData.eventListeners();