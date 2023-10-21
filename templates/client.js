console.log('Client-side code running');

const btnLigar = document.getElementById('btnLigarMotor');
btnLigar.addEventListener('click', function (e) {
    console.log('Acionado botão para ligar motor');

    fetch('/ligar_motor', { method: 'POST' })
        .then(function (response) {
            if (response.ok) {
                console.log('Click was recorded');
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
});


const btnDesligar = document.getElementById('btnDesligarMotor');
btnDesligar.addEventListener('click', function (e) {
    console.log('Acionado botão para desligar motor');

    fetch('/desligar_motor', { method: 'POST' })
        .then(function (response) {
            if (response.ok) {
                console.log('Click was recorded');
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
});