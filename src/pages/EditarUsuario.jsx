import React, {use, useState} from 'react';
import '../styles/Login.css';
import backgroundImage from '../images/edificio-h-nocturna.jpg';
const EditarUsuario = () => {
    const [usuario,setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Usuario:", usuario);
        console.log("Email:", email);
        console.log("Password:", password);
    };



    return (
        <div className="container">
            <div className="background"></div>
            <div className="form-section">
                <img src={require('../images/Logo.png')} className="logo" alt="Logo" />
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
                    </div>
                    <div className="divUserBotones">
                        <button type="submit">Editar Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditarUsuario;

