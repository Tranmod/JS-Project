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
    
    function postData(data) {
        return new Promise(function(resolve,reject) {
            let request = new XMLHttpRequest();

            request.open('POST', 'server.php');

            //request.setRequestHeader('Content-Type', 'application/x-ww-form-urlencoded');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            let formData = new FormData(data);

            let obj = {};

            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            //request.send(formData);
            request.send(json);

            request.addEventListener('readystatechange', function(event){
                if (request.readyState < 4) {
                    resolve();
                } else if (request.readyState === 4) {
                    if (request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            });

        })
    }

    function clearInput() {
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }
    
    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);
        postData(form)
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => statusMessage.innerHTML = message.success)
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(clearInput)

    });

    
    // Slider
    

    let sliderIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {

        if (n > slides.length) {
            sliderIndex = 1;
        }
        if (n < 1) {
            sliderIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[sliderIndex - 1].style.display = 'block';
        dots[sliderIndex - 1].classList.add('dot-active');

    }

    showSlides(sliderIndex);

    function plusSlides(n) {
        showSlides(sliderIndex += n);
    }

    function currentSlide(n) {
        showSlides(sliderIndex = n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });


    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = '0';

        persons.addEventListener('change', function() {
            personSum = +this.value;
            total = (daysSum + personSum) * 4000;

            if (restDays.value == '' || this.value == '') {
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personSum) * 4000;

            if (persons.value == '' || this.value == '') {
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });

});