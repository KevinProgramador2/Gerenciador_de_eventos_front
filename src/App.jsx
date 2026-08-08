import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./components/Toast";

export default function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}
