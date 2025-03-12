//ESTO SON LOS BOTONES DE LOGIN, NEW USER, NEW RESERVE

const inputNewReserveDate = document.getElementById('inputNewReserveDate');
const inputNewReserveTime = document.getElementById('inputNewReserveTime'); 


 

const selectNewReserveLaboratory = document.getElementById('selectNewReserveLaboratory');
const selectNewReserveType = document.getElementById('selectNewReserveType');
const textAreaNewReserveRazon = document.getElementById('textAreaNewReserveRazon');
 

const seccionTemporal = document.getElementById('seccionTemporal');
const buttonTempLogin = document.getElementById('tempLogin');
const buttonTempNewUser = document.getElementById('tempNewUser');
const buttonTempNewReserve = document.getElementById('tempNewReserve');
const buttonTempShowReserves = document.getElementById('tempShowReserves');
const buttonTempShowLaboratory = document.getElementById('tempShowLaboratory');



const buttonCreateNewReserve = document.getElementById('buttonCreateNewReserve');


const seccionLogin = document.getElementById('seccionLogin');
const inputLoginUserEmail = document.getElementById('inputLoginUserEmail');
const inputLoginUserPassword = document.getElementById('inputLoginUserPassword');
const buttonLogin = document.getElementById('buttonLogin');
const buttonLoginNewUser = document.getElementById('buttonLoginNewUser');


const seccionNewUser = document.getElementById('seccionNewUser');
const inputNewUserName = document.getElementById('inputNewUserName');
const inputNewUserEmail  = document.getElementById('inputNewUserEmail');
const inputNewUserPassword  = document.getElementById('inputNewUserPassword');
const selectNewUserType  = document.getElementById('selectNewUserType');
const buttonCreateNewUser = document.getElementById('buttonCreateNewUser');
const buttonNewUserLogin = document.getElementById('buttonNewUserLogin');


const seccionShowReserves = document.getElementById('seccionShowReserves');
const buttonShowReservesReservar = document.getElementById('buttonShowReservesReservar');


const seccionNewReserve = document.getElementById('seccionNewReserve');
const buttonNewReserveShowReserves = document.getElementById('buttonNewReserveShowReserves')


const seccionShowLaboratory = document.getElementById('seccionShowLaboratory');


let tempUser = "";
let tempUsers = [];
let tempReservas = [];
let tempLaboratoryos = [];



//ACA TODO ES TEMPORAL
class User {
    constructor(name, email, type, password) {
        this.name = name;
        this.email = email;
        this.type = type;
        this.password = password;

    }
}

class Reserve {
    constructor(user, laboratory, type, razon, date, initialTime) {
        this.user = user;
        this.laboratory = laboratory;
        this.type = type;
        this.razon = razon;
        this.date = date;
        this.initialTime = initialTime;
        this.finalTime = initialTime;
    }
}

class laboratory{

}

function interfaceTemp() {
    interfacesOff();
    seccionTemporal.style.display = 'flex';
}

function botonesTemp() {
    botonesVolver();
    buttonTempLogin.addEventListener('click', interfaceLogin);
    buttonTempNewReserve.addEventListener('click', interfaceNewReserve);
    buttonTempShowReserves.addEventListener('click', interfaceShowReserves);
    buttonTempShowLaboratory.addEventListener('click',interfaceShowLaboratory);
    buttonTempNewUser.addEventListener('click',interfaceNewUser)
}


function botonesVolver() {
    document.addEventListener("DOMContentLoaded", function () {
        var buttons = document.querySelectorAll(".volverTemp");
        buttons.forEach(function (button) {
            button.addEventListener('click', interfaceTemp);
        });
    });
}

function reservasTemp (){
    tempUser = new User("USUARIO PRUEBA", "m@mail.com", "ADM", "ASDAS");
    reserva = new Reserve(tempUser,"LaboratorioPrueba","Clase","Prueba","25-02-2025","10:30");
    for (let i = 0;i<10;i++){
        tempReservas.push(reserva);
    }
}

