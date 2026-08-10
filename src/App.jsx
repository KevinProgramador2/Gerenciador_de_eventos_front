import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./components/Toast/Toast";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  );
}
