'use strict';

let startButton = document.querySelector("#start");

//Получаем div'ы с данными
let budgetValue = document.querySelector('.budget-value');
let daybudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optionalexpensesValue = document.querySelector('.optionalexpenses-value');
let incomeValue = document.querySelector('.income-value');
let monthsavingsValue = document.querySelector('.monthsavings-value');
let yearsavingsValue = document.querySelector('.yearsavings-value');

let expensesItem = document.querySelectorAll('.expenses-item');

let btns = document.querySelectorAll('button');
let expensesBtn = btns[0];
let optionalexpensesBtn = btns[1];
let inputAll = document.querySelectorAll('input');