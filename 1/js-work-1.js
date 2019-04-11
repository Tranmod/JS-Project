'use scrict';

let yourBudjet = prompt("Ваш бюдджет на месяц:", "");
let dateUser = prompt("Введите дату в формате YYYY-MM-DD:", "2019-04-10");
let obUser = prompt("Введите обязательную статью расходов в этом месяце?", "");
let obSum = prompt("Во сколько обойдется?", "")

let appData = {

	budjet : yourBudjet,
	timeData : dateUser,
	expenses : {
				obUser : obSum
	},
	optionalExpenses : {},
	income : [],
	savings : false

}

alert(appData.budjet / 30);



