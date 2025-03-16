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

//NEW LABORATORY
const seccionNewLaboratory = document.getElementById('seccionNewLaboratory');
const inputNewLaboratoryName = document.getElementById('inputNewLaboratoryName');
const inputNewLaboratoryAbreviation = document.getElementById('inputNewLaboratoryAbreviation');
const inputNewLaboratoryCapacity = document.getElementById('inputNewLaboratoryCapacity');
const inputNewLaboratoryLocation = document.getElementById('inputNewLaboratoryLocation');
const inputNewLaboratoryImage = document.getElementById('inputNewLaboratoryImage');
const buttonNewLaboratoryVolver = document.getElementById('buttonNewLaboratoryVolver');
const buttonNewLaboratoryNewLaboratory = document.getElementById('buttonNewLaboratoryNewLaboratory');

//EDIT LABORATORY
const seccionEditLaboratory = document.getElementById('seccionEditLaboratory');
const selectEditLaboratoryLaboratory = document.getElementById('selectEditLaboratoryLaboratory');
const inputEditLaboratoryName = document.getElementById('inputEditLaboratoryName');
const inputEditLaboratoryAbreviation = document.getElementById('inputEditLaboratoryAbreviation');
const inputEditLaboratoryCapacity = document.getElementById('inputEditLaboratoryCapacity');
const inputEditLaboratoryLocation = document.getElementById('inputEditLaboratoryLocation');
const inputEditLaboratoryImage = document.getElementById('inputEditLaboratoryImage');
const buttonEditLaboratoryVolver = document.getElementById('buttonEditLaboratoryVolver');
const buttonEditLaboratoryGuardar = document.getElementById('buttonEditLaboratoryGuardar');

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

//NEW RESOURCE
const seccionNewResource = document.getElementById('seccionNewResource');
const selectNewResourceLaboratory = document.getElementById('selectNewResourceLaboratory');
const selectNewResourceType = document.getElementById('selectNewResourceType');
const divNewResourcePhysical = document.getElementById('divNewResourcePhysical');
const inputNewResourceName = document.getElementById('inputNewResourceName');
const inputNewResourceQuantity = document.getElementById('inputNewResourceQuantity');
const divNewResourceDigital = document.getElementById('divNewResourceDigital');
const inputNewResourceSoftware = document.getElementById('inputNewResourceSoftware');
const inputNewResourceVersion = document.getElementById('inputNewResourceVersion');
const buttonNewResourceVovler = document.getElementById('buttonNewResourceVovler');
const buttonNewResourceAdd = document.getElementById('buttonNewResourceAdd');

//SHOW USERS
const seccionShowUsers = document.getElementById('seccionShowUsers');
const divShowUsersUsers = document.getElementById('divShowUsersUsers');
const buttonShowUsersVolver = document.getElementById('buttonShowUsersVolver');
const buttonShowUsersNewUser = document.getElementById('buttonShowUsersNewUser');

//SHOW RESERVES
const seccionShowReserves = document.getElementById('seccionShowReserves');
const divShowReservesReserves = document.getElementById('divShowReservesReserves');
const buttonShowReservesVolver = document.getElementById('buttonShowReservesVolver');
const buttonShowReservesNewReserve = document.getElementById('buttonShowReservesNewReserve');

//SHOW RESOURCES
const seccionShowResources = document.getElementById('seccionShowResources');
const selectShowResourcesLaboratory = document.getElementById('selectShowResourcesLaboratory');
const divShowResourcesPhysical = document.getElementById('divShowResourcesPhysical');
const divShowResourcesDigital = document.getElementById('divShowResourcesDigital');
const buttonShowResourcesVolver = document.getElementById('buttonShowResourcesVolver');
const buttonShowResourcesNewResource = document.getElementById('buttonShowResourcesNewResource');

//MENU
const seccionMenu = document.getElementById('seccionMenu');

//SHOW LABORATORIES
const seccionShowLaboratories = document.getElementById('seccionShowLaboratories');

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
    addTypesSelect(selectNewUserType,[
        { value: "none", text: ""},
        { value: "profesor", text: "Profesor" },
        { value: "administrador", text: "Administrador"}
    ]);
    seccionNewUser.style.display = 'flex';
}

function interfaceEditUser(){
    interfacesOff();
    seccionEditUser.style.display = 'flex';
}

function interfaceNewLaboratory(){
    interfacesOff();
    seccionNewLaboratory.style.display = 'flex';
}

function interfaceEditLaboratory(){
    interfacesOff();
    addLaboratoriesSelect(selectEditLaboratoryLaboratory);
    seccionEditLaboratory.style.display = 'flex';
}

function interfaceNewReserve(){
    interfacesOff();
    addLaboratoriesSelect(selectNewReserveLaboratory);
    addTypesSelect(selectNewReserveType,[
        { value: "none", text: "" },
        { value: "class", text: "Clase" },
        { value: "reserve", text: "Reserva" }
    ])
    seccionNewReserve.style.display = 'flex';
}

function interfaceNewResource(){
    interfacesOff();
    addLaboratoriesSelect(selectNewResourceLaboratory);
    addTypesSelect(selectNewResourceType,[
        { value: "none", text: ""},
        { value: "physical", text: "Fisico" },
        { value: "digital", text: "Digital"}
    ]);
    divNewResourceDigital.style.display = "none";
    divNewResourcePhysical.style.display = "none";


    seccionNewResource.style.display = 'flex';
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
    addLaboratoriesSelect(selectShowResourcesLaboratory);
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

    //NEW LABORATORY
    buttonNewLaboratoryVolver.addEventListener('click',interfaceMenu);
    buttonNewLaboratoryNewLaboratory.addEventListener('click',newLaboratory);

    //NEW RESOURCE
    buttonNewResourceVovler.addEventListener('click',interfaceMenu);
    buttonNewResourceAdd.addEventListener('click',addResource);
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

    //NEW LABORATORY
    inputNewLaboratoryCapacity.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    //NEW RESOURCE
    inputNewResourceQuantity.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    inputNewResourceVersion.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    selectNewResourceType.addEventListener("change", function() {
        let value = this.value;
        
        cleanNewResource();
        
        if (value === "physical") {
            divNewResourcePhysical.style.display = "flex";
        } else if (value === "digital") {
            divNewResourceDigital.style.display = "flex";
        }
    });

  
}

function cleanNewResource(){
    divNewResourcePhysical.style.display = "none";
    inputNewResourceName.value = "";
    inputNewResourceQuantity.value = "";
    divNewResourceDigital.style.display = "none";
    inputNewResourceSoftware.value = "";
    inputNewResourceVersion.value = "";
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

function addLaboratoriesSelect(selectLaboratory) {
    selectLaboratory.innerHTML = "";

    
    let option = document.createElement("option");
    option.value = "none";
    option.text = "";
    selectLaboratory.appendChild(option);

    
    laboratories.forEach(laboratory => {
        option = document.createElement("option");
        option.value = laboratory.name;
        option.textContent = laboratory.name;
        selectLaboratory.appendChild(option);
    });
}

function addTypesSelect(selectType,types){
    selectType.innerHTML ="";
    
    types.forEach(type => {
        let option = document.createElement("option");
        option.value = type.value;  
        option.textContent = type.text;  
        selectType.appendChild(option);  
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

//NEW LABORATORY
function newLaboratory(){
    alert("Laboratorio Creado");
}

//NEW RESOURCE
function addResource(){
    alert("Agregado");
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
//interfaceShowResources();   //FALTA COMPLETARLA

//interfaceNewReserve();
//interfaceNewLaboratory();

//interfaceNewResource();
interfaceEditLaboratory();


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