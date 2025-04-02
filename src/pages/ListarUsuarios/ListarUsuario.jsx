import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserFilterTabs from "../../components/userFilterTabs";
import UserSearchBar from "../../components/userSearchBar";
import UserList from "../../components/UserList";
import "../../assets/styles/ListarUsuarios.css";

function ListarUsuario() {
    const [filter, setFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        // Simular datos de usuarios
        const fakeUsers = [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
            { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
            { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },

        ];
        setUsers(fakeUsers);
    }, []);

    return (
        <div>
            <Navbar />
            <main className="user-list-container">
                <header>
                    <h1>Usuarios</h1>
                </header>
                <section className="user-controls">
                    <UserFilterTabs onFilterChange={handleFilterChange} />
                    <UserSearchBar onSearch={handleSearch} />
                </section>
                <UserList users={users} />
            </main>
        </div>
    );
}

export default ListarUsuario;