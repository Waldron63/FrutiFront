//============VARIABLES GLOBALES
//LOGIN
const seccionLogin = document.getElementById('seccionLogin');
const inputLoginEmail = document.getElementById('inputLoginEmail');
const inputLoginPassword = document.getElementById('inputLoginPassword');
const buttonLoginLogin = document.getElementById('buttonLoginLogin');
const buttonLoginNewUser = document.getElementById('buttonLoginNewUser');

//NEW USER
const seccionNewUser = document.getElementById('seccionNewUser');
const inputNewUserUser = document.getElementById('inputNewUserUser');
const inputNewUserID = document.getElementById('inputNewUserID');
const inputNewUserEmail = document.getElementById('inputNewUserEmail');
const inputNewUserPassword = document.getElementById('inputNewUserPassword');
const selectNewUserType = document.getElementById('selectNewUserType');
const buttonNewUserLogin = document.getElementById('buttonNewUserLogin');
const buttonNewUserNewUser = document.getElementById('buttonNewUserNewUser');

//EDIT USER
const seccionEditUser = document.getElementById('seccionEditUser');
const inputEditUserUser = document.getElementById('inputEditUserUser');
const inputEditUserEmail = document.getElementById('inputEditUserEmail');
const inputEditUserPassword = document.getElementById('inputEditUserPassword');
const buttonEditUserVolver = document.getElementById('buttonEditUserVolver');
const buttonEditUserGuardar = document.getElementById('buttonEditUserGuardar');

//NEW RESERVE
const seccionNewReserve = document.getElementById('seccionNewReserve');
const selectNewReserveLaboratory = document.getElementById('selectNewReserveLaboratory');
const selectNewReserveType = document.getElementById('selectNewReserveType');
const textAreaNewReserveRazon = document.getElementById('textAreaNewReserveRazon');
const inputNewReserveDate = document.getElementById('inputNewReserveDate');
const inputNewReserveStartTime = document.getElementById('inputNewReserveStartTime');
const inputNewReserveEndTime = document.getElementById('inputNewReserveEndTime');
const buttonNewReserveVolver = document.getElementById('buttonNewReserveVolver');
const buttonNewReserveNewReserve = document.getElementById('buttonNewReserveNewReserve');


//SHOW RESERVES
const seccionShowReserves = document.getElementById('seccionShowReserves');
const divShowReservesReserves = document.getElementById('divShowReservesReserves');
const buttonShowReservesVolver = document.getElementById('buttonShowReservesVolver');
const buttonShowReservesNewReserve = document.getElementById('buttonShowReservesNewReserve');

//SHOW USERS
const seccionShowUsers = document.getElementById('seccionShowUsers');
const divShowUsersUsers = document.getElementById('divShowUsersUsers');
const buttonShowUsersVolver = document.getElementById('buttonShowUsersVolver');
const buttonShowUsersNewUser = document.getElementById('buttonShowUsersNewUser');


//SHOW RESOURCES
const seccionShowResources = document.getElementById('seccionShowResources');
const divShowResourcesPhysical = document.getElementById('divShowResourcesPhysical');
const divShowResourcesDigital = document.getElementById('divShowResourcesDigital');
const buttonShowResourcesVolver = document.getElementById('buttonShowResourcesVolver');
const buttonShowResourcesNewResource = document.getElementById('buttonShowResourcesNewResource');

//SHOW LABORATORIES
const seccionShowLaboratories = document.getElementById('seccionShowLaboratories');


//MENU
const seccionMenu = document.getElementById('seccionMenu');


//VARIABLES GENERALES
let secciones = document.querySelectorAll('.seccion');



//VARIABLES TEMPORALES
let userLogin;
let isLogin = false;


//AGRUPAN COSAS
let laboratories; //Este es para listar laboratorios
let reserves; //Este es para listar las reservas del usuario

//============CLASES
class User {
    constructor(userName, id, email, password, type) {
        this.userName = userName;
        this.id = id;
        this.email = email;
        this.password = password;
        this.type = type;
    }
}

class Reserve {
    constructor(laboratory, type, day, startTime, endTime) {
        this.laboratory = laboratory; 
        this.type = type; 
        this.day = day; 
        this.startTime = startTime; 
        this.endTime = endTime;
    }
}

class Laboratory {
    constructor(name, abbreviation, totalCapacity, location, photoURL) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.totalCapacity = totalCapacity;
        this.location = location;
        this.photoURL = photoURL;
    }
}

class ResourcePhysical {
    constructor(object, quantity) {
        this.object = object; 
        this.quantity = quantity;
    }
}

class ResourceDigital {
    constructor(name, version) {
        this.name = name;
        this.version = version;
    }
}

//============FUNCIONES
//======INTERFACES
function interfacesOff(){
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
}

function interfaceLogin(){
    interfacesOff();
    seccionLogin.style.display = 'flex';
}

