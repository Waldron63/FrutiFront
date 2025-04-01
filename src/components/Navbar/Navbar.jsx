import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/img/LogoRojo.png";

function Navbar() {
  return (
    <nav className="navBar">
      <img src={logo} className="logo" alt="Logo" />
      <p><strong>Reservas Laboratorios</strong></p>

      <ul className="navList">

        <li className="navItem">
          <span className="mainLink">
            <Link to="/Menu"><strong>Inicio</strong></Link>
          </span>
        </li>

        <li className="navItem dropDown">
          <span className="mainLink"><strong>Laboratorios</strong></span>
          <ul className="dropDownMenuLab">
            <li className="secondLink"><Link to="/newLaboratory"><strong>Crear laboratorio</strong></Link></li>
            <li className="secondLink"><Link to="/editLaboratory"><strong>Editar laboratorio</strong></Link></li>
            <li className="secondLink"><Link to="/ShowLaboratories"><strong>Listar laboratorios</strong></Link></li>
          </ul>
        </li>

        <li className="navItem dropDown">
          <span className="mainLink"><strong>Reservas</strong></span>
          <ul className="dropDownMenu">
            <li className="secondLink"><Link to="/newReserve"><strong>Crear reserva</strong></Link></li>
            <li className="secondLink"><Link to="/showReserves"><strong>Listar reservas</strong></Link></li>
          </ul>
        </li>

        <li className="navItem dropDown">
          <span className="mainLink"><strong>Usuario</strong></span>
          <ul className="dropDownMenu">
            <li className="secondLink"><Link to="/newUser"><strong>Crear usuario</strong></Link></li>
            <li className="secondLink"><Link to="/editUser"><strong>Editar usuario</strong></Link></li>
            <li className="secondLink"><Link to="/showUsers"><strong>Listar usuarios</strong></Link></li>
          </ul>
        </li>
        
      </ul>
      <Link to="/login">
        <button className="signOutButton"><strong>Salir</strong></button>
      </Link>
    </nav>
  );
}

export default Navbar;
