import { Routes, Route, Navigate } from "react-router-dom";
import { session } from "../services/auth";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="*"
        element={
          <Navigate to={session.getToken() ? "/home" : "/login"} replace />
        }
      />
    </Routes>
  );
}
