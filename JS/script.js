const api = "http://localhost:8080";
//@CrossOrigin(origins = "*")
//============OBJETOS CADA INTERFAZ
//LOGIN
const seccionLogin = document.getElementById('seccionLogin');
const inputLoginID = document.getElementById('inputLoginID');
const inputLoginPassword = document.getElementById('inputLoginPassword');
const buttonLoginLogin = document.getElementById('buttonLoginLogin');
const buttonLoginNewUser = document.getElementById('buttonLoginNewUser');

//NEW USER
const seccionNewUser = document.getElementById('seccionNewUser');
const inputNewUserUser = document.getElementById('inputNewUserUser');
const inputNewUserID = document.getElementById('inputNewUserID');
const inputNewUserEmail = document.getElementById('inputNewUserEmail');
const inputNewUserPassword = document.getElementById('inputNewUserPassword');
const divSelectUserType = document.getElementById('divSelectUserType');
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

//MENU
const seccionMenu = document.getElementById('seccionMenu');
const buttonMenuLogOut = document.getElementById('buttonMenuLogOut');
const divMenuBotones = document.getElementById('divMenuBotones');

//SHOW LABORATORIES
const seccionShowLaboratories = document.getElementById('seccionShowLaboratories');
const buttonShowLaboratoriesVolver = document.getElementById('buttonShowLaboratoriesVolver');
const buttonShowLaboratoriesNewLaboratory = document.getElementById('buttonShowLaboratoriesNewLaboratory');

//SISTEMA DE LOGUEO
let userLogin = null; //DATOS DEL USUARIO LOGUEADO
let isLogin = false; //PARA INDICAR QUE EL USUARIO ESTA LOGUEADO O NO
let token = null;

let userTypes = [
    { value: "none", text: "" },
    { value: "teacher", text: "Profesor" },
    { value: "admin", text: "Administrador" }
];

let dayTypes = [
    { value: "none", text: "" },
    { value: "MONDAY", text: "Lunes" },
    { value: "TUESDAY", text: "Martes" },
    { value: "WEDNESDAY", text: "Miércoles" },
    { value: "THURSDAY", text: "Jueves" },
    { value: "FRIDAY", text: "Viernes" },
    { value: "SATURDAY", text: "Sábado" },
    { value: "SUNDAY", text: "Domingo" }
];

let reserveTypes = [
    { value: "none", text: "" },
    { value: "lesson", text: "Clase" },
    { value: "available", text: "Reserva" }
];

let resourceTypes = [
    { value: "none", text: "" },
    { value: "physical", text: "Fisico" },
    { value: "digital", text: "Digital" }
];

//GUARDAR COSAS GENERALES
let secciones = document.querySelectorAll('.seccion'); //Guarda las secciones en general
let laboratories; //Este es para guardar laboratorios
let reserves; //Este es para guardar las reservas del usuario

//============CLASES TEMPORALES (ES MIENTRAS CONECTO CON EL BACK)

//============FUNCIONES
//======INTERFACES
function interfacesOff() {
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
}
//LOGIN
async function interfaceLogin() {
    interfacesOff();
    seccionLogin.style.display = 'flex';
}
//NEW USER
async function interfaceNewUser() {
    if (document.getElementById("buttonNewUserBack")) {
        document.getElementById("buttonNewUserBack").remove();
    }
    if (document.getElementById("buttonNewUserShowUsers")) {
        document.getElementById("buttonNewUserShowUsers").remove();
    }
    divSelectUserType.innerHTML = "";
    buttonNewUserLogin.style.display = "block";
    interfacesOff();
    seccionNewUser.style.display = 'flex';
}
async function interfaceNewUserMenu() {
    interfaceNewUser();
    buttonNewUserLogin.style.display = "none";
    if (!document.getElementById("buttonNewUserBack")) {
        crearBoton("divNewUserButtons","buttonNewUserBack","Volver",interfaceMenu);
    }
    if (!document.getElementById("buttonNewUserShowUsers")) {
        crearBoton("divNewUserButtons","buttonNewUserShowUsers","Listar Usuarios",interfaceShowUsers);
    }
    if (!document.getElementById("selectNewUserType")) {

        let label = document.createElement("label");
        label.setAttribute("for", "selectNewUserType");
        label.innerHTML = "<strong>Tipo de Usuario</strong>";

        let selectNewUserType = document.createElement("select");
        selectNewUserType.id = "selectNewUserType";
        selectNewUserType.name = "userType";

        addTypesSelect(selectNewUserType, userTypes);

        divSelectUserType.innerHTML = "";
        divSelectUserType.appendChild(label);
        divSelectUserType.appendChild(selectNewUserType);
    }

}