function interfaceNewUser(){
    interfacesOff();
    addUserTypes();
    seccionNewUser.style.display = 'flex';
}

function interfaceEditUser(){
    interfacesOff();
    seccionEditUser.style.display = 'flex';
}

function interfaceNewReserve(){
    interfacesOff();
    addLaboratoriesNewReserve();
    addReserveTypeNewReserve();
    seccionNewReserve.style.display = 'flex';
}

function interfaceShowReserves(){
    interfacesOff();
    showReserves();
    seccionShowReserves.style.display = 'flex';
}

function interfaceShowUsers(){
    interfacesOff();
    showUsers();
    seccionShowUsers.style.display = 'flex';
}

function interfaceShowResources(){
    interfacesOff();
    showResources();
    seccionShowResources.style.display = 'flex';
}

function interfaceShowLaboratories(){
    interfacesOff();
    seccionShowLaboratories.style.display = 'flex';
}

function interfaceMenu(){
    interfacesOff();
    seccionMenu.style.display = 'flex';
}

//======BOTONES
function botonesEvents(){
    //LOGIN
    buttonLoginNewUser.addEventListener('click',interfaceNewUser);
    buttonLoginLogin.addEventListener('click',login);

    //NEW USER
    buttonNewUserLogin.addEventListener('click',interfaceLogin);
    buttonNewUserNewUser.addEventListener('click',newUser);

    //EDIT
    buttonEditUserVolver.addEventListener('click',interfaceMenu);
    buttonEditUserGuardar.addEventListener('click',edit);

    //SHOW USERS
    buttonShowUsersVolver.addEventListener('click',interfaceMenu);
    buttonShowUsersNewUser.addEventListener('click',interfaceNewUser);

    //SHOW RESERVES
    buttonShowReservesVolver.addEventListener('click',interfaceMenu);
    buttonShowReservesNewReserve.addEventListener('click',interfaceNewReserve);

    //NEW RESERVE
    //buttonNewReserveVolver.addEventListener('click',); //ARREGLAR
    buttonNewReserveNewReserve.addEventListener('click',newReserve);

    //SHOW RESOURCES
    //buttonShowResourcesVolver.addEventListener('click',alert("ARREGLAR"));
    //buttonShowResourcesNewResource.addEventListener('click',alert("ARREGLAR"));
}

//======ACCIONES
function inputEventos(){
    //NEW USER
    inputNewUserID.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });
    
    //NEW RESERVE
    let today = new Date().toISOString().split("T")[0];
    inputNewReserveDate.setAttribute("min", today);

    inputNewReserveEndTime.setAttribute("readonly", true);
    inputNewReserveStartTime.addEventListener("input",horaFinal);
    

}

function horaFinal() {
    if (inputNewReserveStartTime.value) {
        let [hours, minutes] = inputNewReserveStartTime.value.split(":");
        let endHours = parseInt(hours);
        let endMinutes = parseInt(minutes) + 30;

        if (endMinutes >= 60) {
            endHours += 1;
            endMinutes -= 60;
        }

        endHours += 1;

        if (endHours >= 24) {
            endHours -= 24;
        }

        inputNewReserveEndTime.value = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
    } else {
        inputNewReserveEndTime.value = "";
    }
}

//======METODOS
//LOGIN
function login(){
    alert("Login");
}

//NEW USER
function newUser(){
    alert("newUser");
}

//EDIT
function edit(){
    alert("Editado");
}

//NEWUSER
function addUserTypes(){
    selectNewUserType.innerHTML ="";
    let userTypes = [
        { value: "none", text: ""},
        { value: "profesor", text: "Profesor" },
        { value: "administrador", text: "Administrador"}
    ];
    

    userTypes.forEach(type => {
        let option = document.createElement("option");
        option.value = type.value;  
        option.textContent = type.text;  
        selectNewUserType.appendChild(option);  
    });
}

//SHOW USERS
function showUsers(){
    divShowUsersUsers.innerHTML = "";

    let tempUsersArray = tempAddUsers();
    tempUsersArray.forEach(usuario => {
        let userCard = document.createElement('button');
        userCard.classList.add('showCards');
        userCard.innerHTML = `
            <strong>Usuario: </strong>${usuario.userName} <br>
            <strong>ID: </strong>${usuario.id} <br>
            <strong>Email: </strong>${usuario.email} <br>
            <strong>Rol: </strong>${usuario.type} <br>
        `;
        
        divShowUsersUsers.appendChild(userCard);
    });
}

//NEW RESERVE
function newReserve(){
    alert("Reserva Creada");
}

function addLaboratoriesNewReserve() {
    selectNewReserveLaboratory.innerHTML = "";

    
    let option = document.createElement("option");
    option.value = "none";
    option.text = "";
    selectNewReserveLaboratory.appendChild(option);

    
    laboratories.forEach(laboratory => {
        option = document.createElement("option");
        option.value = laboratory.name;
        option.textContent = laboratory.name;
        selectNewReserveLaboratory.appendChild(option);
    });
}

