import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children, redirect }: any) => {
  return !user ? (
    <Navigate to={redirect} replace />
  ) : children ? (
    children
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
