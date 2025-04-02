import { Routes, Route, Navigate } from "react-router-dom";

import Menu from "../pages/Menu/Menu";
import Login from "../pages/Login/Login";

import NewLaboratory from "../pages/CrearLaboratorio/CrearLaboratorio";
//import EditLaboratory from "../pages/EditarLaboratorio/EditarLaboratorio";
import ShowLaboratories from "../pages/ListarLaboratorios/ListarLaboratorios";

import NewReserve from "../pages/CrearReserva/CrearReserva";
import ShowReserves from "../pages/ListaReservas/ListarReservas";

import NewUser from "../pages/CrearUsuario/CrearUsuario";
import EditUser from "../pages/EditarUsuario/EditarUsuario";
import ShowUsers from "../pages/ListarUsuarios/ListarUsuario";

import ProtectedRoute from './ProtectedRoute';

function AppRoutesP() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/menu" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signOut" element={<Navigate to="/login" />} />

      <Route path="/menu" element={<ProtectedRoute element={Menu} />} />
      <Route path="/newLaboratory" element={<ProtectedRoute element={NewLaboratory} />} />

      <Route path="/showLaboratories" element={<ProtectedRoute element={ShowLaboratories} />} />
      <Route path="/newReserve" element={<ProtectedRoute element={NewReserve} />} />
      <Route path="/showReserves" element={<ProtectedRoute element={ShowReserves} />} />
      <Route path="/newUser" element={<ProtectedRoute element={NewUser} />} />
      <Route path="/editUser" element={<ProtectedRoute element={EditUser} />} />
      <Route path="/showUsers" element={<ProtectedRoute element={ShowUsers} />} />
    </Routes>
  );
}

export default AppRoutesP;