import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserFilterTabs from "../../components/ShowUsers/userFilterTabs";
import UserList from "../../components/ShowUsers/UserList";
import "./ListarUsuarios.css";

function ListarUsuarios() {
    const [filter, setFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    useEffect(() => {
        // Simular datos de usuarios
        const fakeUsers = [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
            { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
            { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
            { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
            { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' }

        ];
        setUsers(fakeUsers);
    }, []);

    return (
        <div>
            <Navbar />
            <main className="userListContainer">
                <header>
                    <h1>Usuarios</h1>
                </header>
                <UserFilterTabs onFilterChange={handleFilterChange} />
                <UserList users={users} />
            </main>
        </div>
    );
}

export default ListarUsuarios;