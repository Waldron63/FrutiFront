import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { motion } from "framer-motion";
import logo from '../images/logo-Sinfondo.png';

/**
 * Sidebar component providing navigation buttons for different sections and a user button.
 * Visibility of certain buttons is controlled by the user's role.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.onNavigate - Function to handle navigation based on button clicks.
 * @param {Function} props.openUserModal - Function to open the user profile or settings modal.
 * @returns {JSX.Element} The rendered sidebar component.
 */
const Sidebar = ({ onNavigate, openUserModal }) => {
    const [role] = useState(localStorage.getItem('role'));
    const [activeIndex, setActiveIndex] = useState(0);
    const buttons = ["Inicio", "Laboratorios", "Reservas", "Usuarios"];

    return (
      <div className="sidebar-container">
      <img src={logo} alt="Logo" className="logo side-element" />
      <div className='sideTitle side-element'>Reserva Laboratorios</div>
        <div className="button-group">
          {buttons.map((label, index) => (
            <div key={index} className="button-wrapper">
              <button
                className={activeIndex === index ? "button active" : "button"}
                onClick={() => setActiveIndex(index)}
              >
                {label}
              </button>
              {activeIndex === index && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
};

export default Sidebar;