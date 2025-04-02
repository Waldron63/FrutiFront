import React from 'react';
import userImage from '../assets/img/users.jpg';

function UserCard({ user }) {
    return (
        <div className="user-card">
            <img src={userImage} alt={`${user.name}'s profile`} className="profile-picture" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="icons">
                <button className="email-icon">📧</button>
                <button className="options-icon">⋮</button>
            </div>
            <div className="buttons">
                <button className="delete-button">Borrar</button>
                <button className="edit-button">Editar</button>
            </div>
        </div>
    );
}

export default UserCard;