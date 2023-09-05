import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

export const LoginLayout = () => {
  const auth = useAuth();

  if (auth?.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