function addReserveTypeNewReserve() {
    selectNewReserveType.innerHTML = "";
    let reserveTypes = [
        { value: "none", text: "" },
        { value: "clase", text: "Clase" },
        { value: "reserva", text: "Reserva" }
    ];

    reserveTypes.forEach(type => {
        let option = document.createElement("option");
        option.value = type.value;
        option.textContent = type.text;
        selectNewReserveType.appendChild(option);
    });
}

//SHOW RESERVES
function showReserves(){
    divShowReservesReserves.innerHTML = "";

    tempReservesArray.forEach(reserva => {
        let reserveCard = document.createElement('button');
        reserveCard.classList.add('showCards');
        reserveCard.innerHTML = `
            <strong>Laboratorio:</strong>${reserva.laboratory} <br>
            <strong>Tipo:</strong> ${reserva.type}<br>
            <strong>Día:</strong> ${reserva.day}<br>
            <strong>Hora:</strong> ${reserva.startTime} - ${reserva.endTime}<br>
        `;

        divShowReservesReserves.appendChild(reserveCard);
    });

}

//SHOW RESOURCES
function showResources(){
    showResourcesPhysical();
    showResourcesDigital();
}

function showResourcesPhysical() {
    divShowResourcesPhysical.innerHTML = "";
    let tempPhysicalArray = tempAddPhysical();

    tempPhysicalArray.forEach(recurso => {
        let resourceCard = document.createElement('button');
        resourceCard.classList.add('showCards');
        resourceCard.innerHTML = `
            <strong>Objeto:</strong> ${recurso.object} <br>
            <strong>Cantidad:</strong> ${recurso.quantity} <br>
        `;

        divShowResourcesPhysical.appendChild(resourceCard);
    });
}

function showResourcesDigital() {
    divShowResourcesDigital.innerHTML = "";

    laboratories.forEach(recurso => {
        let resourceCard = document.createElement('button');
        resourceCard.classList.add('showCards');
        resourceCard.innerHTML = `
            <strong>Nombre:</strong> ${recurso.name} <br>
            <strong>Versión:</strong> ${recurso.version} <br>
        `;

        divShowResourcesDigital.appendChild(resourceCard);
    });
}

//MAIN
function main(){
    laboratories = tempAddLaboratories();
    reserves = tempAddReserves();

    interfacesOff();
    botonesEvents();
    inputEventos();
}

main();
//interfaceLogin();
//interfaceNewUser();
//interfaceEditUser();
//interfaceMenu(); //FALTA TERMINARLA

//FALTA AJUSTAR VISUAL
//interfaceShowUsers();
//interfaceShowReserves();
//interfaceShowResources();

interfaceNewReserve();


//document.addEventListener("DOMContentLoaded", main);


//======TEMPORALES
function tempAddUsers() {
    let users = [];
    for (let i = 0; i < 10; i++) {
        let randomNumber = rando(1,99999)
        users.push(new User(
            `Usuario${i}`,           
            randomNumber,
            `correo${randomNumber}@email.com`, 
            "Contrasena",
            "Profesor"
        ));
    }
    return users;
}

function tempAddLaboratories() {
    let laboratories = [];
    for (let i = 0; i < 10; i++) {
        laboratories.push(new Laboratory(
            `Laboratorio ${i}`,
            `LAB${i}`,
            Math.floor(Math.random() * 50) + 10, 
            `Edificio ${String.fromCharCode(65 + i)} - Piso ${i % 3 + 1}`,
            "../img/Laboratorio.jpg" // Foto
        ));
    }
    return laboratories;
}

function tempAddReserves() {
    let reserves = [];

    for (let i = 0; i < 10; i++) {
        let lab = "LAB-PRUEBA"
        let type = "PRUEBA"
        let day = "25-02-2003"
        let startHour = "10:00AM"
        let endHour = "11:30AM"

        reserves.push(new Reserve(
            lab, 
            type, 
            day, 
            startHour,
            endHour
        ));
    }
    return reserves;
}

function tempAddPhysical() {
    let physicalResources = [];

    for (let i = 0; i < 10; i++) {
        let randomNumber = rando(1,99999)
        let object = `Objeto ${i + 1}`;
        let quantity = randomNumber;

        physicalResources.push(new ResourcePhysical(object, quantity));
    }

    return physicalResources;
}

function tempAddDigital() {
    let digitalResources = [];

    for (let i = 10; i < 20; i++) {
        let randomNumber = rando(1,99999)
        let name = `Software ${randomNumber}`;
        let version = `Version: ${randomNumber}.0`;

        digitalResources.push(new ResourceDigital(name, version));
    }

    return digitalResources;
}

function rando(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}