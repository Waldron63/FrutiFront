//============OBJETOS CADA INTERFAZ
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
const divNewUserButtons = document.getElementById('divNewUserButtons');
const buttonNewUserLogin = document.getElementById('buttonNewUserLogin');
const buttonNewUserShowUsers = document.getElementById('buttonNewUserShowUsers');
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
const buttonNewLaboratoryShowLaboratories = document.getElementById('buttonNewLaboratoryShowLaboratories');
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
const buttonNewReserveShowReserves = document.getElementById('buttonNewReserveShowReserves');
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
const buttonNewResourceShowResources = document.getElementById('buttonNewResourceShowResources');
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
const buttonMenuLogOut = document.getElementById('buttonMenuLogOut');
const divMenuBotones = document.getElementById('divMenuBotones');

//SHOW LABORATORIES
const seccionShowLaboratories = document.getElementById('seccionShowLaboratories');
const buttonShowLaboratoriesVolver = document.getElementById('buttonShowLaboratoriesVolver');
const buttonShowLaboratoriesNewLaboratory = document.getElementById('buttonShowLaboratoriesNewLaboratory');

//============VARIABLES FUNCIONAMIENTO
//PARA GUARDAR TODAS LAS SECCIONES
let secciones = document.querySelectorAll('.seccion');

//SISTEMA DE LOGUEO
let userLogin = null; //DATOS DEL USUARIO LOGUEADO
let isLogin = false; //PARA INDICAR QUE EL USUARIO ESTA LOGUEADO O NO

//GUARDAR COSAS GENERALES
let laboratories; //Este es para guardar laboratorios
let reserves; //Este es para guardar las reservas del usuario

//============CLASES TEMPORALES (ES MIENTRAS CONECTO CON EL BACK)
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
//LOGIN
function interfaceLogin(){
    interfacesOff();
    seccionLogin.style.display = 'flex';
}
//NEW USER
function interfaceNewUser(){
    addTypesSelect(selectNewUserType,[
        { value: "none", text: ""},
        { value: "teacher", text: "Profesor" },
        { value: "admin", text: "Administrador"}
    ]);

    if (document.getElementById("buttonNewUserBack")){
        document.getElementById("buttonNewUserBack").remove();
    }
    if (document.getElementById("buttonNewUserShowUsers")) {
        document.getElementById("buttonNewUserShowUsers").remove();
    }
    buttonNewUserLogin.style.display = "block";
    interfacesOff();
    seccionNewUser.style.display = 'flex';
}
function interfaceNewUserMenu(){
    interfaceNewUser();
    buttonNewUserLogin.style.display="none";
    if (!document.getElementById("buttonNewUserBack")) {
        
        let backButton = document.createElement("button");
        backButton.id = "buttonNewUserBack";
        backButton.type = "button";
        backButton.innerHTML = "<strong>Volver</strong>";

        backButton.addEventListener("click", interfaceMenu);

        document.getElementById("divNewUserButtons").appendChild(backButton);
    }
    if (!document.getElementById("buttonNewUserShowUsers")) {
        
        let showUsersButton = document.createElement("button");
        showUsersButton.id = "buttonNewUserShowUsers";
        showUsersButton.type = "button";
        showUsersButton.innerHTML = "<strong>Listar Usuarios</strong>";

        showUsersButton.addEventListener("click", interfaceShowUsers);

        document.getElementById("divNewUserButtons").appendChild(showUsersButton);
    }
}
//EDIT USER
function interfaceEditUser(){
    interfacesOff();
    seccionEditUser.style.display = 'flex';
    loginValidate();
}
//NEW LABORATORY
function interfaceNewLaboratory(){
    interfacesOff();
    seccionNewLaboratory.style.display = 'flex';
    loginValidate();
}
//EDIT LABORATORY
function interfaceEditLaboratory(){
    addLaboratoriesSelect(selectEditLaboratoryLaboratory);

    interfacesOff();
    seccionEditLaboratory.style.display = 'flex';
    loginValidate();
}
//NEW RESERVE
function interfaceNewReserve(){
    addLaboratoriesSelect(selectNewReserveLaboratory);
    addTypesSelect(selectNewReserveType,[
        { value: "none", text: "" },
        { value: "class", text: "Clase" },
        { value: "reserve", text: "Reserva" }
    ])
    
    interfacesOff();
    seccionNewReserve.style.display = 'flex';
    loginValidate();
}
//NEW RESOURCE
function interfaceNewResource(){    
    addLaboratoriesSelect(selectNewResourceLaboratory);
    addTypesSelect(selectNewResourceType,[
        { value: "none", text: ""},
        { value: "physical", text: "Fisico" },
        { value: "digital", text: "Digital"}
    ]);
    divNewResourceDigital.style.display = "none";
    divNewResourcePhysical.style.display = "none";


    interfacesOff();
    seccionNewResource.style.display = 'flex';
    loginValidate();
}
//SHOW USERS
function interfaceShowUsers(){
    showUsers();

    interfacesOff();
    seccionShowUsers.style.display = 'flex';
    loginValidate();
}
//SHOW RESERVES
function interfaceShowReserves(){
    showReserves();

    interfacesOff();
    seccionShowReserves.style.display = 'flex';
    loginValidate();
}
//SHOW RESOURCES
function interfaceShowResources(){
    addLaboratoriesSelect(selectShowResourcesLaboratory);
    showResources();

    interfacesOff();
    seccionShowResources.style.display = 'flex';
    loginValidate();
}
//SHOW LABORATORIES
function interfaceShowLaboratories(){
    interfacesOff();
    seccionShowLaboratories.style.display = 'flex';
    loginValidate();
}
//MENU
function interfaceMenu(){
    generateMenuButtons();
    interfacesOff();
    seccionMenu.style.display = 'flex';
    loginValidate();
}

