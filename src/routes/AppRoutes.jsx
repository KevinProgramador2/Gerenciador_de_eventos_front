import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Cadastro from "../pages/Cadastro/Cadastro";

export default function AppRoutes() {
  const { temToken } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Navigate to={temToken ? "/home" : "/login"} replace />
        }
      />
    </Routes>
  );
}
