import { createContext, useContext, useState } from "react";
import { session } from "../services/auth";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => session.getAdmin());
  const [token, setToken] = useState(() => session.getToken());

  function login(dados) {
    session.saveSession(dados);
    setToken(dados.token);
    setAdmin({ adminId: dados.adminId, nome: dados.nome, email: dados.email });
  }

  function logout() {
    session.logout();
    setToken(null);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, temToken: Boolean(token) }}>
      {children}
    </AuthContext.Provider>
  );
}
