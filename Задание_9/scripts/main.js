'use strict'

const calculateButton = document.getElementById('start');
const plusButton1 = document.getElementsByTagName('button')[0];
const plusButton2 = document.getElementsByTagName('button')[1];
const depositCheckButton = document.querySelector('#deposit-check');
const additionalIncomeInput1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeInput2 = document.querySelectorAll('.additional_income-item')[1];

// Results
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expencesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

// Inputs
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