//======ENVIAR DATOS AL  BACK
//LOGIN
function login(){
//    alert("Login");

    laboratories = getLaboratories();
}
//NEW USER
function newUser(){
    alert("newUser");
}
//EDIT USER
function editUser(){
    alert("Editado");
}
//NEW LABORATORY
function newLaboratory(){
    alert("Laboratorio Creado");
}
//EDIT LABORATORY
function editLaboratory(){
    alert("Guardado");
}
//NEW RESERVE
function newReserve(){
    alert("Reserva Creada");
}
//NEW RESOURCE
function addResource(){
    alert("Agregado");
}
//SHOW USERS
function deleteUser(idUsuario){
    alert("Usuario con ID: " + idUsuario + " Eliminado");
}
//SHOW RESERVES
function deleteReserve(reserva){
    alert("Reserva: " + reserva.Date + " Eliminada")
}
//SHOW RESOURCES
function deleteResource(resource){
    alert("RECURSO BORRADO: ");
}
//MENU

//======RECIBIR DATOS DEL  BACK
//GENERALES
    //LABORATORIOS
function getLaboratories(){
    return tempAddLaboratories();
}
//LOGIN
function getLogin(){
    login = true;
}
//NEW USER

//EDIT USER

//NEW LABORATORY

//EDIT LABORATORY

//NEW RESERVE

//NEW RESOURCE

//SHOW USERS

//SHOW RESERVES
function getReserves(){
    return tempAddReserves();
}
//SHOW RESOURCES

//MENU

//======BOTONES
    //ESTA DEFINE LAS ACCIONES DE LOS BOTONES
function botonesEvents(){
    //LOGIN
    buttonLoginNewUser.addEventListener('click',interfaceNewUser);
    buttonLoginLogin.addEventListener('click',login);

    //NEW USER
    buttonNewUserLogin.addEventListener('click',interfaceLogin);
    buttonNewUserNewUser.addEventListener('click',newUser);

    //EDIT USER
    buttonEditUserVolver.addEventListener('click',interfaceMenu);
    buttonEditUserGuardar.addEventListener('click',editUser);

    //NEW LABORATORY
    buttonNewLaboratoryVolver.addEventListener('click',interfaceMenu);
    buttonNewLaboratoryNewLaboratory.addEventListener('click',newLaboratory);

    //EDIT LABORATORY
    buttonEditLaboratoryVolver.addEventListener('click',interfaceMenu);
    buttonNewLaboratoryShowLaboratories.addEventListener('click',interfaceShowLaboratories);
    buttonEditLaboratoryGuardar.addEventListener('click',editLaboratory);

    //NEW RESERVE
    buttonNewReserveVolver.addEventListener('click',interfaceMenu);
    buttonNewReserveShowReserves.addEventListener('click',interfaceShowReserves);
    buttonNewReserveNewReserve.addEventListener('click',newReserve);

    //NEW RESOURCE
    buttonNewResourceVovler.addEventListener('click',interfaceMenu);
    buttonNewResourceShowResources.addEventListener('click',interfaceShowResources);
    buttonNewResourceAdd.addEventListener('click',addResource);

    //SHOW USERS
    buttonShowUsersVolver.addEventListener('click',interfaceMenu);
    buttonShowUsersNewUser.addEventListener('click',interfaceNewUserMenu);

    //SHOW RESERVES
    buttonShowReservesVolver.addEventListener('click',interfaceMenu);
    buttonShowReservesNewReserve.addEventListener('click',interfaceNewReserve);

    //SHOW RESOURCES
    buttonShowResourcesVolver.addEventListener('click',interfaceMenu);
    buttonShowResourcesNewResource.addEventListener('click',interfaceNewResource);

    //SHOW LABORATORIES
    buttonShowLaboratoriesVolver.addEventListener('click',interfaceMenu);
    buttonShowLaboratoriesNewLaboratory.addEventListener('click',interfaceNewLaboratory);

    //MENU
    buttonMenuLogOut.addEventListener('click',logOut);
}

