import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/user.css";
import { registerUser } from "../../services/authAPI";
import { getUserInfo, isAuthenticated } from "../../utils/auth";

const CrearUsuario = () => {
    const navigate = useNavigate();

    const userRol = [
        { value: "teacher", text: "Profesor" },
        { value: "admin", text: "Administrador" }
    ];

    const [usuario, setUsuario] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState(userRol[0].value);

    const estaAutenticado = isAuthenticated();
    const userInfo = estaAutenticado ? getUserInfo() : null;
    const esAdmin = userInfo?.rol === "admin";

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            "id": id,
            "name": usuario,
            "mail": email,
            "password": password,
            "rol": rol
        };


        try {
            const response = await registerUser(userData); // Cambio aquí
            if(response){
                setUsuario("");
                setId("");
                setEmail("");
                setPassword("");
                setRol(userRol[0].value);
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleListarUsuarios = () => {
        navigate("/showUsers");
    };

    return (
        <div className="container">
            
            <div className="formSection">
                <img
                    src={require("../../assets/img/Logo.png")}
                    className="logo"
                    alt="Logo"
                />
                <h1>Crear Usuario</h1>
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
                        <label htmlFor="ID">ID</label>
                        <input
                            type="number"
                            min="1"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "-" || e.key === "e") {
                                    e.preventDefault();
                                }
                            }}
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                        {estaAutenticado ? (
                            <button type="button" onClick={handleListarUsuarios}>
                                Listar Usuarios
                            </button>
                        ) : (
                            <button type="button" onClick={handleLogin}>
                                Ingresar
                            </button>
                        )}
                        <button type="submit">Crear Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearUsuario;
