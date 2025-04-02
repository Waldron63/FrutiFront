import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserFilterTabs from "../../components/ShowUsers/userFilterTabs";

import UserList from "../../components/ShowUsers/UserList";
import { getAllUsers } from "../../services/userAPI";
import "./ListarUsuarios.css";

function ListarUsuarios() {
    const [filter, setFilter] = useState("Todos");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
                setFilteredUsers(usersData); // Mostrar todos inicialmente
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        fetchUsers();
    }, []);

    // 🔥 Función para actualizar la lista cuando se elimina un usuario
    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers); // Actualizar la lista de usuarios
    };

    useEffect(() => {
        let filtered = users;

        if (filter === "Profesores") {
            filtered = users.filter((user) => user.rol === "teacher");
        } else if (filter === "Administradores") {
            filtered = users.filter((user) => user.rol === "admin");
        }

        setFilteredUsers(filtered);
    }, [filter, users]);

    return (
        <div>
            <Navbar />
            <main className="userListContainer">
                <header>
                    <h1>Usuarios</h1>
                </header>
                <UserFilterTabs onFilterChange={setFilter} />
                <UserList users={filteredUsers} onDelete={handleDeleteUser} />
            </main>
        </div>
    );
}

export default ListarUsuarios;