//EDIT USER
async function interfaceEditUser() {
    interfacesOff();
    seccionEditUser.style.display = 'flex';
    loginValidate();
}
//NEW LABORATORY
async function interfaceNewLaboratory() {
    interfacesOff();
    seccionNewLaboratory.style.display = 'flex';
    loginValidate();
}
//EDIT LABORATORY
async function interfaceEditLaboratory() {
    addLaboratoriesSelect(selectEditLaboratoryLaboratory);

    interfacesOff();
    seccionEditLaboratory.style.display = 'flex';
    loginValidate();
}
//NEW RESERVE
async function interfaceNewReserve() {
    addLaboratoriesSelect(selectNewReserveLaboratory);
    addTypesSelect(selectNewReserveType, reserveTypes);

    interfacesOff();
    seccionNewReserve.style.display = 'flex';
    loginValidate();
}
//SHOW USERS
async function interfaceShowUsers() {
    showUsers();

    interfacesOff();
    seccionShowUsers.style.display = 'flex';
    loginValidate();
}
//SHOW RESERVES
async function interfaceShowReserves() {
    showReserves();

    interfacesOff();
    seccionShowReserves.style.display = 'flex';
    loginValidate();
}
//SHOW LABORATORIES
function interfaceShowLaboratories() {
    interfacesOff();
    seccionShowLaboratories.style.display = 'flex';
    loginValidate();
}
//MENU
function interfaceMenu() {
    generateMenuButtons();
    interfacesOff();
    seccionMenu.style.display = 'flex';
    loginValidate();
}

//======CREAR COSAS
//NEW USER
function newUser() {
    let id = inputNewUserID.value.trim();
    let name = inputNewUserUser.value.trim();
    let mail = inputNewUserEmail.value.trim();
    let password = inputNewUserPassword.value.trim();
    let rol = "teacher";
    if (document.getElementById("selectNewUserType")) {
        rol = document.getElementById("selectNewUserType").value.trim();
    }

    if (id === "" || name === "" || mail === "" || password === "" || rol === "none") {
        crearPopupError("Por favor, completa todos los campos.");
        return;
    }

    const userData = {
        id: id,
        name: name,
        mail: mail,
        password: password,
        rol: rol
    };

    const res = postAxios("/api/user/signin",userData,"Usuario");
    if(res){
        inputNewUserID.value = "";
        inputNewUserUser.value = "";
        inputNewUserEmail.value = "";
        inputNewUserPassword.value = "";

    }
}
//NEW LABORATORY
function newLaboratory() {
    let name = inputNewLaboratoryName.value.trim();
    let abbreviation = inputNewLaboratoryAbreviation.value.trim();
    let capacity = inputNewLaboratoryCapacity.value.trim();
    let location = inputNewLaboratoryLocation.value.trim();

    if (name === "" || abbreviation === "" || capacity === "" || location === "") {
        crearPopupError("Por favor, completa todos los campos.");
        return;
    }

    const laboratoryData = {
        id: abbreviation,
        name: name,
        abbreviation: abbreviation,
        totalCapacity: capacity,
        location: location,
        scheduleReferences: []
    };
    
    const res = postAxios("/api/laboratories/",laboratoryData,"Laboratorio");
    if(res){
        inputNewLaboratoryName.value = "";
        inputNewLaboratoryAbreviation.value = "";
        inputNewLaboratoryCapacity.value = "";
        inputNewLaboratoryLocation.value = "";
        inputNewLaboratoryImage.value = "";
    }
}
//NEW RESERVE
function newReserve() {
    let type = selectNewReserveType.value.trim();
    let reason = textAreaNewReserveRazon.value.trim();
    let userId = userLogin.id;
    let state = "free";
    let startHour = inputNewReserveStartTime.value.trim();
    let endHour = inputNewReserveEndTime.value.trim();
    let date = inputNewReserveDate.value.trim();
    let laboratoryName = selectNewReserveLaboratory.value.trim();

    if (type === "" || reason === "" || reason === "none" || startHour === "" || date === "" || laboratoryName === "" || startHour === "") {
        crearPopupError("Por favor, completa todos los campos.");
        return;
    }

    let parsedDate = new Date(date);
    let numberDay = parsedDate.getDate();
    let day = parsedDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    let month = parsedDate.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
    let year = parsedDate.getFullYear();


    const reserveData = {
        type: type,
        reason: reason,
        userId: userId,
        state: state,
        startHour: startHour,
        numberDay: numberDay,
        day: day,
        month: month,
        year: year,
        laboratoryName: laboratoryName
    };


    const res = postAxios("/api/reserve",reserveData,"Reserva");
    if(res){
        document.getElementById("selectNewReserveType").value = "";
        document.getElementById("textAreaNewReserveRazon").value = "";
        document.getElementById("inputNewReserveStartTime").value = "";
        document.getElementById("inputNewReserveDate").value = "";
        document.getElementById("selectNewReserveLaboratory").value = "";
    }
    
}