//======INPUTS
function inputEventos(){
    //LOGIN

    //NEW USER
    inputNewUserID.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    //EDIT USER

    //NEW LABORATORY
    inputNewLaboratoryCapacity.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    //EDIT LABORATORY

    
    //NEW RESERVE
    let today = new Date().toISOString().split("T")[0];
    inputNewReserveDate.setAttribute("min", today);

    inputNewReserveEndTime.setAttribute("readonly", true);
    inputNewReserveStartTime.addEventListener("input",horaFinal);

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

    //SHOW USERS

    //SHOW RESERVES

    //SHOW RESOURCES

    //MENU
  
}

//======METODOS PARA FUNCIONAMIENTO
//GENERALES
    //GERNERAR LOS LABORATORIOS EN EL SELECT INDICADO
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
    //PONER LOS TIPOS DE ALGO (UN ARREGLO [{VALUE = "", TEXT = ""}]}) EN UN SELECT INDICADO
function addTypesSelect(selectType,types){
    selectType.innerHTML ="";
    
    types.forEach(type => {
        let option = document.createElement("option");
        option.value = type.value;  
        option.textContent = type.text;  
        selectType.appendChild(option);  
    });
}
//LOGIN
//POR SI NO ESTA LOGUEADO NO DEJARLO ACCEDER A LAS PAGINAS
function loginValidate(){
    if(!isLogin){
        interfaceLogin();
    }
}
//NEW USER

//EDIT USER

//NEW LABORATORY

//EDIT LABORATORY

//NEW RESERVE
    //PARA QUE CAMBIE LA HORA FINAL DE LA RESERVA
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
//NEW RESOURCE
    //LIMPIAR LOS INPUTS
function cleanNewResource(){
    divNewResourcePhysical.style.display = "none";
    inputNewResourceName.value = "";
    inputNewResourceQuantity.value = "";
    divNewResourceDigital.style.display = "none";
    inputNewResourceSoftware.value = "";
    inputNewResourceVersion.value = "";
}
//SHOW USERS
    //CREAR LAS TARJETAS DE USUARIOS
function showUsers(){
    divShowUsersUsers.innerHTML = "";

    let tempUsersArray = tempAddUsers();

    tempUsersArray.forEach(usuario => {
        let userCard = document.createElement("div");
        userCard.classList.add("showCards");

        userCard.innerHTML = `
            <strong>Usuario: </strong>${usuario.userName} <br>
            <strong>ID: </strong>${usuario.id} <br>
            <strong>Email: </strong>${usuario.email} <br>
            <strong>Rol: </strong>${usuario.type} <br>
        `;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Borrar";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", () => {
            deleteUser(usuario.id);
            showUsers();
        });

        userCard.appendChild(deleteButton);
        divShowUsersUsers.appendChild(userCard);
    });
}
//SHOW RESERVES
    //CREAR LAS TARJETAS DE RESERVAS
function showReserves() {
    divShowReservesReserves.innerHTML = "";

    tempReservesArray = getReserves();

    tempReservesArray.forEach(reserva => {
        let reserveCard = document.createElement("div");
        reserveCard.classList.add("showCards");

        reserveCard.innerHTML = `
            <strong>Laboratorio:</strong> ${reserva.laboratory} <br>
            <strong>Tipo:</strong> ${reserva.type} <br>
            <strong>Día:</strong> ${reserva.day} <br>
            <strong>Hora:</strong> ${reserva.startTime} - ${reserva.endTime} <br>
        `;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Borrar";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", () => {
            deleteReserve(reserva);
            showReserves();
        });

        reserveCard.appendChild(deleteButton);
        divShowReservesReserves.appendChild(reserveCard);
    });
}
//SHOW RESOURCES
    //CREAR LAS TARJETAS DE RECURSOS
function showResources(){
    showResourcesPhysical();
    showResourcesDigital();
}
    //CREAR TARJETAS RECURSOS FISICOS
