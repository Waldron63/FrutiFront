import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/img/LogoRojo.png";
import { removeAuthSession, getUserInfo } from "../../utils/auth"; // Importar getUserInfo
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = getUserInfo();
    if (user) {
      setUserRole(user.rol); 
    }
  }, []);

  const logout = () => {
    removeAuthSession();
    navigate("/login");
  };

  return (
    <nav className="navBar">
      <img src={logo} className="logoNavBar" alt="Logo" />
      <p><strong>Reservas Laboratorios</strong></p>

      <ul className="navList">
        <li className="navItem">
          <span className="mainLink">
            <Link to="/Menu"><strong>Inicio</strong></Link>
          </span>
        </li>

        {/* Laboratorios */}
        <li className="navItem dropDown">
          <span className="mainLink"><strong>Laboratorios</strong></span>
          <ul className="dropDownMenuLab">
            <li className="secondLink"><Link to="/editLaboratories"><strong>Listar laboratorios</strong></Link></li>
            {userRole === "admin" && (
              <>
                <li className="secondLink"><Link to="/newLaboratory"><strong>Crear laboratorio</strong></Link></li>
                <li className="secondLink"><Link to="/ShowLaboratories"><strong>Administracion laboratorios</strong></Link></li>
              </>
            )}
          </ul>
        </li>

        {/* Reservas */}
        <li className="navItem dropDown">
          <span className="mainLink"><strong>Reservas</strong></span>
          <ul className="dropDownMenu">
            <li className="secondLink"><Link to="/newReserve"><strong>Crear reserva</strong></Link></li>
            <li className="secondLink"><Link to="/showReserves"><strong>Listar reservas</strong></Link></li>
          </ul>
        </li>

        {/* Usuarios */}
        <li className="navItem dropDown">
          <span className="mainLink"><strong>Usuario</strong></span>
          <ul className="dropDownMenu">
            <li className="secondLink"><Link to="/editUser"><strong>Editar usuario</strong></Link></li>
            {userRole === "admin" && (
              <>
                <li className="secondLink"><Link to="/newUser"><strong>Crear usuario</strong></Link></li>
                <li className="secondLink"><Link to="/showUsers"><strong>Listar usuarios</strong></Link></li>
              </>
            )}
          </ul>
        </li>
      </ul>

      <button className="signOutButton" onClick={logout}><strong>Salir</strong></button>
    </nav>
  );
}


export default Navbar; 