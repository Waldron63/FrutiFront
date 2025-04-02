import "./Menu.css";

import Navbar from "../../components/Navbar/Navbar";
import Horario from "../../components/Horario/Horario";

function Menu() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="restante">
        <div className="Generalcontainer">
          <div className="leftContainer">
            <div className="horarioContainer">
              <Horario/>
            </div>

            <div className="reservasContainer">
              <h3>Reservas</h3>
            </div>
          </div>

          <div className="rightContainer">
              <h3>Laboratorios</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;