//======ACTUALIZAR COSAS
//ACTUALIZAR USER
async function editUser() {
    alert("Editado");
}
//ACTUALIZAR LABORATORY
async function editLaboratory() {
    let labName = inputEditLaboratoryAbreviation();
    getLaboratory();

}

//======ELIMINAR COSAS
//DELETE USER
async function deleteUser(idUsuario) {
    try {
        await axios.delete(`${api}/api/user/delete/${idUsuario}`);
    } catch (error) {
        return;
    }
}
//DELETE LABORATORY
async function deleteLaboratory(){
    alert("BORRADA")
}
//DELETE RESERVE
async function deleteReserve(reserva) {
    alert("Borrada")
}

//======MOSTRAR COSAS
//CREAR LAS TARJETAS DE USUARIOS
async function showUsers() {
    try{
        divShowUsersUsers.innerHTML = "";

        let tempUsersArray = await getUsers();

        tempUsersArray.forEach(usuario => {
            let userCard = document.createElement("div");
            userCard.classList.add("showCards");

            userCard.innerHTML = `
                <strong>Usuario: </strong>${usuario.name} <br>
                <strong>ID: </strong>${usuario.id} <br>
                <strong>Email: </strong>${usuario.mail} <br>
                <strong>Rol: </strong>${usuario.rol} <br>
            `;

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Borrar";
            deleteButton.classList.add("deleteButton");

            deleteButton.addEventListener("click", async () => {
                await deleteUser(usuario.id);
                showUsers();
            });

            userCard.appendChild(deleteButton);
            divShowUsersUsers.appendChild(userCard);
        });
    }catch (error){
        console.error("Error monstrar Usuarios: ",error);
    }
}
//CREAR LAS TARJETAS DE RESERVAS
async function showReserves() {
    try {
        divShowReservesReserves.innerHTML = "";
        const tempReservesArray = await getReserves();

        tempReservesArray.forEach(reserva => {
            let usuarioReserva = getUser(reserva.userId);

            let reserveCard = document.createElement("div");
            reserveCard.classList.add("showCards");

            reserveCard.innerHTML = `
                <strong>Laboratorio:</strong> ${reserva.laboratoryName} <br>
                <strong>Razon:</strong> ${reserva.reason} <br>
                <strong>Usuario:</strong> ${usuarioReserva.name} <br>
                <strong>Tipo:</strong> ${reserva.type.toUpperCase()} <br>
                <strong>Fecha:</strong> ${reserva.numberDay} - ${reserva.month} - ${reserva.year}<br>
                <strong>Hora:</strong> ${reserva.startHour} - ${reserva.endTime} <br>
                <strong>Dia:</strong> ${reserva.day}<br>
            `;

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Borrar";
            deleteButton.classList.add("deleteButton");

            deleteButton.addEventListener("click", async () => {
                await deleteReserve(reserva.id); 
                showReserves();
            });

            reserveCard.appendChild(deleteButton);
            divShowReservesReserves.appendChild(reserveCard);
        });

    } catch (error) {
        console.error("Error al mostrar las reservas: ", error);
    }
}

//======ENVIAR COSAS AL BACK
//PARA ENVIAR UN POST (General)
function postAxios(ruta,data,nombreObjeto){
    let res = false;

    axios.post(`${api+ruta}`, data)
        .then(response => {
            crearPopUp('Se ha creado correctamente',`${nombreObjeto} se ha creado con exito`);
            res = true;
        })
        .catch(error => {
            console.error(`Error al crear ${nombreObjeto}: `, error);
            crearPopupError(`Error al crear ${nombreObjeto}`);
            res = false;
        });


        return res;
}

