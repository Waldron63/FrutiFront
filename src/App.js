import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [authModalType, setAuthModalType] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    /**
     * Handles navigation to different pages.
     * 
     * @param {string} page - The page to navigate to.
     */
    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    /**
     * Handles successful authentication.
     * Sets authentication status and navigates to the task manager.
     */
    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setCurrentPage('taskManager');
    };

    /**
     * Handles user logout.
     * Resets authentication status and closes the user modal.
     */
    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentPage('home');
        setIsUserModalOpen(false);
    };

    /**
     * Opens the authentication modal for login or signup.
     * 
     * @param {string} type - The type of authentication modal to open.
     */
    const openAuthModal = (type) => {
        setAuthModalType(type);
    };

    /**
     * Closes the authentication modal.
     */
    const closeAuthModal = () => {
        setAuthModalType(null);
    };

    /**
     * Opens the user information modal.
     */
    const openUserModal = () => {
        setIsUserModalOpen(true);
    };

    /**
     * Closes the user information modal.
     */
    const closeUserModal = () => {
        setIsUserModalOpen(false);
    };

    return (
        <div className="app">
            <Sidebar onNavigate={handleNavigation} openUserModal={openUserModal} />
        </div>
    );
}

export default App;