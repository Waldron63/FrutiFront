import React from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/img/users.jpg";
import { deleteUser } from "../../services/userAPI";

function UserCard({ user, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            onDelete(user.id);
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <div className="userCard">
            <img src={userImage} alt={`${user.name}'s profile`} className="profilePicture" />
            <h2>{user.name}</h2>
            <p>{user.mail}</p>
            <div className="buttonsUserCard">
                <button className="deleteCarButton" onClick={handleDelete}>
                    Eliminar
                </button>
                <button 
                    className="editCarButton" 
                    onClick={() => navigate(`/editUser/${user.id}`)}
                >
                    Editar
                </button>
            </div>
        </div>
    );
}

export default UserCard;