//COSAS QUE POSIBLEMENTE SI SIGAN    
function botones() {
    buttonLogin.addEventListener('click',templogin)
    buttonLoginNewUser.addEventListener('click',interfaceNewUser)


    buttonCreateNewUser.addEventListener('click',newUser);
    buttonNewUserLogin.addEventListener('click',interfaceLogin);


    buttonCreateNewReserve.addEventListener('click',newReserve);
    buttonNewReserveShowReserves.addEventListener('click',interfaceShowReserves);

    buttonShowReservesReservar.addEventListener('click',interfaceNewReserve);
}

function interfacesOff() {
    seccionTemporal.style.display = 'none';
    seccionLogin.style.display = 'none';
    seccionNewUser.style.display = 'none';
    seccionNewReserve.style.display = 'none';
    seccionShowReserves.style.display = 'none';
    seccionShowLaboratory.style.display = 'none';
}

function interfaceLogin() {
    interfacesOff();
    seccionLogin.style.display = 'flex';
}

function templogin(){
    tempUser = new User(inputLoginUserEmail.value,inputLoginUserPassword.value);
    inputLoginUserEmail.value = "";
    inputLoginUserPassword.value = "";
    console.log(tempUser);
    alert("Ingreso correcto")
}

function interfaceNewUser() {
    interfacesOff();
    seccionNewUser.style.display = 'flex';
}

function newUser() {
    let name = inputNewUserName.value;
    let email = inputNewUserEmail.value;
    let password = inputNewUserPassword.value;
    let type = selectNewUserType.value;

    let user = new User(name, email, password, type);
    alert(`Usuario creado con éxito:\nNombre: ${name}\nEmail: ${email}\nTipo: ${type}`);
    console.log(tempUsers);

    inputNewUserName.value = "";
    inputNewUserEmail.value = "";
    inputNewUserPassword.value = "";
    selectNewUserType.value = "";

}

function interfaceNewReserve() {
    interfacesOff();
    seccionNewReserve.style.display = 'flex';
}

function newReserve(){
    let laboratorio = selectNewReserveLaboratory.value;
    let tipo = selectNewReserveType.value;
    let razon = textAreaNewReserveRazon.value;
    let fecha = inputNewReserveDate.value;
    let hora = inputNewReserveTime.value;
    
    let reserva = new Reserve(tempUser,laboratorio,tipo,razon,fecha,hora)
    tempReservas.push(reserva);
    alert('Reserva Ingresada');
    console.log(tempReservas);
    
}

function interfaceShowReserves() {
    interfacesOff();
    mostrarReservas()
    seccionShowReserves.style.display = 'flex';
}

function mostrarReservas() {
    let divShowReservesReserves = document.getElementById('divShowReservesReserves');
    divShowReservesReserves.innerHTML = ''; 

    tempReservas.forEach(reserva => {
        let reservaCard = document.createElement('button');
        reservaCard.classList.add('reservaCard');
        reservaCard.innerHTML = `
            <strong>Usuario:</strong> ${reserva.user.name} <br>
            <strong>Laboratorio:</strong> ${reserva.laboratory} <br>
            <strong>Fecha:</strong> ${reserva.date} <br>
            <strong>Hora:</strong> ${reserva.initialTime} - ${reserva.finalTime} <br>
            <strong>Tipo:</strong> ${reserva.type} <br>
            <strong>Razón:</strong> ${reserva.razon}
        `;
        divShowReservesReserves.appendChild(reservaCard);
    });
}

function interfaceShowLaboratory(){
    interfacesOff();
    seccionShowLaboratory.style.display = 'flex';
}




function main() {
    botonesTemp();
    reservasTemp();
    botones();
    //interfaceTemp();
    
    //INTERFACES CHECK
    //interfaceLogin();
    //interfaceNewUser();
    //interfaceShowReserves();
    interfaceNewReserve();
}

main();