//======SOLICITAR AL BACK
//CONFIRMAR EL LOGIN
async function login() {
    let id = inputLoginID.value.trim();
    let password = inputLoginPassword.value.trim();

    if (id === "" || password === "") {
        crearPopupError("Por favor, completa todos los campos.");
        return;
    }
    
    //PONER FUNCION DE LOGIN ACA
    isLogin = true;

    if(isLogin){
        inputLoginID.value = "";
        inputLoginPassword.value = "";

        laboratories = await getLaboratories();
        interfaceMenu();
    }else{
        return;
    }
}
//OBTENER USUARIOS
async function getUsers(){
    if(userLogin.rol ==="admin"){
        try {
            let response = await axios.get(`${api}/api/user/all`);
            return response.data;
        } catch (error) {
            return [];
        }
    }else{
        return [];
    }
}
//OBTENER USUARIO ESPECIFICO
async function getUser(id) {
    try{

    }catch(error){
        console.error("Error al conseguir usuario: ",error);
    }
}
//OBTENER LABORATORIOS
async function getLaboratories() {
    try {
        let response = await axios.get(`${api}/api/laboratories/laboratory`);
        return response.data;
    } catch (error) {
        return [];
    }
}
//OBTENER LABORATORIO ESPEFIFICO
async function getLaboratory(abbreviation) {
    try {
        const response = await axios.get(`${api}/api/laboratories/abbreviation/${abbreviation}`);
        return response.data;
    } catch (error) {
        return null;
    }
}
//OBTENER RESERVAS
async function getReserves() {
    try {
        let response;

        if (userLogin.rol === "admin") {
            response = await axios.get(`${api}api/reserve/reserves`); 
        } else {
            response = await axios.get(`${api}/api/reserve/users/${userLogin.id}`); 
        }        
        return response.data;
    } catch (error) {
        return [];
    }
}

//======GENERAR OBJETOS
//AGREGAR LABORATORIOS AL SELECT
async function addLaboratoriesSelect(selectLaboratory) {
    laboratories = await getLaboratories();
    selectLaboratory.innerHTML = "";


    let option = document.createElement("option");
    option.value = "none";
    option.text = "";
    selectLaboratory.appendChild(option);


    laboratories.forEach(laboratory => {
        option = document.createElement("option");
        option.value = laboratory.abbreviation;
        option.textContent = laboratory.name;
        selectLaboratory.appendChild(option);
    });
}
//AGREGAR TIPOS AL SELECT
function addTypesSelect(selectType, types) {
    selectType.innerHTML = "";

    types.forEach(type => {
        let option = document.createElement("option");
        option.value = type.value;
        option.textContent = type.text;
        selectType.appendChild(option);
    });
}
//PARA CREAR BOTONES ENTRANDO UNA LISTA CON [{ text: "TEXTO", action: Accion/Evento }]
function crearBotones(elemento, botones) {
    botones.forEach(boton => {
        let newButton = document.createElement("button");
        newButton.textContent = boton.text;
        newButton.addEventListener("click", boton.action);
        elemento.appendChild(newButton);
    });
}
//CREAR UN BOTON ESPECIFICO EN UN LUGAR ESPECIFICO
function crearBoton(divName, buttonName,texto, event){
    
    let newButton = document.createElement("button");
    newButton.type = "button";

    
    newButton.id = `${buttonName}`;
    newButton.innerHTML = `<strong>${texto}</strong>`;
    newButton.addEventListener("click", event);
    newButton.classList.add(clase);
    
    document.getElementById(`${divName}`).appendChild(newButton);
}
//CREAR MENSAJE DE ERROR POPUP
function crearPopupError(mensaje){
    Swal.fire({
        title: "¡Error!",
        text: mensaje,
        icon: "error",
        confirmButtonText: "Ok",
        timer: 3000, 
        timerProgressBar: true 
    });
}
//CREAR MENSAJE DE EXITO POOPUP
function crearPopUp(titulo,mensaje){
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true
    });
}

