import React, {use, useState} from 'react';
import '../../assets/img/edificio-h-nocturna.jpg';
import '../../assets/styles/Login.css'

const Login = () => {
    const [usuario,setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Usuario:", usuario);
        console.log("Password:", password);
    };



    return (
        <div className="container">
            <div className="background"></div>
            <div className="form-section">
                <img src={require('../../assets/img/Logo.png')} className="logo" alt="Logo" />
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
                    </div>
                    <div className="divUserBotones">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


