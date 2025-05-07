import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // or use a proper auth context

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
