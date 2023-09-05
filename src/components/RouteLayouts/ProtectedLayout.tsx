import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "@/hooks";
import { Header } from "..";

// interface IProtectedRoute {
//   children?: React.ReactNode;
// }
export const ProtectedLayout = () => {
  const auth = useAuth();
  const outlet = useOutlet();

  if (!auth?.user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return (
    <div className="pt-8" >
      <Header />
      {outlet}
    </div>
  );
};
