import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authAPI";
import { setAuthSession } from "../../utils/auth";
import "../../assets/styles/user.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const userData = { usuario, password };
      const response = await loginUser(userData);

      if (response) {
        setAuthSession(response);
        navigate("/Menu");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleCreateUser = () => {
    navigate("/newUser");
  };

  return (
    <div className="container">
      <div className="formSection">
        <img src={require("../../assets/img/Logo.png")} className="logo" alt="Logo" />
        <h1>Login</h1>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="divUserBotones">
            <button type="button" onClick={handleCreateUser}>Crear Usuario</button>
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
