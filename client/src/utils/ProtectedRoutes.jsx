import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../components/Loading";

const ProtectedRoutes = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-slate-500 w-screen h-screen">
        <Loading />
      </div>
    );
  }

  if (!loading && user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
