document.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {

            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }

    hideTabContent(1);

    function showTabContent(b) {

        if (tabContent[b].classList.contains('hide')) {

            tabContent[b].classList.remove('hide');
            tabContent[b].classList.remove('show');

        }

    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer

    let deadLine = '2019-08-05';

    function getTimeRamaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(udateClock, 1000);

        function udateClock() {
            let t = getTimeRamaining(endtime);
            if (t.hours < 10) {
                t.hours = '0' + t.hours;
            }
            hours.textContent = t.hours;
            if (t.minutes < 10) {
                t.minutes = '0' + t.minutes;
            }
            minutes.textContent = t.minutes;
            if (t.seconds < 10) {
                t.seconds = '0' + t.seconds;
            }
            seconds.textContent = t.seconds; 

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00'
                seconds.textContent = '00'; 
            }
        }
    }

    setClock('timer', deadLine);

    // Модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }

        newDiv() {
            let div = document.createElement('div');
            div.innerText = 'Создали блок';
            div.style.height = this.height;
            div.style.width = this.width;
            div.style.backgroundColor = this.bg;
            div.style.fontSize = this.fontSize;
            div.style.textAlign = this.textAlign;

            let bodyBlock = document.querySelector('body');
            bodyBlock.appendChild(div);
        }
    }

    let newDiv = new Options('300px', '300px', 'blue', '28px', 'center');

    let newDiv2 = new Options('400px', '100%', 'yellow', '32px', 'right');

    newDiv2.newDiv();

    newDiv.newDiv();

    // Forms

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо. Скоро свяжемся',
        failure: 'Что-то пошло не так!'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        
        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();

        request.open('POST', 'server.php');
        //request.setRequestHeader('Content-Type', 'application/x-ww-form-urlencoded');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        let formData = new FormData(form);

        let obj = {};

        formData.forEach(function(value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        //request.send(formData);
        request.send(json);

        request.addEventListener('readystatechange', function(event){
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
    });

});