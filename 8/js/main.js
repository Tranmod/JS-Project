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
let optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item');

let btns = document.querySelectorAll('button');
let inputAll = document.querySelectorAll('input');
let chooseIncome = document.querySelector('.choose-income');
let checkSavings = document.querySelector('#savings');
let chooseSum = document.querySelector('.choose-sum');
let choosePercent = document.querySelector('.choose-percent');

//Кнопки
let expensesItemBtn = document.querySelector('.expenses-item-btn');
let optionalexpensesBtn = document.querySelector('.optionalexpenses-btn');
let countBudgetBtn = document.querySelector('.count-budget-btn');

//Даты
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

for (let i = 0; i < btns.length; i++) {

    if (btns[i].className != 'start'){
        btns[i].setAttribute('disabled', 'disabled');
    }

}


let money, time;

startButton.addEventListener('click', function(){
    time = prompt('Введите дату в формате YYYY-MM-DD', ''),
    money = +prompt('Ваш бюджет на месяц?', '');

    for (let i = 0; i < btns.length; i++) {

        if (btns[i].className != 'start'){
            btns[i].removeAttribute('disabled');
        }
    
    }

    while (isNaN(money) || money == '' || money == null) {
        money = prompt('Ваш бюджет?', '');
        
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

            if((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) === 'string' && (typeof(b)) != null
            && a != '' && b != '' && a.length < 50){
                console.log("done");
                appData.expenses[a] = b;
                sum += +b; 
    
            }else{
                i = i - 1; //Так как ответы на вопросы не введены, мы уменьшаем счетчик на 1 итерацию.
            }
    }

    expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function(){
    for (let i = 0; i < optionalexpensesItem.length; i++) {
        let opt = optionalexpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function(){
    if(appData.budget != undefined) {
       
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay < 100){
            levelValue.textContent = 'Минимальный уровень достатка';
        
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            levelValue.textContent = 'Средний уровень достатка';
        
        } else if (appData.moneyPerDay > 2000){
            levelValue.textContent = 'Высокий уровень достатка';
        
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }
   
   
});

chooseIncome.addEventListener('input', function(){
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;

});

checkSavings.addEventListener('click', function(){
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);


    }
});

choosePercent.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {

	budget : money,
	timeData : time,
	expenses : {},
	optionalExpenses : {},
	income : [],
    savings : false
}