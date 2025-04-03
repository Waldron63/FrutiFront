import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authAPI";
import { getUserByEmail } from "../../services/userAPI";
import { setAuthSession , getUserInfo} from "../../utils/auth";
import "../../assets/styles/user.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        "email" : email,
        "password" : password
      };
      const token = await loginUser(userData);
      const userInfo = await getUserByEmail(email);
      setAuthSession(userInfo);
      console.log(await getUserInfo());
      navigate("/Menu");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleCreateUser = () => {
    console.log("SI hace algo");
    navigate("/newUser");
  };

  return (
    <div className="container">
      <div className="formSection">
        <img src={require("../../assets/img/Logo.png")} className="logo" alt="Logo" />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="divInputsUserForm">
            <label htmlFor="email">Email</label>
            <input
              type="text"
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