function showResourcesPhysical() {
    divShowResourcesPhysical.innerHTML = "";
    let tempPhysicalArray = tempAddPhysical();

    tempPhysicalArray.forEach(recurso => {
        let resourceCard = document.createElement("div");
        resourceCard.classList.add("showCards");

        resourceCard.innerHTML = `
            <strong>Objeto:</strong> ${recurso.object} <br>
            <strong>Cantidad:</strong> ${recurso.quantity} <br>
        `;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Borrar";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", () => {
            deleteResource(recurso);
            showResourcesPhysical();
        });

        resourceCard.appendChild(deleteButton);
        divShowResourcesPhysical.appendChild(resourceCard);
    });
}
    //CREAR TARJETAS RECURSOS DIGITALES
function showResourcesDigital() {
    divShowResourcesDigital.innerHTML = "";

    let tempDigitallArray = tempAddDigital();

    tempDigitallArray.forEach(recurso => {
        let resourceCard = document.createElement("div");
        resourceCard.classList.add("showCards");

        resourceCard.innerHTML = `
            <strong>Objeto:</strong> ${recurso.name} <br>
            <strong>Cantidad:</strong> ${recurso.version} <br>
        `;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Borrar";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", () => {
            deleteResource(recurso);
            showResourcesPhysical();
        });

        resourceCard.appendChild(deleteButton);
        divShowResourcesDigital.appendChild(resourceCard);
    });
}
//MENU
    //CREAR LOS BOTONES DEL MENU
function generateMenuButtons(){
    divMenuBotones.innerHTML = "";
    if(userLogin.type == 'admin'){
        adminMenuButtons();
    }else{
        userMenuButtons();
    }
}
    //PARA GENERAR LOS BOTONES DEL ADMINISTRADOR
function adminMenuButtons(){
    let botones = [
        { text: "Nuevo Usuario", action: interfaceNewUserMenu },
        { text: "Nueva Reserva", action: interfaceNewReserve },
        { text: "Nuevo Laboratorio", action: interfaceNewLaboratory },
        { text: "Nuevo Recurso", action: interfaceNewResource },
        { text: "Editar Usuario", action: interfaceEditUser },
        { text: "Editar Laboratorio", action: interfaceEditLaboratory },
        { text: "Mostrar Usuarios", action: interfaceShowUsers },
        { text: "Mostrar Reservas", action: interfaceShowReserves },
        { text: "Mostrar Laboratorios", action: interfaceShowLaboratories },
        { text: "Mostrar Recursos", action: interfaceShowResources }
        
    ];

    crearBotones(divMenuBotones,botones);
}
    //PARA GENERAR LOS BOTONES DE CUALQUIERA NO ADMINISTRADOR
function userMenuButtons(){
    let botones = [
        { text: "Editar Usuario", action: interfaceEditUser },
        { text: "Nueva Reserva", action: interfaceNewReserve },
        { text: "Mostrar Reservas", action: interfaceShowReserves },
        { text: "Mostrar Laboratorios", action: interfaceShowLaboratories }
    ];
    
    crearBotones(divMenuBotones,botones);
}
    //PARA CREAR BOTONES ENTRANDO UNA LISTA CON EL TEXTO , ACCION
function crearBotones(elemento,botones){
    botones.forEach(boton => {
        let btn = document.createElement("button");
        btn.textContent = boton.text;
        btn.addEventListener("click", boton.action);
        elemento.appendChild(btn);
    });
}
    //PARA DESLOGUEARSE
function logOut(){
    userLogin = null;
    isLogin = false;
    loginValidate();
}
//MAIN (ES DONDE GUARDO LO GENERAL PARA INICIAR TODO)
function main(){   
    //APAGAR TODAS LAS INTERFACES
    interfacesOff();
    //GENERAR LAS FUNCIONES DE LOS BOTONES
    botonesEvents();
    //GENERAR ACCIONES DE LOS INPUT
    inputEventos();
}
//ESTA SE EJECUTA AUTOMATICAMENTE CUANDO TODA LA PAGINA WEB YA "CARGA"
//document.addEventListener("DOMContentLoaded", main);



main();
userLogin = new User("ALEJANDRO",1234,"PRUEBA@MAIL.COM","*****","admin");

isLogin = true;
login();
interfaceMenu();

//FALTA AJUSTAR VISUAL
//interfaceShowUsers();
//interfaceShowReserves();
//interfaceShowResources();   //FALTA COMPLETARLA


//======TEMPORALES (ES MIENTRAS UNIMOS CON EL BACK)
function tempAddUsers() {
    let users = [];
    for (let i = 0; i < 3; i++) {
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