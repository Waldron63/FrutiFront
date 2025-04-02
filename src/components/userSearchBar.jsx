import React, { useState } from 'react';
import '../assets/styles/UserSearchBar.css';

const UserSearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-box"
                placeholder="Buscar..."
                value={query}
                onChange={handleInputChange}
            />
            <span className="search-icon">🔍</span>
        </div>
    );
};

export default UserSearchBar;