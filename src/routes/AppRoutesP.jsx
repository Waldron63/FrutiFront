import { Routes, Route, Navigate } from "react-router-dom";

import Menu from "../pages/Menu/Menu";
import Login from "../pages/Login/Login";

import NewLaboratory from "../pages/CrearLaboratorio/CrearLaboratorio";
import EditLaboratory from "../pages/ListarLaboratorios/ListarLaboratorios";
import ShowLaboratories from "../pages/ListarLaboratorios/AdminLaboratorios";

import NewReserve from "../pages/CrearReserva/CrearReservas";
import ShowReserves from "../pages/ListaReservas/Reservas";

import NewUser from "../pages/CrearUsuario/CrearUsuario";
import EditUser from "../pages/EditarUsuario/EditarUsuario";
import ShowUsers from "../pages/ListarUsuarios/ListarUsuarios";

import ProtectedRoute from './ProtectedRoute';

function AppRoutesP() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signOut" element={<Navigate to="/login" />} />
      <Route path="/newUser" element={<NewUser />} />


      <Route path="/menu" element={<ProtectedRoute element={Menu} />} />
      <Route path="/newLaboratory" element={<ProtectedRoute element={NewLaboratory} />} />

      <Route path="/showLaboratories" element={<ProtectedRoute element={ShowLaboratories} />} />
      <Route path="/editLaboratories" element={<ProtectedRoute element={EditLaboratory} />} />
      <Route path="/newReserve" element={<ProtectedRoute element={NewReserve} />} />
      <Route path="/showReserves" element={<ProtectedRoute element={ShowReserves} />} />
      
      <Route path="/editUser" element={<ProtectedRoute element={EditUser} />} />
      <Route path="/showUsers" element={<ProtectedRoute element={ShowUsers} />} />
    </Routes>
  );
}

export default AppRoutesP;