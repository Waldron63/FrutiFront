import React from 'react';
import userImage from '../../assets/img/users.jpg';

function UserCard({ user }) {
    return (
        <div className="userCard">
            <img src={userImage} alt={`${user.name}'s profile`} className="profilePicture" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="buttonsUserCard">
                <button className="deleteCarButton">Borrar</button>
                <button className="editCarButton">Editar</button>
            </div>
        </div>
    );
}

export default UserCard;