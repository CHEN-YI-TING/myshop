import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AdminProtected({ children }) {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/auth/login" />;
}

export default AdminProtected;
