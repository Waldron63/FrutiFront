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
              
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;