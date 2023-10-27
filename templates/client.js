const resposta = document.querySelector("#resposta");
const certo = document.querySelector("#certo");

resposta.innerHTML = "...";

const btnLigar = document.getElementById('btnLigarMotor');
btnLigar.addEventListener('click', function (e) {
    console.log('Acionado botão para ligar motor');
    resposta.innerHTML = "O motor foi ligado";
    btnLigar.disabled = true;

    btnLigar.setAttribute('style', 'opacity: 0.3');
    certo.setAttribute('style', 'opacity: 1.0');

    setTimeout(() => {
        btnLigar.setAttribute('style', 'opacity: 0.3');
        certo.setAttribute('style', 'opacity: 0.5');
        btnLigar.disabled = false;
    }, 5000);

    fetch('/ligar_motor', { method: 'POST' })
        .then(function (response) {
            if (response.ok) {
                console.log("O motor foi ligado");
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
    resposta.innerHTML = "O motor foi desligado";
    btnDesligar.disabled = true;

    btnDesligar.setAttribute('style', 'opacity: 0.3');
    certo.setAttribute('style', 'opacity: 1.0');

    setTimeout(() => {
        btnDesligar.setAttribute('style', 'opacity: 1.0');
        certo.setAttribute('style', 'opacity: 0.5');
        btnDesligar.disabled = false;
    }, 5000);

    fetch('/desligar_motor', { method: 'POST' })
        .then(function (response) {
            if (response.ok) {
                console.log("O motor foi desligado");
                resposta.innerHTML = "O motor foi desligado";
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
});
