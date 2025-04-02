import { HashRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CrearUsuario from "./pages/CrearUsuario";

function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path="/crear-usuario" element={<CrearUsuario />} />
        </Routes>
    </Router>
  );
}

export default App;
