'use strict';

let menu = document.querySelector('.menu');
let menuItem = document.querySelectorAll('.menu-item');
let column = document.querySelectorAll('.column');
let adv = document.querySelector('.adv');


menu.replaceChild(menuItem[2], menuItem[1]);
menu.insertBefore(menuItem[1], menuItem[3]);

let newLi = document.createElement('li');

newLi.classList.add('menu-item');
newLi.textContent = 'Пятый пункт';

menu.appendChild(newLi);

let title = document.querySelector('#title');
title.textContent = 'Мы продаем только подлинную технику Apple';

column[1].removeChild(adv);

document.body.style.backgroundImage = 'url("img/apple_true.jpg")';

let answer = prompt("Как Вы относитесь к технике Apple", '');

document.querySelector('#prompt').textContent = answer;