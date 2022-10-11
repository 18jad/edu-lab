import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, access, redirect }: any) => {
  return !user ? (
    <Navigate to={redirect} replace />
  ) : access ? (
    access
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
