import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/user.css";
import { getUserById, updateEmail, updatePassword, updateRole, updateUserName } from "../../services/userAPI";
import { getUserInfo, isAuthenticated } from "../../utils/auth";

const EditarUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const userRol = [
        { value: "teacher", text: "Profesor" },
        { value: "admin", text: "Administrador" }
    ];

    const [idUser, setId] = useState(null);
    const [usuario, setUsuario] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState(userRol[0].value);
    const [initialData, setInitialData] = useState({});
    const [currentUserInfo] = useState(getUserInfo()); // Guardar userInfo de manera estable

    const esAdmin = currentUserInfo?.rol === "admin";
    const estaAutenticado = isAuthenticated();

    useEffect(() => {
        const cargarDatosUsuario = async () => {
            let userData = id ? await getUserById(id) : currentUserInfo;

            if (userData) {
                setId(id || currentUserInfo?.id);
                setUsuario(userData.name || "");
                setMail(userData.mail || "");
                setRol(userData.rol || userRol[0].value);
                setInitialData({
                    name: userData.name || "",
                    mail: userData.mail || "",
                    rol: userData.rol || userRol[0].value,
                });
            }
        };

        cargarDatosUsuario();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!idUser) {
                console.error("No hay un ID de usuario disponible para actualizar.");
                return;
            }

            if (usuario !== initialData.name) {
                await updateUserName(idUser, usuario);
            }
            if (mail !== initialData.mail) {
                await updateEmail(idUser, mail);
            }
            if (password.trim() !== "") {
                await updatePassword(idUser, password);
            }
            if (esAdmin && rol !== initialData.rol) {
                await updateRole(idUser, rol);
            }

            navigate("/showUsers");
            setTimeout(() => window.location.reload(), 100); // Opcional si no renderiza
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className="container">
            
            <div className="formSection">
                <img src={require("../../assets/img/Logo.png")} className="logo" alt="Logo" />
                <h1>Editar Usuario</h1>
                <form onSubmit={handleSubmit}>
                    <div className="divInputsUserForm">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>
                    <div className="divInputsUserForm">
                        <label htmlFor="mail">mail</label>
                        <input
                            type="mail"
                            id="mail"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="divInputsUserForm">
                        <label htmlFor="password">Nueva Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {esAdmin && (
                        <div className="divInputsUserForm" id="selectRol">
                            <label htmlFor="rol">Rol</label>
                            <select
                                id="rol"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                required
                            >
                                {userRol.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="divUserBotones">
                        <button type="button" onClick={() => {
                            console.log("SI envia");
                            navigate("/showUsers");
                            setTimeout(() => window.location.reload(), 100);
                        }}>
                            Listar Usuarios
                        </button>
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarUsuario;