//======BOTONES
//ESTA DEFINE LAS ACCIONES DE LOS BOTONES
function botonesEvents() {
    //LOGIN
    buttonLoginNewUser.addEventListener('click', interfaceNewUser);
    buttonLoginLogin.addEventListener('click', login);

    //NEW USER
    buttonNewUserLogin.addEventListener('click', interfaceLogin);
    buttonNewUserNewUser.addEventListener('click', newUser);

    //EDIT USER
    buttonEditUserVolver.addEventListener('click', interfaceMenu);
    buttonEditUserGuardar.addEventListener('click', editUser);

    //NEW LABORATORY
    buttonNewLaboratoryVolver.addEventListener('click', interfaceMenu);
    buttonNewLaboratoryNewLaboratory.addEventListener('click', newLaboratory);

    //EDIT LABORATORY
    buttonEditLaboratoryVolver.addEventListener('click', interfaceMenu);
    buttonNewLaboratoryShowLaboratories.addEventListener('click', interfaceShowLaboratories);
    buttonEditLaboratoryGuardar.addEventListener('click', editLaboratory);

    //NEW RESERVE
    buttonNewReserveVolver.addEventListener('click', interfaceMenu);
    buttonNewReserveShowReserves.addEventListener('click', interfaceShowReserves);
    buttonNewReserveNewReserve.addEventListener('click', newReserve);

    //SHOW USERS
    buttonShowUsersVolver.addEventListener('click', interfaceMenu);
    buttonShowUsersNewUser.addEventListener('click', interfaceNewUserMenu);

    //SHOW RESERVES
    buttonShowReservesVolver.addEventListener('click', interfaceMenu);
    buttonShowReservesNewReserve.addEventListener('click', interfaceNewReserve);

    //SHOW LABORATORIES
    buttonShowLaboratoriesVolver.addEventListener('click', interfaceMenu);
    buttonShowLaboratoriesNewLaboratory.addEventListener('click', interfaceNewLaboratory);

    //MENU
    buttonMenuLogOut.addEventListener('click', logOut);
}
//CREAR LOS BOTONES DEL MENU
function generateMenuButtons() {
    divMenuBotones.innerHTML = "";
    if (userLogin == null || !isLogin) {
        return
    }
    if (userLogin.rol === "admin") {
        adminMenuButtons();
    } else {
        userMenuButtons();
    }
}
//PARA GENERAR LOS BOTONES DEL ADMINISTRADOR
function adminMenuButtons() {
    let botones = [
        { text: "Nuevo Usuario", action: interfaceNewUserMenu },
        { text: "Editar Usuario", action: interfaceEditUser },
        { text: "Mostrar Usuarios", action: interfaceShowUsers },
        { text: "Nuevo Laboratorio", action: interfaceNewLaboratory },
        { text: "Editar Laboratorio", action: interfaceEditLaboratory },
        { text: "Mostrar Laboratorios", action: interfaceShowLaboratories },
        { text: "Nueva Reserva", action: interfaceNewReserve },
        { text: "Mostrar Reservas", action: interfaceShowReserves }
    ];

    crearBotones(divMenuBotones, botones);
}
//PARA GENERAR LOS BOTONES DE CUALQUIERA NO ADMINISTRADOR
function userMenuButtons() {
    let botones = [
        { text: "Editar Usuario", action: interfaceEditUser },
        { text: "Nueva Reserva", action: interfaceNewReserve },
        { text: "Mostrar Reservas", action: interfaceShowReserves },
        { text: "Mostrar Laboratorios", action: interfaceShowLaboratories }
    ];

    crearBotones(divMenuBotones, botones);
}

//======VALLIDACIONES / FUNCIONAMIENTO
//VALIDAR COSAS DE INPUTS
function inputEventos() {
    //LOGIN
    inputLoginID.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    //NEW USER
    inputNewUserID.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    //NEW LABORATORY
    inputNewLaboratoryCapacity.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = "";
        }
    });

    //NEW RESERVE
    let today = new Date().toISOString().split("T")[0];
    inputNewReserveDate.setAttribute("min", today);

    inputNewReserveEndTime.setAttribute("readonly", true);
    inputNewReserveStartTime.addEventListener("input", horaFinal);
}
//VERIFICAR QUE ESTE LOGUEADO, SI NO, LO MANDA PARA MENU
function loginValidate() {
    if (!isLogin) {
        interfaceLogin();
    }
}
//PARA DESLOGUEARSE
function logOut() {
    userLogin = null;
    isLogin = false;
    interfaceLogin();
}
//PARA PONER LA HORA FINAL 
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

async function main() {
    interfacesOff();
    botonesEvents();
    inputEventos();
    
    

    //BORRAR
    userLogin = {
        id: 1231312,
        name:"adasdas",
        mail:"adassad@gmail.com",
        password:13123123,
        rol:"admin"
    };
    isLogin = true;
    laboratories = await getLaboratories();

    interfaceMenu();
}

//document.addEventListener("DOMContentLoaded", main);



main();
