import React, { useState, useEffect } from "react";
import "../../assets/styles/user.css";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserName, updateEmail, updatePassword, updateRole } from "../../services/userAPI";
import { getUserInfo } from "../../utils/auth";

const EditarUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const userRol = [
        { value: "teacher", text: "Profesor" },
        { value: "admin", text: "Administrador" }
    ];

    const [userId, setUserId] = useState(null);
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState(userRol[0].value);
    const [initialData, setInitialData] = useState({});

    const userInfo = getUserInfo();
    const esAdmin = userInfo?.rol === "admin";

    useEffect(() => {
        const cargarDatosUsuario = async () => {
            let userData;

            if (id) {
                userData = await getUserById(id);
                setUserId(id);
            } else {
                userData = userInfo;
                setUserId(userInfo?.id);
            }

            if (userData) {
                setUsuario(userData.name || "");
                setEmail(userData.mail || "");
                setRol(userData.rol || userRol[0].value);
                setInitialData({
                    name: userData.name || "",
                    mail: userData.mail || "",
                    rol: userData.rol || userRol[0].value,
                });
            }
        };

        cargarDatosUsuario();
    }, [id, userInfo]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!userId) {
                console.error("No hay un ID de usuario disponible para actualizar.");
                return;
            }

            if (usuario !== initialData.name) {
                await updateUserName(userId, usuario);
            }
            if (email !== initialData.mail) {
                await updateEmail(userId, email);
            }
            if (password.trim() !== "") {
                await updatePassword(userId, password);
            }
            if (esAdmin && rol !== initialData.rol) {
                await updateRole(userId, rol);
            }

            navigate("/showUsers"); // Redirige a la lista de usuarios después de actualizar
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <button type="button" onClick={() => navigate("/showUsers")}>
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
