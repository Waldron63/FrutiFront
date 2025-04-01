import React, {use, useState} from 'react';
import '../styles/Login.css';
import backgroundImage from '../images/edificio-h-nocturna.jpg';
const CrearUsuario = () => {
    const [usuario,setUsuario] = useState('');
    const [id,setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type,setType] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Usuario:", usuario);
        console.log("ID:", id);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Tipo:", type);
    };



    return (
        <div className="container">
            <div className="background"></div>
            <div className="form-section">
                <img src={require('../images/Logo.png')} className="logo" alt="Logo" />
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
                            type="text"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
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
                    <div className="divInputsUserForm">
                        <label htmlFor="tipo">Tipo</label>
                        <input
                            type="text"
                            id="tipo"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="divUserBotones">
                        <button type="submit">Crear Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CrearUsuario;

