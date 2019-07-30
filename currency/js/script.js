
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');
    

function calcData() {
    return new Promise(function(resolve,reject) {
        let request = new XMLHttpRequest();

        request.open('GET', './js/current.json');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send();

        request.addEventListener('readystatechange', function() {
            
            if (request.status == 200) {
                resolve(JSON.parse(request.response));
            } else {
                reject();
            } 
        });
    }) 
} 

inputRub.addEventListener('input', () => {
   
    calcData(inputRub.value)
            .then((data) => {
                    inputUsd.value = inputRub.value / data.usd;
            })
            .catch(() => inputUsd.value = "Что-то пошло не так!")

});