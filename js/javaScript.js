

const seccionLogin = document.getElementById('seccionLogin');
const seccionNewUser = document.getElementById('seccionNewUser');
const seccionNewReserve = document.getElementById('seccionNewReserve');
const seccionShowReserves = document.getElementById('seccionShowReserves');



//ESTO SON LOS BOTONES DE LOGIN, NEW USER, NEW RESERVE
const inputLoginUserEmail = document.getElementById('inputLoginUserEmail');
const inputLoginUserPassword = document.getElementById('inputLoginUserPassword');
 
const inputNewUserName = document.getElementById('inputNewUserName');
const inputNewUserEmail  = document.getElementById('inputNewUserEmail');
const inputNewUserPassword  = document.getElementById('inputNewUserPassword');
const selectNewUserType  = document.getElementById('selectNewUserType');
 
const inputNewReserveDate = document.getElementById('inputNewReserveDate');
const inputNewReserveTime = document.getElementById('inputNewReserveTime');
const selectNewReserveLaboratory = document.getElementById('selectNewReserveLaboratory');
const selectNewReserveType = document.getElementById('selectNewReserveType');
const textAreaNewReserveRazon = document.getElementById('textAreaNewReserveRazon');
 
 
const buttonLogin = document.getElementById('buttonLogin');
const buttonCreateNewUser = document.getElementById('buttonCreateNewUser');
const buttonCreateNewReserve = document.getElementById('buttonCreateNewReserve');



const seccionTemporal = document.getElementById('seccionTemporal');
const buttonTempLogin = document.getElementById('tempLogin');
const buttonTempNewUser = document.getElementById('tempNewUser');
const buttonTempNewReserve = document.getElementById('tempNewReserve');
const buttonTempShowReserves = document.getElementById('tempShowReserves');

let tempUser = "";
let tempUsers = [];
let tempReservas = []; //Variable que uso para mirar como se verian las resrvas



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

function interfaceTemp() {
    interfacesOff();
    seccionTemporal.style.display = 'flex';
}

function botonesTemp() {
    botonesVolver();
    buttonTempLogin.addEventListener('click', interfaceLogin);
    buttonTempNewUser.addEventListener('click', interfaceNewUser);
    buttonTempNewReserve.addEventListener('click', interfaceNewReserve);
    buttonTempShowReserves.addEventListener('click', interfaceShowReserves);

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
    for (let i = 0;i<3;i++){
        tempReservas.push(reserva);
    }
}

//COSAS QUE POSIBLEMENTE SI SIGAN    
function botones() {
    buttonLogin.addEventListener('click',templogin)
    buttonCreateNewUser.addEventListener('click',newUser);
    buttonCreateNewReserve.addEventListener('click',newReserve);

}

function interfacesOff() {
    seccionTemporal.style.display = 'none';
    seccionLogin.style.display = 'none';
    seccionNewUser.style.display = 'none';
    seccionNewReserve.style.display = 'none';
    seccionShowReserves.style.display = 'none';
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
        let button = document.createElement('button');
        button.type = 'button';
        button.disabled = true; // Hacer el botón no clickeable por el momento
        button.textContent = `Usuario: ${reserva.user.name}, Laboratorio: ${reserva.laboratory}, Fecha: ${reserva.date}, Hora Inicial: ${reserva.initialTime}, Hora Final: ${reserva.finalTime}, Tipo: ${reserva.type}, Razón: ${reserva.razon}`;
        divShowReservesReserves.appendChild(button);
    });
}




function main() {
    botonesTemp();
    reservasTemp();
    botones();
    interfaceTemp();
}

main();
