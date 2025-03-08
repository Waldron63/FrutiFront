const seccionTemporal = document.getElementById('seccionTemporal');
const seccionLogin = document.getElementById('seccionLogin');
const seccionNewUser = document.getElementById('seccionNewUser');
const seccionNewReserve = document.getElementById('seccionNewReserve');
const seccionShowReserves = document.getElementById('seccionShowReserves');

const buttonTempLogin = document.getElementById('tempLogin');
const buttonTempNewUser = document.getElementById('tempNewUser');
const buttonTempNewReserve = document.getElementById('tempNewReserve');
const buttonTempShowReserves = document.getElementById('tempShowReserves');


//ACA TODO ES TEMPORAL
function interfaceTemp(){
    interfacesOff();
    seccionTemporal.style.display = 'flex';
}

function botonesTemp(){
    botonesVolver();
    buttonTempLogin.addEventListener('click',interfaceLogin);
    buttonTempNewUser.addEventListener('click',interfaceNewReserve);
    buttonTempNewReserve.addEventListener('click',interfaceNewReserve);
    buttonTempShowReserves.addEventListener('click',interfaceShowReserves);

}

function botonesVolver() {
    document.addEventListener("DOMContentLoaded", function() {
        var buttons = document.querySelectorAll(".volverTemp");
        buttons.forEach(function(button) {
            button.addEventListener('click',interfaceTemp);
        });
    });
}












//COSAS QUE POSIBLEMENTE SI SIGAN
function interfacesOff(){
    seccionTemporal.style.display = 'none';
    seccionLogin.style.display = 'none';
    seccionNewUser.style.display = 'none';
    seccionNewReserve.style.display = 'none';
    seccionShowReserves.style.display = 'none';
}

function interfaceLogin(){
    interfacesOff();
    seccionLogin.style.display = 'flex';
}

function interfaceNewUser(){
    interfacesOff();
    seccionNewUser.style.display = 'flex';
}

function interfaceNewReserve(){
    interfacesOff();
    seccionNewReserve.style.display = 'flex';
}

function interfaceShowReserves(){
    interfacesOff();
    seccionShowReserves.style.display = 'flex';
}




function main(){
    botonesTemp();
    
    interfacesOff();
    interfaceTemp();
    //interfaceShowReserves();
}

main();