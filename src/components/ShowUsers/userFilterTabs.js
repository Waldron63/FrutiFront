import React, { useState } from 'react';
import '../../pages/ListarUsuarios/ListarUsuarios.css';

const UserFilterTabs = ({ onFilterChange }) => {
    const [activeTab, setActiveTab] = useState('Todos');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        onFilterChange(tab);
    };

    return (
        <div className="userFilterTabs">
            <button onClick={() => handleTabClick('Todos')} className={activeTab === 'Todos' ? 'active' : ''}>Todos</button>
            <button onClick={() => handleTabClick('Profesores')} className={activeTab === 'Profesores' ? 'active' : ''}>Profesores</button>
            <button onClick={() => handleTabClick('Administradores')} className={activeTab === 'Administradores' ? 'active' : ''}>Administradores</button>
        </div>
    );
};

export default UserFilterTabs;