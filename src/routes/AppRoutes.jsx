import { Routes, Route, Navigate } from "react-router-dom";

import Menu from "../pages/Menu/Menu";
import Login from "../pages/Login/Login";

import NewLaboratory from "../pages/CrearLaboratorio/CrearLaboratorio";
//import EditLaboratory from "../pages/EditarLaboratorio/EditarLaboratorio";
import ShowLaboratories from "../pages/ListarLaboratorios/ListarLaboratorios";

import NewReserve from "../pages/CrearReserva/CrearReservas";
import ShowReserves from "../pages/ListaReservas/Reservas";

import NewUser from "../pages/CrearUsuario/CrearUsuario";
import EditUser from "../pages/EditarUsuario/EditarUsuario";
import ShowUsers from "../pages/ListarUsuarios/ListarUsuarios";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/showUsers" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />

      <Route path="/newLaboratory" element={<NewLaboratory />} />

      <Route path="/showLaboratories" element={<ShowLaboratories />} />

      <Route path="/newReserve" element={<NewReserve />} />
      <Route path="/showReserves" element={<ShowReserves />} />

      <Route path="/newUser" element={<NewUser />} />
      <Route path="/editUser/:id?" element={<EditUser />} />
      <Route path="/showUsers" element={<ShowUsers />} />

      <Route path="/signOut" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default AppRoutes;